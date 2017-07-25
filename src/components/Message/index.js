// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';
import moment from 'moment';
import Frame from '../Frame';
import Envelope from './Envelope';
import CaptureButton from '../CaptureButton';
import LeaveMessageButton from '../LeaveMessageButton';

const MAX_DIAGONAL = 500;
const MIN_DIAGONAL = 400;

const FrameText = styled.div`
  user-select: none;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: AppleSDGothicNeo, sans-serif;
  opacity: 0.8;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.8px;
  color: #fff;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  user-select: none;
  padding: 16px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 15px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.5);
`;

const NavBottomLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const NavBottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const createStickers = (stickers) => {
  const stickersObj = new Object3D();

  for (let i = 0; i < stickers.length; i += 1) {
    const { position, rotation, scale, text } = stickers[i];
    const stickerElem = document.createElement('div'); // TODO styling
    stickerElem.innerHTML = text.replace(/[\n\r]/g, '<br />');
    const stickerRenderable = new DOMRenderable(stickerElem);
    stickerRenderable.position.set(position.x, position.y, position.z);
    stickerRenderable.rotation.set(rotation.x, rotation.y, rotation.z);
    stickerRenderable.scale.setScalar(scale);
    stickersObj.add(stickerRenderable);
  }

  return stickersObj;
};

type MessagePropTypes = {
  currentEntity: string | null,
  data: {
    entity: { uri: string, name: string, image?: string },
    author: { firstname: string, lastname: string },
    createdAt: string,
    stickers: {
      position: { x: number, y: number, z: number },
      rotation: { x: number, y: number, z: number },
      scale: number,
      text: string,
    }[],
  },
  onCaptureClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onLeaveMessageClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

type MessageStateTypes = {
  opened: boolean,
};

class Message extends Component {
  constructor(props: MessagePropTypes) {
    super(props);

    this.state = {
      opened: false,
    };

    if (typeof letsee !== 'undefined' && letsee !== null) {
      this.messageObject = new Object3D();
    }
  }

  state: MessageStateTypes;

  componentWillReceiveProps(nextProps: MessagePropTypes) {
    if (
      isLoaded(nextProps.data) &&
      !isEmpty(nextProps.data) &&
      nextProps.data &&
      nextProps.currentEntity !== null &&
      nextProps.currentEntity === nextProps.data.entity.uri
    ) {
      this.renderAR(nextProps);
    }
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null && this.props.data && this.props.data.entity) {
      const entity = letsee.getEntity(this.props.data.entity.uri);

      if (entity) {
        entity.object.remove(this.messageObject);
        entity.removeRenderables();
      }
    }
  }

  props: MessagePropTypes;

  renderAR({ data: { entity: { uri }, author, stickers } }: MessagePropTypes) {
    const entity = letsee.getEntity(uri);

    if (this.messageObject.parent !== entity.object) {
      entity.addRenderable(this.messageObject);
    }

    for (let i = this.messageObject.children.length; i >= 0; i -= 1) {
      this.messageObject.remove(this.messageObject.children[i]);
    }

    if (this.state.opened) {
      for (let i = 0; i < stickers.length; i += 1) {
        const { position, rotation, scale, text } = stickers[i];
        const stickerElem = document.createElement('div'); // TODO styling
        stickerElem.innerHTML = text.replace(/[\n\r]/g, '<br />');
        const stickerRenderable = new DOMRenderable(stickerElem);
        stickerRenderable.position.set(position.x, position.y, position.z);
        stickerRenderable.rotation.set(rotation.x, rotation.y, rotation.z);
        stickerRenderable.scale.setScalar(scale);
        this.messageObject.add(stickerRenderable);
      }

      // TODO
      // const stickersObj = createStickers(stickers);
      // this.messageObject.add(stickersObj);
    } else {
      const { width, height, depth } = entity.size;
      let realDiagonal = 500;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = Math.min(MAX_DIAGONAL, Math.max(realDiagonal, MIN_DIAGONAL));
      const realToClamped = realDiagonal / diagonal;

      const tmp = document.createElement('template');
      tmp.innerHTML = renderToString(<Envelope data={author} size={diagonal} />);
      const envelope = tmp.content.firstChild;
      const envelopeButton = envelope.querySelector('button');
      const envelopeRenderable = new DOMRenderable(envelope);

      if (diagonal !== realDiagonal) {
        envelopeRenderable.scale.setScalar(realToClamped);
      }

      if (typeof depth !== 'undefined' && depth !== null) {
        envelopeRenderable.position.setZ(depth / 2);
      }

      envelopeButton.addEventListener('click', () => {
        this.setState({ opened: true }, () => {
          this.messageObject.remove(envelopeRenderable);

          for (let i = 0; i < stickers.length; i += 1) {
            const { position, rotation, scale, text } = stickers[i];
            const stickerElem = document.createElement('div'); // TODO styling
            stickerElem.innerHTML = text.replace(/[\n\r]/g, '<br />');
            const stickerRenderable = new DOMRenderable(stickerElem);
            stickerRenderable.position.set(position.x, position.y, position.z);
            stickerRenderable.rotation.set(rotation.x, rotation.y, rotation.z);
            stickerRenderable.scale.setScalar(scale);
            this.messageObject.add(stickerRenderable);
          }

          // TODO
          // const stickersObj = createStickers(stickers);
          // this.messageObject.add(stickersObj);
        });
      });

      this.messageObject.add(envelopeRenderable);
    }
  }

  render() {
    const {
      currentEntity,
      data,
      onCaptureClick,
      onLeaveMessageClick,
      firebase,
      dispatch,
      children,
      ...other
    } = this.props;

    if (!isLoaded(data)) {
      // TODO
      return (
        <h1>LOADING</h1>
      );
    }

    if (isEmpty(data) || !data) {
      // TODO
      return (
        <h1>404</h1>
      );
    }

    const { entity: { name, uri, image }, author: { firstname, lastname }, createdAt } = data;
    const authorName = `${firstname} ${lastname}`.trim();
    const friendlyCreatedAt = moment(createdAt, 'YYYYMMDDHHmmssZZ').format('YYYY년 M월 D일');
    const entityTracked = currentEntity !== null && currentEntity === uri;

    if (!entityTracked) {
      return (
        <Frame>
          <FrameText>
            <div>
              {name}를 비춰
            </div>

            <div>
              {authorName}님의 스티커 메세지를 확인하세요
            </div>
          </FrameText>
        </Frame>
      );
    }

    const { opened } = this.state;

    return (
      <div {...other}>
        {opened && (
          <Header>
            {authorName}님이 {friendlyCreatedAt}에 보냄
          </Header>
        )}

        <NavBottomLeft>
          <CaptureButton onClick={onCaptureClick} />
        </NavBottomLeft>

        {opened && (
          <NavBottomRight>
            <LeaveMessageButton onClick={onLeaveMessageClick} />
          </NavBottomRight>
        )}
      </div>
    );
  }
}

export default firebaseConnect(({ id }) => ([{ path: `messages/${id}`, storeAs: 'message' }]))(connect(({ firebase: { data: { message } }, currentEntity }) => ({ data: message, currentEntity }))(Message));
