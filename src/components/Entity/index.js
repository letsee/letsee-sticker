// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import Swipe from './Swipe';
import Button from '../Button';
import { entityUriToId } from '../../entityUriHelper';
import type { MessageAuthor } from '../../types';

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
  data: {
    uri: string,
    name: string,
    size: {
      width: number,
      height: number,
      depth: number,
    },
  },
  currentUser: MessageAuthor | null,
  myMessagesCount?: number,
  publicMessagesCount?: number,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Entity extends Component {
  static defaultProps = {
    myMessagesCount: 0,
    publicMessagesCount: 0,
  };

  static propTypes = {
    myMessagesCount: PropTypes.number,
    publicMessagesCount: PropTypes.number,
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
    public: true,
    showedSwipe: false,
    swipeShown: false,
  };

  state: {
    public: boolean,
    showedSwipe: boolean,
    swipeShown: boolean,
  };

  componentWillReceiveProps(nextProps: EntityPropTypes) {
    if (nextProps.currentUser === null && this.props.currentUser !== null) {
      this.setState({ public: true });
    }

    const messagesCount = (this.state.public || nextProps.currentUser === null ? nextProps.publicMessagesCount : nextProps.myMessagesCount) || 0;

    if (!this.state.showedSwipe && messagesCount > 1) {
      this.setState({
        showedSwipe: true,
        swipeShown: true,
      });
    }
  }

  props: EntityPropTypes;

  render() {
    const { public: isPublic, swipeShown } = this.state;
    const {
      currentUser,
      myMessagesCount,
      publicMessagesCount,
      data,
      onNewClick,
      firebase,
      dispatch,
      children,
      ...other
    } = this.props;

    const messagesCount = (isPublic || currentUser === null ? publicMessagesCount : myMessagesCount) || 0;

    return (
      <div {...other}>
        <Title>
          {data.name}

          <MessagesCount>
            {messagesCount}
          </MessagesCount>
        </Title>

        {currentUser !== null && (
          <ToggleMessageListButton
            type="button"
            onClick={() => this.setState(prevState => ({ public: !prevState.public }))}
          >
            {isPublic ? 'MY' : 'ALL'}
          </ToggleMessageListButton>
        )}

        {swipeShown && (
          <StyledSwipe />
        )}

        <MessageList
          currentUser={currentUser}
          userId={isPublic || currentUser === null ? null : currentUser.uid}
          entity={data}
          empty={messagesCount === 0}
          onNewClick={onNewClick}
        />
      </div>
    );
  }
}

export default firebaseConnect(
  ({ currentUser, data }) => (currentUser === null ? [
    { path: `messagesCount/${entityUriToId(data.uri)}/publicMessages`, storeAs: 'publicMessagesCount' },
  ] : [
    { path: `messagesCount/${entityUriToId(data.uri)}/publicMessages`, storeAs: 'publicMessagesCount' },
    { path: `messagesCount/${entityUriToId(data.uri)}/authorMessages/${currentUser.uid}`, storeAs: 'myMessagesCount' },
  ]),
)(connect(
  ({
    firebase: {
      data: {
        publicMessagesCount,
        myMessagesCount,
      },
    },
  }) => ({
    publicMessagesCount,
    myMessagesCount,
  }),
)(Entity));
