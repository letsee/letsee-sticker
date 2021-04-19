// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import MessageList from './MessageList';
import MyMessagesButton from './MyMessagesButton';
import BackButton from '../BackButton';
import {
  setCurrentCursor,
  setFirstCursor,
  setLastCursor,
  setCount,
  setCurrentCount,
  setPublic,
  setCurrentMessage,
  fetchPrev,
  fetchNext,
} from '../../actions';
import { getMessagesListPath, getMessagesCountPath } from '../../entityUriHelper';
import type { MessageAuthor, MessageFormEntity, MessageWithId, MessagesList } from '../../types';

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: ${props => (props.public ? 16 : 60)}px;
  right: ${props => (props.public ? 103 : 59)}px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 17px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const EntityName = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
`;

// const MessagesCount = styled.span`
//   flex-shrink: 0;
//   vertical-align: middle;
//   margin-left: 5px;
//   font-family: SFUIDisplay, sans-serif;
//   font-size: 15px;
//   padding: 1px 0;
// `;

const StyledBackButton = styled(BackButton)`
  position: absolute;
  top: 25px;
  left: 0;
`;

const StyledMyMessagesButton = styled(MyMessagesButton)`
  position: absolute;
  top: 28px;
  right: ${props => (props.empty ? 5 : 49)}px;
`;

// props로 들어오는 각각에 Entity에 대한 체크를 진행한다.
type EntityPropTypes = {
  saga: Object,
  messagesList: MessagesList,
  data: MessageFormEntity,
  currentUser: MessageAuthor | null,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onHelpClick?: MouseEventHandler,
  onEditClick?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Entity extends Component {
  // 각 엔티티에 대한 자료형에 대해 체크를 진행한다.
  static propTypes = {
    currentUser: PropTypes.shape({ // eslint-disable-line react/require-default-props
      uid: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        depth: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    onNewClick: PropTypes.func, // eslint-disable-line react/require-default-props
    onHelpClick: PropTypes.func,
  };

  // UserID를 테스트용으로 => 1KPeHnwbmzWSm
  // entityURI를 테스트용으로 => 11e7240f-2e5c-4eb3-849c-14187747588a
  componentWillMount() {
    const { saga, messagesList: { entityUri, public: isPublic }, currentUser } = this.props;

    // currentUser를 테스트용으로 변경
    // const userId = currentUser !== null && !isPublic ? currentUser.uid : null;
    // 메세지의 총 갯수를 가져오기
    // 실제 리스트를 가져오기
    const listRef = saga.database().ref(getMessagesListPath(entityUri, currentUser.uid)).orderByKey();
    countref.on('value', this.handleMessagesCountChange);
    // 파이어베이스 기준 현재 레퍼런스에서 한개 후 데이터 가져오기
    listRef.limitToLast(1).on('value', this.handleLastMessageChange);
    // 파이어베이스 기준 현재 레퍼런스에서 한개 전 데이터 가져오기
    listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
  }

  componentWillReceiveProps({
    messagesList: { entityUri, public: isPublic },
    firebase, dispatch, currentUser,
  }: EntityPropTypes) {
    const prevEntityUri = this.props.messagesList.entityUri;
    const prevUserId = this.props.currentUser !== null && !this.props.messagesList.public ? this.props.currentUser.uid : null;
    const userId = currentUser !== null && !isPublic ? currentUser.uid : null;

    if (
      entityUri !== prevEntityUri ||
      prevUserId !== userId
    ) {
      const prevFirebase = this.props.firebase.database();
      const prevCountref = prevFirebase.ref(getMessagesCountPath(prevEntityUri, prevUserId));
      const prevListRef = prevFirebase.ref(getMessagesListPath(prevEntityUri, prevUserId)).orderByKey();
      prevCountref.off('value', this.handleMessagesCountChange);
      prevListRef.limitToLast(1).off('value', this.handleLastMessageChange);
      prevListRef.limitToFirst(1).off('value', this.handleFirstMessageChange);

      const countref = firebase.database().ref(getMessagesCountPath(entityUri, userId));
      const listRef = firebase.database().ref(getMessagesListPath(entityUri, userId)).orderByKey();
      // messageCount 경로의 이벤트를 listening하여 변경사항이 있을시 이를 가져옵니다.
      countref.on('value', this.handleMessagesCountChange);
      listRef.limitToLast(1).on('value', this.handleLastMessageChange);
      listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
    }
  }

  /**
   * props로 entityUri, meesageList, currentEntity,
   */
  componentWillUnmount() {
    const { firebase, messagesList: { entityUri, public: isPublic }, currentUser } = this.props;
    const userId = currentUser !== null && !isPublic ? currentUser.uid : null;
    const countref = firebase.database().ref(getMessagesCountPath(entityUri, userId));
    const listRef = firebase.database().ref(getMessagesListPath(entityUri, userId)).orderByKey();
    countref.off('value', this.handleMessagesCountChange);
    listRef.limitToLast(1).off('value', this.handleLastMessageChange);
    listRef.limitToFirst(1).off('value', this.handleFirstMessageChange);
  }

  props: EntityPropTypes;

  handlePrev() {
    const { firebase, messagesList, currentUser, dispatch } = this.props;
    const { first, current, entityUri, public: isPublic, loading } = messagesList;

    if (first !== current && !loading) {
      dispatch(fetchPrev());
      const path = getMessagesListPath(entityUri, (currentUser !== null && !isPublic) ? currentUser.uid : null);
      const ref = firebase.database().ref(path).orderByKey();
      const filteredRef = current === null ? ref.limitToLast(1) : ref.endAt(current).limitToLast(2);

      filteredRef.once('value', (snapshot) => {
        const messageIds = sortBy(keys(snapshot.val()));
        const messageId = messageIds.length > 0 ? messageIds[0] : null;
        this.props.dispatch(setCurrentCursor(messageId));
      });
    }
  }

  handleNext() {
    const { firebase, messagesList, currentUser, dispatch } = this.props;
    const { last, current, entityUri, public: isPublic, loading } = messagesList;

    if (last !== current && !loading) {
      dispatch(fetchNext());
      const path = getMessagesListPath(entityUri, (currentUser !== null && !isPublic) ? currentUser.uid : null);
      const ref = firebase.database().ref(path).orderByKey();
      const filteredRef = current === null ? ref.limitToLast(1) : ref.startAt(current).limitToFirst(2);

      filteredRef.once('value', (snapshot) => {
        const messageIds = sortBy(keys(snapshot.val()));
        const messageId = messageIds.length > 0 ? messageIds[messageIds.length - 1] : null;
        this.props.dispatch(setCurrentCursor(messageId));
      });
    }
  }

  // 마지막 메세지의 변화를 바꿔준다.
  handleLastMessageChange = (snapshot) => {
    const messageIds = sortBy(keys(snapshot.val()));
    const messageId = messageIds.length > 0 ? messageIds[messageIds.length - 1] : null;
    this.props.dispatch(setLastCursor(messageId));
  };

  // 메세지의 변화를 바꿔준다.
  handleFirstMessageChange = (snapshot) => {
    const messageIds = sortBy(keys(snapshot.val()));
    const messageId = messageIds.length > 0 ? messageIds[0] : null;
    this.props.dispatch(setFirstCursor(messageId));
  };

  // 메세지의 갯수를 저장한다.
  handleMessagesCountChange = (snapshot) => {
    this.props.dispatch(setCount(snapshot.val() || 0));
    // this.props.dispatch(setCurrentCount(snapshot.val()) || 0);
    this.props.dispatch(setCurrentCount(1));
  };

  onMessageReceive = (message) => {
    const { dispatch } = this.props;
    dispatch(setCurrentMessage(message));
  };

  onMessageDelete = () => {
    const { dispatch } = this.props;
    dispatch(setCurrentCursor(null));
  };

  render() {
    const {
      messagesList,
      currentUser,
      data,
      onNewClick,
      onEditClick,
      firebase,
      dispatch,
      children,
      onHelpClick,
      ...other
    } = this.props;

    const canBecomePrivate = messagesList.public && currentUser !== null;

    return (
      <div {...other}>
        <Title public={messagesList.public}>
          <EntityName>
            {messagesList.public ? data.name : '내 스티커'}
          </EntityName>

          {/*<MessagesCount>*/}
          {/*  ({messagesList.count})*/}
          {/*</MessagesCount>*/}
        </Title>

        {!messagesList.public && (
          <StyledBackButton
            onClick={() => dispatch(setPublic(true))}
          />
        )}

        {currentUser !== null && messagesList.public && (
          <StyledMyMessagesButton
            empty={messagesList.message === null || messagesList.empty}
            onClick={() => dispatch(setPublic(!canBecomePrivate))}
          />
        )}

        <MessageList
          data={messagesList}
          currentUser={currentUser}
          entity={data}
          onNewClick={onNewClick}
          onEditClick={onEditClick}
          onHelpClick={onHelpClick}
          onPrev={() => this.handlePrev()}
          onNext={() => this.handleNext()}
          onMessageReceive={this.onMessageReceive}
          onMessageDelete={this.onMessageDelete}
        />
      </div>
    );
  }
}

export default connect()(Entity);
