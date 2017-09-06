// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import MessageComponent from '../components/Message';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import TargetGuide from '../components/TargetGuide';
import HelpButton from '../components/HelpButton';
import StickerButton from '../components/StickerButton';
import CloseButton from '../components/CloseButton';
import Envelope from '../components/Envelope';
import Help from '../components/Help';
import {
  openHelp,
  closeHelp,
} from '../actions';
import {
  MIN_DIAGONAL,
  MAX_DIAGONAL,
} from '../constants';
import type { Message as MessageType } from '../types';

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TrackMessage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;

const TrackMessageImage = styled.img`
  display: block;
  margin: 0 auto 16px auto;
  opacity: 0.5;
  border-radius: 50%;
  border: 2px solid #fff;
  width: 100px;
  height: 100px;
  background-color: #fff;
  object-fit: contain;
`;

const TrackMessageText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  user-select: none;
  padding: 17px 0;
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const StyledHelpButton = styled(HelpButton)`
  display: inline-block;
  margin-left: 2px;
  vertical-align: middle;
`;

const StyledStickerButton = styled(StickerButton)`
  position: absolute;
  top: 25px;
  left: 0;
`;

type MessagePropTypes = {
  params: { id: string },
  currentEntity: string | null,
  loadingEntity: boolean,
  data: MessageType,
  helpOpened: boolean,
};

class Message extends Component {
  constructor(props: MessagePropTypes) {
    super(props);

    this.state = {
      opened: false,
    };

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const container = document.createElement('div');
      this.messageObject = new DOMRenderable(container);
    }
  }

  state: { opened: boolean };

  componentDidMount() {
    if (
      this.props.data &&
      this.props.currentEntity !== null &&
      this.props.currentEntity === this.props.data.entity.uri
    ) {
      this.renderAR(this.props);
    }
  }

  componentWillReceiveProps(nextProps: MessagePropTypes) {
    if (
      nextProps.data &&
      nextProps.currentEntity !== null &&
      nextProps.currentEntity === nextProps.data.entity.uri
    ) {
      this.renderAR(nextProps);
    }
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(this.props.data.entity.uri);

      if (entity) {
        entity.removeRenderable(this.messageObject);
      }
    }
  }

  props: MessagePropTypes;

  renderAR({ data: { entity: { uri }, author } }: MessagePropTypes) {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(uri);
      const { width, height, depth } = entity.size;
      let realDiagonal = MAX_DIAGONAL;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;

      if (this.messageObject.parent !== entity.object) {
        entity.addRenderable(this.messageObject);
      }

      this.messageObject.scale.setScalar(realToClamped);

      if (typeof depth !== 'undefined' && depth !== null) {
        this.messageObject.position.setZ(depth / 2);
      }

      const element = this.state.opened ? (
        <div />
      ) : (
        <Envelope
          data={author}
          size={diagonal}
          onClick={() => this.setState({ opened: true }, () => { this.renderAR(this.props); })}
        />
      );

      render(
        element,
        this.messageObject.element,
      );
    }
  }

  render() {
    const {
      params: { id },
      router,
      data,
      helpOpened,
      currentEntity,
      loadingEntity,
      dispatch,
    } = this.props;

    const loading = !isLoaded(data);

    if (loading) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

    const empty = isEmpty(data);

    if (empty || !data) {
      // TODO
      return (
        <h1>404</h1>
      );
    }

    if (helpOpened) {
      return (
        <Help onCloseClick={() => dispatch(closeHelp())} />
      );
    }

    const { opened } = this.state;
    const { entity: { uri, name, image }, author } = data;
    const entityTracked = currentEntity !== null && currentEntity === uri;
    const { firstname, lastname } = author;
    const authorName = `${firstname} ${lastname}`.trim();

    return (
      <div>
        {!loadingEntity && !entityTracked && (
          <div>
            <Title>{authorName}님의 스티커 메세지</Title>

            <TargetGuide>
              <TrackMessage>
                {image && (
                  <TrackMessageImage src={image} />
                )}

                <TrackMessageText>
                  {name}의 정면을 비춰주세요

                  <StyledHelpButton onTouchEnd={() => dispatch(openHelp())} />
                </TrackMessageText>
              </TrackMessage>
            </TargetGuide>
          </div>
        )}

        {opened && (
          <MessageComponent
            id={id}
            data={data}
            currentEntity={currentEntity}
            loadingEntity={loadingEntity}
          />
        )}

        {!loadingEntity && (!entityTracked || opened) && (
          <StyledStickerButton onClick={() => router.push(process.env.PUBLIC_PATH || '/')} />
        )}
      </div>
    );
  }
}

export default firebaseConnect(
  ({ params: { id } }) => ([{ path: `messages/${id}`, storeAs: 'message' }]),
)(connect(
  ({
    firebase: { data: { message } },
    currentEntity,
    loadingEntity,
    helpOpened,
  }) => ({
    data: message,
    currentEntity,
    loadingEntity,
    helpOpened,
  }),
)(Message));
