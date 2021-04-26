// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Saga } from 'react-redux-saga';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import { connect } from 'react-redux';
import { ImageButton } from '../Button';
import { BottomButtonContainer} from '../Container'
import Frame from '../Frame';
import Message from '../Message';
import Spinner from '../Spinner';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import manager, { enableManager } from '../../manager';
import { getEntityMessage, getMessage } from '../../api/message';
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

// extend는 이제 권장되지 않음.
const StyledImageButton = styled(ImageButton)`
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
  float:left
`;

const StyledNextButton = styled(NextButton)`
  float:right;
`;

const MessagesCount = styled.div`
  font-family: SFUIDisplay, sans-serif;
  font-size: 15px;
  position: absolute;
  display: inline-block;
  color: white;
  text-align: center;
  left: 50%;
  transform: translate(-50%,-50%);
  top: 50%;
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


const MessagesButtonContainer = styled.div`
  position: absolute;
  bottom: 110px;
  left: 30%;
  width: 40%;
  text-align: center;
`;

type MessageListPropTypes = {
  data: MessagesList,
  messageArrayList: mixed,
  currentUser: MessageAuthor | null,
  entity: MessageFormEntity,
  currentNumber: number,
  onMessageReceive?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
  onMessageDelete?: void => mixed, // eslint-disable-line react/require-default-props
  onPrev?: void => mixed, // eslint-disable-line react/require-default-props
  onNext?: void => mixed, // eslint-disable-line react/require-default-props
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onEditClick?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
  onHelpClick? : MouseEventHandler,

};

class MessageList extends Component {
  constructor(props: MessageListPropTypes) {
    super(props);
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntityByUri('https://s-developer.letsee.io/api-tm/target-manager/target-uid/60814943ffb936e8cd1de37c');
      this.object = letsee.createXRElement('<div class="xrDomElement"></div>', entity);
    }
    this.state = {
      messageArrayList: props.messageArrayList,
      currentNumber: props.currentNumber,
    }
  }

  // render가 되기 바로 직전에 수행됨.
  componentDidMount() {
    enableManager(false);
    manager.get('swipe').set({ enable: true });
    manager.on('swipeleft', this.prev);
    manager.on('swiperight', this.next);
    this.renderAR(this.props);
  }

  // props의 변경이 일어났을 때 호출됨.
  componentWillReceiveProps(nextProps: MessageListPropTypes) {
    this.renderAR(nextProps);
  }

  componentWillUnmount() {
    // 스와이프 이벤트를 연결한다.
    manager.off('swipeleft', this.prev);
    manager.off('swiperight', this.next);
    manager.get('swipe').set({ enable: false });
    enableManager(true);
    letsee.removeXRElement(this.object);
  }

  props: MessageListPropTypes;

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

      let realDiagonal = MAX_DIAGONAL; // 대각

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
    console.log('props',this.props);
    console.log('state',this.state);
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
      messageArrayList,
      currentNumber,
      onHelpClick,
      ...other
    } = this.props;
    const entityUri = 'bts';
    const count = messageArrayList ? messageArrayList.length : 0;
    const empty = false;
    const currentCount = currentNumber;
    const current = currentCount;
    const message = count > 0 ? messageArrayList[currentCount - 1] : null;
    const first = 1;
    const last = count;
    const loading = false;
    const dataExists = !empty && current !== null ;
    return (
      <div {...other}>
        <BottomButtonContainer
          bottom="12px" marginItems="2px"
          >
          <ImageButton
            onClick={onHelpClick}
          >
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_question_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_question_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_question_3x.png 3x
              "/>
          </ImageButton>

          <ImageButton
            imageWidth="70px"
            onClick={onNewClick}
          >
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_add_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_add_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_add_3x.png 3x
              "/>
          </ImageButton>

          <ImageButton>
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_all_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_all_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_all_3x.png 3x
              "/>
          </ImageButton>
        </BottomButtonContainer>

        <MessagesButtonContainer>
          {dataExists && message !== null && current !== last && (
            <StyledNextButton onClick={ onNext} />
          )}
          <MessagesCount>{currentCount} / {count}</MessagesCount>
          {dataExists && message !== null && current !== first && (
            <StyledPrevButton onClick={ onPrev} />
          )}
        </MessagesButtonContainer>

        {count > 0 && (
          <Message
            data={message}
            currentEntity={entityUri}
            loadingEntity={false}
            shareDisabled={loading}
          />
        )}
      </div>
    );
  }
}

export default MessageList;
