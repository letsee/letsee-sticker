// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import keys from 'lodash.keys';
import sortBy from 'lodash.sortby';
import MessageList from './MessageList';
import MyMessagesButton from './MyMessagesButton';
import BackButton from '../BackButton';
import {
  setCurrentCursor,
  setFirstCursor,
  setLastCursor,
  setCount,
  setPublic,
  setCurrentMessage,
  fetchPrev,
  fetchNext,
} from '../../actions';
import { getMessagesListPath, getMessagesCountPath } from '../../entityUriHelper';
import firebase from '../../firebase';
import getMessagesQuery from '../../graphql/getMessagesQuery.graphql';
import type { User, Entity as EntityType, Message } from '../../types';

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

const MessagesCount = styled.span`
  flex-shrink: 0;
  vertical-align: middle;
  margin-left: 5px;
  font-family: SFUIDisplay, sans-serif;
  font-size: 15px;
  padding: 1px 0;
`;

const StyledBackButton = styled(BackButton)`
  position: absolute;
  top: 25px;
  left: 0;
`;

const StyledMyMessagesButton = styled(MyMessagesButton)`
  position: absolute;
  top: 30px;
  right: ${props => (props.empty ? 5 : 49)}px;
`;

type EntityPropTypes = {
  messagesList: MessagesList,
  entity: EntityType,
  currentUser: User | null,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onEditClick?: Message => mixed, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Entity extends Component<EntityPropTypes> {
  static propTypes = {
    currentUser: PropTypes.shape({ // eslint-disable-line react/require-default-props
      uid: PropTypes.string.isRequired,
    }),
    entity: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    onNewClick: PropTypes.func, // eslint-disable-line react/require-default-props
  };

  componentWillMount() {
    const { messagesList: { entityUri, public: isPublic }, currentUser } = this.props;
    const userId = currentUser !== null && !isPublic ? currentUser.uid : null;
    const database = firebase.database();
    const countref = database.ref(getMessagesCountPath(entityUri, userId));
    const listRef = database.ref(getMessagesListPath(entityUri, userId)).orderByKey();
    countref.on('value', this.handleMessagesCountChange);
    listRef.limitToLast(1).on('value', this.handleLastMessageChange);
    listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
  }

  componentWillReceiveProps({
    messagesList: { entityUri, public: isPublic },
    dispatch, currentUser,
  }: EntityPropTypes) {
    const prevEntityUri = this.props.messagesList.entityUri;
    const prevUserId = this.props.currentUser !== null && !this.props.messagesList.public ? this.props.currentUser.uid : null;
    const userId = currentUser !== null && !isPublic ? currentUser.uid : null;

    if (
      entityUri !== prevEntityUri ||
      prevUserId !== userId
    ) {
      const database = firebase.database();
      const prevCountref = database.ref(getMessagesCountPath(prevEntityUri, prevUserId));
      const prevListRef = database.ref(getMessagesListPath(prevEntityUri, prevUserId)).orderByKey();
      prevCountref.off('value', this.handleMessagesCountChange);
      prevListRef.limitToLast(1).off('value', this.handleLastMessageChange);
      prevListRef.limitToFirst(1).off('value', this.handleFirstMessageChange);

      const countref = database.ref(getMessagesCountPath(entityUri, userId));
      const listRef = database.ref(getMessagesListPath(entityUri, userId)).orderByKey();
      countref.on('value', this.handleMessagesCountChange);
      listRef.limitToLast(1).on('value', this.handleLastMessageChange);
      listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
    }
  }

  componentWillUnmount() {
    const { messagesList: { entityUri, public: isPublic }, currentUser } = this.props;
    const userId = currentUser !== null && !isPublic ? currentUser.uid : null;
    const database = firebase.database();
    const countref = database.ref(getMessagesCountPath(entityUri, userId));
    const listRef = database.ref(getMessagesListPath(entityUri, userId)).orderByKey();
    countref.off('value', this.handleMessagesCountChange);
    listRef.limitToLast(1).off('value', this.handleLastMessageChange);
    listRef.limitToFirst(1).off('value', this.handleFirstMessageChange);
  }

  handlePrev() {
    const { messagesList, currentUser, dispatch } = this.props;
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
    const { messagesList, currentUser, dispatch } = this.props;
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

  handleLastMessageChange = (snapshot) => {
    const messageIds = sortBy(keys(snapshot.val()));
    const messageId = messageIds.length > 0 ? messageIds[messageIds.length - 1] : null;
    this.props.dispatch(setLastCursor(messageId));
  };

  handleFirstMessageChange = (snapshot) => {
    const messageIds = sortBy(keys(snapshot.val()));
    const messageId = messageIds.length > 0 ? messageIds[0] : null;
    this.props.dispatch(setFirstCursor(messageId));
  };

  handleMessagesCountChange = (snapshot) => {
    this.props.dispatch(setCount(snapshot.val() || 0));
  };

  render() {
    const {
      messagesList,
      currentUser,
      entity,
      data,
      onNewClick,
      onEditClick,
      firebase,
      dispatch,
      children,
      ...other
    } = this.props;

    const canBecomePrivate = messagesList.public && currentUser !== null;

    return (
      <div {...other}>
        <Title public={messagesList.public}>
          <EntityName>
            {messagesList.public ? entity.name : '내 스티커'}
          </EntityName>

          <MessagesCount>
            ({messagesList.count})
          </MessagesCount>
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
          entity={entity}
          onNewClick={onNewClick}
          onEditClick={onEditClick}
          onPrev={() => this.handlePrev()}
          onNext={() => this.handleNext()}
          onMessageReceive={message => dispatch(setCurrentMessage(message))}
          onMessageDelete={() => dispatch(setCurrentCursor(null))}
        />
      </div>
    );
  }
}

export default firebaseConnect()(connect()(Entity));
