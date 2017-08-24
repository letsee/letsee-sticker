// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import ShareButton from '../ShareButton';
import MessageMeta from '../MessageMeta';
import ShareModal from '../ShareModal';
import openCapture from '../../openCapture';
import openKakaoLink from '../../openKakaoLink';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';
import styles from '../App.scss';
import type { Message as MessageType } from '../../types';

const StyledMessageMeta = styled(MessageMeta)`
  position: absolute;
  left: 16px;
  bottom: 14px;
`;

const StyledShareButton = styled(ShareButton)`
  position: absolute;
  right: 11px;
  bottom: 3px;
`;

type MessagePropTypes = {
  id: string,
  currentEntity: string | null,
  data: MessageType,
  loadingEntity: boolean,
  onClose?: MouseEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Message extends Component {
  constructor(props: MessagePropTypes) {
    super(props);

    this.state = {
      shareModalOpened: false,
    };

    if (typeof letsee !== 'undefined' && letsee !== null) {
      this.messageObject = new Object3D();
    }
  }

  state: {
    shareModalOpened: boolean,
  };

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

  renderAR({ data: { entity: { uri }, stickers } }: MessagePropTypes) {
    const entity = letsee.getEntity(uri);
    const { width, height } = entity.size;
    let realDiagonal = MAX_DIAGONAL;

    if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
      realDiagonal = Math.sqrt((width * width) + (height * height));
    }

    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    if (this.messageObject.parent !== entity.object) {
      entity.addRenderable(this.messageObject);
    }

    for (let i = this.messageObject.children.length; i >= 0; i -= 1) {
      this.messageObject.remove(this.messageObject.children[i]);
    }

    for (let i = 0; i < stickers.length; i += 1) {
      const { position, rotation, quaternion, scale, text, type } = stickers[i];
      const stickerElem = document.createElement('div');
      stickerElem.className = styles[type];

      if (type === 'emoji') {
        const fontSize = diagonal * 0.22;
        stickerElem.style.fontSize = `${fontSize}px`;
        stickerElem.style.letterSpacing = `${-fontSize * 3 / 94}px`;
      } else if (type === 'text') {
        const fontSize = diagonal * 0.11;
        stickerElem.style.fontSize = `${fontSize}px`;
        stickerElem.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
        stickerElem.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
      }

      stickerElem.innerHTML = text.replace(/[\n\r]/g, '<br />');
      const stickerRenderable = new DOMRenderable(stickerElem);
      stickerRenderable.position.set(position.x, position.y, position.z);

      if (quaternion) {
        stickerRenderable.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
      } else {
        stickerRenderable.quaternion.setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
      }

      stickerRenderable.scale.setScalar(scale * realToClamped);
      this.messageObject.add(stickerRenderable);
    }
  }

  render() {
    const {
      id,
      currentEntity,
      data,
      onClose,
      loadingEntity,
      children,
      ...other
    } = this.props;

    const { entity: { uri, name }, author, timestamp } = data;
    const entityTracked = currentEntity !== null && currentEntity === uri;
    const { firstname, lastname } = author;
    const authorName = `${firstname} ${lastname}`.trim();
    const { shareModalOpened } = this.state;

    return (
      <div {...other}>
        {entityTracked && (
          <div>
            <StyledMessageMeta
              author={author}
              timestamp={timestamp}
            />

            <StyledShareButton onClick={() => this.setState({ shareModalOpened: true })} />
          </div>
        )}

        {shareModalOpened && (
          <ShareModal
            onClose={() => this.setState({ shareModalOpened: false })}
            onCaptureClick={() => {
              openCapture();
              this.setState({ shareModalOpened: false });
            }}
            onKakaoLinkClick={() => {
              openKakaoLink(id, authorName, name, {
                fail: (...args) => {
                  // TODO error
                  console.log(args);
                },
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default Message;
