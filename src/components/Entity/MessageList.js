// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import { ImageButton } from '../Button';
import Frame from '../Frame';
import Message from '../Message';
import manager, { enableManager } from '../../manager';
import { entityUriToId } from '../../entityUriHelper';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';
import type { Message as MessageType, MessageWithId, MessageAuthor } from '../../types';

const selectEarliestMessage = (messagesObject: { [id: string]: MessageType }): MessageWithId | null => {
  const messageIds: string[] = sortBy(keys(messagesObject));
  const lastMessageId: string | null = messageIds[0] || null;

  if (lastMessageId === null) {
    return null;
  }

  const messageData = messagesObject[lastMessageId];

  return {
    id: lastMessageId,
    ...messageData,
  };
};

const selectLatestMessage = (messagesObject: { [id: string]: MessageType }): MessageWithId | null => {
  const messageIds: string[] = sortBy(keys(messagesObject));
  const lastMessageId: string | null = messageIds[messageIds.length - 1] || null;

  if (lastMessageId === null) {
    return null;
  }

  const messageData = messagesObject[lastMessageId];

  return {
    id: lastMessageId,
    ...messageData,
  };
};

const ARContainer = styled.div`
  position: relative;
`;

const StyledImageButton = ImageButton.extend`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Actions = styled.div`
  position: absolute;
  right: 0;
  bottom: 129px;
`;

const MessageText = styled.div`
  position: absolute;
  white-space: nowrap;
  left: 50%;
  bottom: ${props => props.height}px;
  transform: translateX(-50%);
  opacity: 0.9;
  font-family: 'Noto Sans KR Black', AppleSDGothicNeo, sans-serif;
  font-size: ${props => props.size * 0.06}px;
  font-weight: 800;
  letter-spacing: ${props => -props.size * 0.06 * 0.5 / 23}px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 ${props => props.size * 0.06 * 12 / 23}px rgba(0, 0, 0, 0.5);
`;

const FrameAR = styled(Frame)`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  > img {
    width: ${props => Math.sqrt(((props.width * props.width) + (props.height * props.height)) / 2) * 0.06}px;
  }
`;

type MessageListPropTypes = {
  currentUser: MessageAuthor | null,
  userId: string | null,
  entity: {
    uri: string,
    name: string,
    size: {
      width: number,
      height: number,
      depth: number,
    },
  },
  empty: boolean,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onEditClick?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
};

class MessageList extends Component {
  constructor(props: MessageListPropTypes) {
    super(props);

    this.state = {
      loading: true,
      first: null,
      last: null,
      data: null,
      error: false,
    };

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const container = document.createElement('div');
      this.object = new DOMRenderable(container);
    }
  }

  state: {
    loading: boolean,
    first: MessageWithId | null,
    last: MessageWithId | null,
    data: MessageWithId | null,
    error: boolean,
  };

  componentWillMount() {
    const { userId, entity: { uri }, firebase } = this.props;
    const entityId = entityUriToId(uri);
    const path = userId === null ? `entityMessages/${entityId}/publicMessages` : `entityMessages/${entityId}/authorMessages/${userId}`;
    const ref = firebase.database().ref(path).orderByKey();
    ref.limitToLast(1).on('value', this.handleLastMessageChange);
    ref.limitToFirst(1).on('value', this.handleFirstMessageChange);
    ref.on('child_removed', this.handleMessageDelete);
  }

  componentDidMount() {
    enableManager(false);
    manager.get('swipe').set({ enable: true });
    manager.on('swipeleft', this.prev);
    manager.on('swiperight', this.next);
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: MessageListPropTypes) {
    if (
      this.props.userId !== nextProps.userId ||
      this.props.entity.uri !== nextProps.entity.uri
    ) {
      const { userId, entity: { uri }, firebase } = this.props;
      const entityId = entityUriToId(uri);
      const path = userId === null ? `entityMessages/${entityId}/publicMessages` : `entityMessages/${entityId}/authorMessages/${userId}`;
      const ref = firebase.database().ref(path).orderByKey();
      ref.limitToLast(1).off('value', this.handleLastMessageChange);
      ref.limitToFirst(1).off('value', this.handleFirstMessageChange);
      ref.off('child_removed', this.handleMessageDelete);

      const nextEntityId = entityUriToId(nextProps.entity.uri);
      const nextPath = nextProps.userId === null ? `entityMessages/${nextEntityId}/publicMessages` : `entityMessages/${nextEntityId}/authorMessages/${nextProps.userId}`;
      const nextRef = nextProps.firebase.database().ref(nextPath).orderByKey();

      this.setState({
        loading: true,
        first: null,
        last: null,
        data: null,
        error: false,
      }, () => {
        nextRef.limitToLast(1).on('value', this.handleLastMessageChange);
        nextRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
        nextRef.on('child_removed', this.handleMessageDelete);
      });
    }

    this.renderAR(nextProps);
  }

  componentWillUnmount() {
    const { userId, entity: { uri }, firebase } = this.props;
    const entityId = entityUriToId(uri);
    const path = userId === null ? `entityMessages/${entityId}/publicMessages` : `entityMessages/${entityId}/authorMessages/${userId}`;
    const ref = firebase.database().ref(path).orderByKey();
    ref.limitToLast(1).off('value', this.handleLastMessageChange);
    ref.limitToFirst(1).off('value', this.handleFirstMessageChange);
    ref.off('child_removed', this.handleMessageDelete);

    manager.off('swipeleft', this.prev);
    manager.off('swiperight', this.next);
    manager.get('swipe').set({ enable: false });
    enableManager(true);

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(this.props.entity.uri);
      entity.removeRenderable(this.object);
    }
  }

  props: MessageListPropTypes;

  handleMessageDelete = (oldSnapshot) => {
    const messagesObject = oldSnapshot.val();
    const messageIds: string[] = keys(messagesObject);

    this.setState((prevState) => {
      if (prevState.data !== null && messageIds.includes(prevState.data.id)) {
        if (prevState.last !== null && !messageIds.includes(prevState.last.id)) {
          return {
            data: prevState.last,
          };
        } else if (prevState.first !== null && !messageIds.includes(prevState.first.id)) {
          return {
            data: prevState.first,
          };
        }

        return {
          loading: true,
          data: null,
        };
      }

      return {};
    });
  };

  handleLastMessageChange = (snapshot) => {
    const messagesObject = snapshot.val();
    const lastMessage = selectLatestMessage(messagesObject);

    this.setState(prevState => ({
      last: lastMessage,
      data: prevState.data === null && prevState.loading ? lastMessage : prevState.data,
      loading: false,
    }));
  };

  handleFirstMessageChange = (snapshot) => {
    const messagesObject = snapshot.val();
    const first = selectEarliestMessage(messagesObject);
    this.setState({ first });
  };

  prev = () => {
    const { first, data, loading } = this.state;

    if (
      !loading &&
      first !== null && data !== null &&
      first.id !== data.id
    ) {
      this.setState({ loading: true }, () => {
        const { userId, entity: { uri }, firebase } = this.props;
        const entityId = entityUriToId(uri);
        const path = userId === null ? `entityMessages/${entityId}/publicMessages` : `entityMessages/${entityId}/authorMessages/${userId}`;
        const ref = firebase.database().ref(path).orderByKey();

        ref.endAt(data.id).limitToLast(2).once('value', (snapshot) => {
          const messagesObject = snapshot.val();
          const message = selectEarliestMessage(messagesObject);

          this.setState({
            loading: false,
            data: message,
            error: false,
          });
        });
      });
    }
  };

  next = () => {
    const { last, data, loading } = this.state;

    if (
      !loading &&
      last !== null && data !== null &&
      last.id !== data.id
    ) {
      this.setState({ loading: true }, () => {
        const { userId, entity: { uri }, firebase } = this.props;
        const entityId = entityUriToId(uri);
        const path = userId === null ? `entityMessages/${entityId}/publicMessages` : `entityMessages/${entityId}/authorMessages/${userId}`;
        const ref = firebase.database().ref(path).orderByKey();

        ref.startAt(data.id).limitToFirst(2).once('value', (snapshot) => {
          const messagesObject = snapshot.val();
          const message = selectLatestMessage(messagesObject);

          this.setState({
            loading: false,
            data: message,
            error: false,
          });
        });
      });
    }
  };

  renderAR({ entity: e, onNewClick, empty }: MessageListPropTypes) {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const { uri, size: { width, height, depth } } = e;
      const entity = letsee.getEntity(uri);

      if (this.object.parent !== entity.object) {
        entity.addRenderable(this.object);
      }

      let realDiagonal = MAX_DIAGONAL;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;

      if (realDiagonal !== diagonal) {
        this.object.scale.setScalar(realToClamped);
      }

      if (depth !== null && typeof depth !== 'undefined') {
        this.object.position.setZ(depth / 2);
      }

      const buttonSize = diagonal * 0.33;
      const nearest = Math.ceil(buttonSize / 100) * 100;
      const y = (height / realToClamped) + (diagonal * 0.04);

      render(
        <div>
          {empty && (
            <ARContainer>
              <MessageText
                size={diagonal}
                height={y}
              >
                스티커를 남겨보세요!
              </MessageText>

              <FrameAR
                width={width / realToClamped}
                height={height / realToClamped}
                vertical={0}
                horizontal={0}
                white
              >
                <StyledImageButton
                  type="button"
                  onClick={onNewClick}
                >
                  <img
                    src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest},q_auto/v1501870222/assets/btn-add-content_3x.png`}
                    srcSet={`
                      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest * 2},q_auto/v1501870222/assets/btn-add-content_3x.png 2x,
                      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest * 3},q_auto/v1501870222/assets/btn-add-content_3x.png 3x
                    `}
                    alt="스티커를 남겨보세요!"
                    height={buttonSize}
                  />
                </StyledImageButton>
              </FrameAR>
            </ARContainer>
          )}
        </div>,
        this.object.element,
      );
    }
  }

  render() {
    const { loading, data } = this.state;
    const {
      currentUser,
      userId,
      empty,
      entity,
      onEditClick,
      onNewClick,
      firebase,
      dispatch,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <Actions>
          {!loading && data !== null && currentUser !== null && data.author.uid === currentUser.uid && (
            <ImageButton
              type="button"
              onClick={() => onEditClick && onEditClick(data)}
            >
              <img
                alt={`${data.author.firstname} ${data.author.lastname}`.trim()}
                src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_72/v1503389387/assets/btn-create-copy_3x.png"
                srcSet="
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_144/v1503389387/assets/btn-create-copy_3x.png 2x,
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_216/v1503389387/assets/btn-create-copy_3x.png 3x
                "
              />
            </ImageButton>
          )}

          <ImageButton
            type="button"
            onClick={onNewClick}
          >
            <img
              alt="스티커를 남겨보세요!"
              src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_72/v1503047417/assets/btn-create_3x.png"
              srcSet="
                https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_144/v1503047417/assets/btn-create_3x.png 2x,
                https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_216/v1503047417/assets/btn-create_3x.png 3x
              "
            />
          </ImageButton>
        </Actions>

        {data !== null && (
          <Message
            id={data.id}
            data={data}
            currentEntity={entity.uri}
            loadingEntity={loading}
          />
        )}
      </div>
    );
  }
}

export default firebaseConnect()(MessageList);
