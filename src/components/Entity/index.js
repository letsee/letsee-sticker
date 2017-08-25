// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import MessageList from './MessageList';
import Swipe from './Swipe';
import Button from '../Button';
import {
  setCurrentCursor,
  setFirstCursor,
  setLastCursor,
  setCount,
  setPublic,
} from '../../actions';
import { getMessagesListPath, getMessagesCountPath } from '../../entityUriHelper';
import type { MessageAuthor, MessageFormEntity, MessageWithId, MessagesList } from '../../types';

const StyledSwipe = styled(Swipe)`
  position: absolute;
  bottom: 105px;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 16px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.3px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const MessagesCount = styled.span`
  vertical-align: middle;
  margin-left: 5px;
  font-family: SFUIDisplay, sans-serif;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.3px;
  color: #000;
  text-shadow: none;
  padding: 0 6px;
  border-radius: 100px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
`;

const ToggleMessageListButton = Button.extend`
  position: absolute;
  top: 25px;
  right: 0;
  padding: 16px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: -0.4px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

type EntityPropTypes = {
  messagesList: MessagesList,
  data: MessageFormEntity,
  currentUser: MessageAuthor | null,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onEditClick?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Entity extends Component<EntityPropTypes, {
  showedSwipe: boolean,
  swipeShown: boolean,
}> {
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
  };

  state = {
    showedSwipe: false,
    swipeShown: false,
  };

  componentWillMount() {
    const { firebase, messagesList: { entityUri, public: isPublic }, currentUser } = this.props;
    const userId = currentUser !== null && !isPublic ? currentUser.uid : null;
    const countref = firebase.database().ref(getMessagesCountPath(entityUri, userId));
    const listRef = firebase.database().ref(getMessagesListPath(entityUri, userId)).orderByKey();
    countref.on('value', this.handleMessagesCountChange);
    listRef.limitToLast(1).on('value', this.handleLastMessageChange);
    listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
  }

  componentWillReceiveProps({
    messagesList: { entityUri, count, public: isPublic },
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
      countref.on('value', this.handleMessagesCountChange);
      listRef.limitToLast(1).on('value', this.handleLastMessageChange);
      listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
    } else if (!this.state.showedSwipe && count > 1) {
      this.setState({
        showedSwipe: true,
        swipeShown: true,
      });
    }
  }

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
    const { firebase, messagesList, currentUser } = this.props;
    const { first, current, entityUri, public: isPublic } = messagesList;

    if (first !== current) {
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
    const { firebase, messagesList, currentUser } = this.props;
    const { last, current, entityUri, public: isPublic } = messagesList;

    if (last !== current) {
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
    const { swipeShown } = this.state;
    const {
      messagesList,
      currentUser,
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
        <Title>
          {data.name}

          <MessagesCount>
            {messagesList.count}
          </MessagesCount>
        </Title>

        {currentUser !== null && (
          <ToggleMessageListButton
            type="button"
            onClick={() => dispatch(setPublic(!canBecomePrivate))}
          >
            {canBecomePrivate ? 'MY' : 'ALL'}
          </ToggleMessageListButton>
        )}

        {swipeShown && (
          <StyledSwipe />
        )}

        <MessageList
          data={messagesList}
          currentUser={currentUser}
          entity={data}
          onNewClick={onNewClick}
          onEditClick={onEditClick}
          onPrev={() => this.handlePrev()}
          onNext={() => this.handleNext()}
          onMessageDelete={() => dispatch(setCurrentCursor(null))}
        />
      </div>
    );
  }
}

export default firebaseConnect()(connect()(Entity));
