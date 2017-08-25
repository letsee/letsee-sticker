// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
// import MessageList from './MessageList';
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

class Entity extends Component {
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

  state: {
    showedSwipe: boolean,
    swipeShown: boolean,
  };

  componentWillMount() {
    const { firebase, messagesList } = this.props;
    const countref = firebase.database().ref(getMessagesCountPath(messagesList.entityUri, messagesList.userId));
    const listRef = firebase.database().ref(getMessagesListPath(messagesList.entityUri, messagesList.userId)).orderByKey();
    countref.on('value', this.handleMessagesCountChange);
    listRef.limitToLast(1).on('value', this.handleLastMessageChange);
    listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
  }

  componentWillReceiveProps({ messagesList, firebase, dispatch }: EntityPropTypes) {
    if (
      messagesList.userId !== this.props.messagesList.userId ||
      messagesList.entityUri !== this.props.messagesList.entityUri
    ) {
      const prevCountref = this.props.firebase.database().ref(getMessagesCountPath(this.props.messagesList.entityUri, this.props.messagesList.userId));
      const prevListRef = this.props.firebase.database().ref(getMessagesListPath(this.props.messagesList.entityUri, this.props.messagesList.userId)).orderByKey();
      prevCountref.off('value', this.handleMessagesCountChange);
      prevListRef.limitToLast(1).off('value', this.handleLastMessageChange);
      prevListRef.limitToFirst(1).off('value', this.handleFirstMessageChange);

      const countref = firebase.database().ref(getMessagesCountPath(messagesList.entityUri, messagesList.userId));
      const listRef = firebase.database().ref(getMessagesListPath(messagesList.entityUri, messagesList.userId)).orderByKey();
      countref.on('value', this.handleMessagesCountChange);
      listRef.limitToLast(1).on('value', this.handleLastMessageChange);
      listRef.limitToFirst(1).on('value', this.handleFirstMessageChange);
    }

    if (!this.state.showedSwipe && messagesList.count > 1) {
      this.setState({
        showedSwipe: true,
        swipeShown: true,
      });
    }
  }

  componentWillUnmount() {
    const { firebase, messagesList } = this.props;
    const countref = firebase.database().ref(getMessagesCountPath(messagesList.entityUri, messagesList.userId));
    const listRef = firebase.database().ref(getMessagesListPath(messagesList.entityUri, messagesList.userId)).orderByKey();
    countref.off('value', this.handleMessagesCountChange);
    listRef.limitToLast(1).off('value', this.handleLastMessageChange);
    listRef.limitToFirst(1).off('value', this.handleFirstMessageChange);
  }

  props: EntityPropTypes;

  handlePrev() {
    const { firebase, messagesList } = this.props;
    const { first, current, entityUri, userId } = messagesList;

    if (first !== current) {
      const path = getMessagesListPath(entityUri, userId);
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
    const { firebase, messagesList } = this.props;
    const { last, current, entityUri, userId } = messagesList;

    if (last !== current) {
      const path = getMessagesListPath(entityUri, userId);
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

    console.log(messagesList);

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
            onClick={() => dispatch(setPublic(!(messagesList.public && currentUser !== null)))}
          >
            {messagesList.public && currentUser !== null ? 'MY' : 'ALL'}
          </ToggleMessageListButton>
        )}

        {swipeShown && (
          <StyledSwipe />
        )}

        {/* <MessageList
          data={messagesList}
          currentUser={currentUser}
          entity={data}
          onNewClick={onNewClick}
          onEditClick={onEditClick}
          onPrev={() => this.handlePrev()}
          onNext={() => this.handleNext()}
        /> */}
      </div>
    );
  }
}

export default firebaseConnect()(connect()(Entity));
