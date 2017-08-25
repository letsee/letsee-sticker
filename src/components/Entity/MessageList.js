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
import { getMessagesListPath } from '../../entityUriHelper';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';
import type {
  Message as MessageType,
  MessageWithId,
  MessageAuthor,
  MessagesList,
  MessageFormEntity,
} from '../../types';

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

const subscribeToCurrent = (firebase, data: MessagesList, handleMessageChange) => {
  const ref = firebase.database().ref(getMessagesListPath(data.entityUri, data.userId)).orderByKey();

  if (data.current === null) {
    ref.limitToLast(1).on('value', handleMessageChange);
  } else {
    ref.equalTo(data.current).on('value', handleMessageChange);
  }
};

const unsubscribeFromCurrent = (firebase, data: MessagesList, handleMessageChange) => {
  const ref = firebase.database().ref(getMessagesListPath(data.entityUri, data.userId)).orderByKey();

  if (data.current === null) {
    ref.limitToLast(1).off('value', handleMessageChange);
  } else {
    ref.equalTo(data.current).off('value', handleMessageChange);
  }
};

type MessageListPropTypes = {
  data: MessagesList,
  currentUser: MessageAuthor | null,
  entity: MessageFormEntity,
  onPrev?: void => mixed, // eslint-disable-line react/require-default-props
  onNext?: void => mixed, // eslint-disable-line react/require-default-props
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
    const { firebase, data } = this.props;
    subscribeToCurrent(firebase, data, this.handleMessageChange);
  }

  componentDidMount() {
    enableManager(false);
    manager.get('swipe').set({ enable: true });
    manager.on('swipeleft', this.prev);
    manager.on('swiperight', this.next);
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: MessageListPropTypes) {
    if (this.props.data.current !== nextProps.data.current) {
      unsubscribeFromCurrent(this.props.firebase, this.props.data, this.handleMessageChange);
      subscribeToCurrent(nextProps.firebase, nextProps.data, this.handleMessageChange);
    }

    this.renderAR(nextProps);
  }

  componentWillUnmount() {
    const { firebase, data, entity: { uri } } = this.props;
    unsubscribeFromCurrent(firebase, data, this.handleMessageChange);

    manager.off('swipeleft', this.prev);
    manager.off('swiperight', this.next);
    manager.get('swipe').set({ enable: false });
    enableManager(true);

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(uri);
      entity.removeRenderable(this.object);
    }
  }

  props: MessageListPropTypes;

  handleMessageChange = (snapshot) => {
    const messagesObject = snapshot.val();
    const data = selectLatestMessage(messagesObject);

    if (data === null) {
      this.props.dispatch(); // TODO
    }

    this.setState({ data, loading: data === null });
  };

  prev = () => {
    if (this.props.onPrev) {
      this.props.onPrev();
    }
  };

  next = () => {
    if (this.props.onNext) {
      this.props.onNext();
    }
  };

  renderAR({ entity: e, onNewClick, data }: MessageListPropTypes) {
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
          {data.empty && (
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
      data: messagesList,
      currentUser,
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
