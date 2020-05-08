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
import Spinner from '../Spinner';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
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

// 마지막 메세지를 선택하여.. 마지막 메세지를 반환한다.
const selectLatestMessage = (messagesObject: { [id: string]: MessageType }): MessageWithId | null => {
  const messageIds: string[] = sortBy(keys(messagesObject));
  const lastMessageId: string | null = messageIds[messageIds.length - 1] || null;

  if (lastMessageId === null) {
    return null;
  }

  const messageData = messagesObject[lastMessageId];

  // 마지막 messageId와 messageData를 반환함.
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

const StyledPrevButton = styled(PrevButton)`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const StyledNextButton = styled(NextButton)`
  position: absolute;
  right: 0;
  bottom: 0;
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

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

// 1. 파이어베이스에서 메세지를 가지고 옵니다.
// 2. data.current를 검사합니다. (data.current는 현재 메세지의 ID이다)
// 3. data.current가 만약 null이 아니면,
const subscribeToCurrent = (firebase, data: MessagesList, userId: string | null, handleMessageChange) => {
  const ref = firebase.database().ref(getMessagesListPath(data.entityUri, userId)).orderByKey();

  // 현재 메세지가 있다면, 현재 메세지에대한 정보를 가지고 있는 snapshot을 찍어서 handleMessageChange에 이벤트를 전달함.
  if (data.current !== null) {
    ref.equalTo(data.current).on('value', handleMessageChange);
  }
};

// 1. 현재 유저에 대한 메세지들의 리스트를 가져온다.
// 2. key값으로 정렬한다.
const unsubscribeFromCurrent = (firebase, data: MessagesList, userId: string | null, handleMessageChange) => {
  const ref = firebase.database().ref(getMessagesListPath(data.entityUri, userId)).orderByKey();

  //TODO: data.current가 무엇인지 파악이 되지 않음..
  if (data.current !== null) {
    ref.equalTo(data.current).off('value', handleMessageChange);
  }
};

type MessageListPropTypes = {
  data: MessagesList,
  currentUser: MessageAuthor | null,
  entity: MessageFormEntity,
  onMessageReceive?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
  onMessageDelete?: void => mixed, // eslint-disable-line react/require-default-props
  onPrev?: void => mixed, // eslint-disable-line react/require-default-props
  onNext?: void => mixed, // eslint-disable-line react/require-default-props
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onEditClick?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
};

class MessageList extends Component {
  constructor(props: MessageListPropTypes) {
    super(props);
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const container = document.createElement('div');
      this.object = new letsee.DOMRenderable(container);
    }
  }

  // render가 되기 바로 직전에 수행됨.
  componentWillMount() {
    // currentUser를 테스트용으로 변경
    let { firebase, data, currentUser } = this.props;
    // 불필요한 메서드 삭제
    // subscribeToCurrent(firebase, data, currentUser.uid, this.handleMessageChange);
    const entity = letsee.getEntity('assets/bts.json');
    entity.renderables.forEach((item) => {
      if(item && item.type === 'Object3D') {
        entity.removeRenderable(item);
      } else if (item && item.type === 'DOMRenderable'){
        entity.removeRenderable(item)
      }
    })
  }

  componentDidMount() {
    enableManager(false);
    manager.get('swipe').set({ enable: true });
    manager.on('swipeleft', this.prev);
    manager.on('swiperight', this.next);
    this.renderAR(this.props);
  }
  
  // props의 변경이 일어났을 때 호출됨.
  componentWillReceiveProps(nextProps: MessageListPropTypes) {
    if (this.props.data.current !== nextProps.data.current) {
      // const prevUserId = this.props.currentUser !== null && !this.props.data.public ? this.props.currentUser.uid : null;
      // const userId = nextProps.currentUser !== null && !nextProps.data.public ? nextProps.currentUser.uid : null;
      const prevUserId = 'jjjjjw910911-010-6284-8051';
      const userId = 'jjjjjw910911-010-6284-8051';
      
      unsubscribeFromCurrent(this.props.firebase, this.props.data, prevUserId, this.handleMessageChange);
      subscribeToCurrent(nextProps.firebase, nextProps.data, userId, this.handleMessageChange);
    }

    this.renderAR(nextProps);
  }
  
  componentWillUnmount() {
    const { firebase, data, currentUser } = this.props;
    const userId = currentUser !== null && !data.public ? currentUser.uid : null;
    unsubscribeFromCurrent(firebase, data, userId, this.handleMessageChange);
  
    // 스와이프 이벤트를 연결한다.
    manager.off('swipeleft', this.prev);
    manager.off('swiperight', this.next);
    manager.get('swipe').set({ enable: false });
    enableManager(true);

    if (typeof letsee !== 'undefined' && letsee !== null) {
      console.log('ADD BUTTON 누른후 firebase로 들어오는 데이터');
      console.log(data);
      // const entity = letsee.getEntity(data.entityUri);
      const entity = letsee.getEntity(`assets/bts.json`);
      entity.removeRenderable(this.object);
    }
  }

  props: MessageListPropTypes;
  
  // 현재 메세지를 가지고 있는 스냅샷으로부터 메세지의 변경을 notify한다.
  handleMessageChange = (snapshot) => {
    const { onMessageDelete, onMessageReceive } = this.props;
    const messagesObject = snapshot.val();
    const data = selectLatestMessage(messagesObject);

    if (data === null) {
      onMessageDelete && onMessageDelete();
    } else {
      onMessageReceive && onMessageReceive(data);
    }
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
      /**
       * Letsee.getEntity형식이 json파일 형식으로 바뀌었기 때문에 이를 맞춰주는 작업 필요
       */
      // const entity = letsee.getEntity(uri);
      const entity = letsee.getEntity('assets/bts.json');

      // 에러 발생
      // 처음 화면 -> 수정 -> 이모지/텍스트 ->  휴지통 -> x 버튼
      
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
        // this.object.position.setZ(depth / 2);
        this.object.position.setZ(10);
      }

      const buttonSize = diagonal * 0.33;
      const nearest = Math.ceil(buttonSize / 100) * 100;
      const y = (height / realToClamped) + (diagonal * 0.04);
      
      // 첫번째 요소를 DomRenderable안의 Div에 삽입함.
      render(
        <div>
          {!data.loading && data.empty && (
            <ARContainer>
              <MessageText
                size={diagonal}
                height={200}
              >
                스티커를 남겨보세요!
              </MessageText>
      
              <FrameAR
                width={140}
                height={200}
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
    const {
      data: messagesList,
      currentUser,
      entity,
      onMessageDelete,
      onMessageReceive,
      onEditClick,
      onNewClick,
      onPrev,
      onNext,
      firebase,
      ...other
    } = this.props;

    const { entityUri, empty, current, message, error, loading, first, last } = messagesList;
    const dataExists = !empty && current !== null && !error;

    return (
      <div {...other}>
        <Actions>
          {message !== null && dataExists && currentUser !== null && message.author.uid === currentUser.uid && (
            <ImageButton
              type="button"
              onClick={loading ? null : () => onEditClick && onEditClick(message)}
            >
              <img
                alt={`${message.author.firstname} ${message.author.lastname}`.trim()}
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

        {dataExists && message !== null && current !== first && (
          <StyledNextButton onClick={loading ? null : () => this.prev()} />
        )}

        {dataExists && message !== null && current !== last && (
          <StyledPrevButton onClick={loading ? null : () => this.next()} />
        )}

        {dataExists && message !== null && (
          <Message
            id={message.id}
            data={message}
            currentEntity={entityUri}
            loadingEntity={false}
            shareDisabled={loading}
          />
        )}

        {loading && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}
      </div>
    );
  }
}

export default firebaseConnect()(MessageList);
