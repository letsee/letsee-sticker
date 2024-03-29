// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import styled, { css } from 'styled-components';
import clamp from 'lodash/clamp';
import {
  MIN_DIAGONAL,
  MAX_DIAGONAL,
} from '../constants';
import type {
  MessageEntity,
  Sticker as StickerType,
  StickerRotation,
  StickerQuaternion,
} from '../types';

const StickerMixin = css`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: #fff;
  text-align: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  opacity: 0.9;
`;

const EmojiSticker = styled.div`
  ${StickerMixin}
  font-size: ${props => props.size * 0.22}px;
  letter-spacing: ${props => props.size * 0.22 * 3 / 94}px;
`;

const TextSticker = styled.div`
  ${StickerMixin}
  font-family: 'Noto Sans KR Black', AppleSDGothicNeo, sans-serif;
  font-size: ${props => props.size * 0.11}px;
  font-weight: 800;
  line-height: normal;
  letter-spacing: ${props => -props.size * 0.11 * 0.8 / 48}px;
  text-shadow: 0 0 ${props => props.size * 0.11 * 12 / 48}px rgba(0, 0, 0, 0.5);
`;

const compareQuaternions = (a: ?StickerQuaternion, b: ?StickerQuaternion): boolean => {
  if (!a || !b) {
    return false;
  }

  return (
    a.x === b.x &&
    a.y === b.y &&
    a.z === b.z &&
    a.w === b.w
  );
};

const compareRotations = (a: ?StickerRotation, b: ?StickerRotation): boolean => {
  if (!a || !b) {
    return false;
  }

  return (
    a.x === b.x &&
    a.y === b.y &&
    a.z === b.z
  );
};

type StickerPropTypes = {
  entity: MessageEntity,
  data: StickerType,
};

class Sticker extends Component {
  constructor(props: StickerPropTypes) {
    super(props);

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const container = document.createElement('div');
      this.stickerObject = new DOMRenderable(container);
    }
  }

  componentDidMount() {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      this.renderAR(this.props);
    }
  }

  componentWillReceiveProps(nextProps: StickerPropTypes) {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      if (
        nextProps.entity.uri !== this.props.entity.uri ||
        nextProps.data.type !== this.props.data.type ||
        nextProps.data.text !== this.props.data.text ||
        nextProps.data.scale !== this.props.data.scale ||
        nextProps.data.position.x !== this.props.data.position.x ||
        nextProps.data.position.y !== this.props.data.position.y ||
        nextProps.data.position.z !== this.props.data.position.z ||
        !compareQuaternions(nextProps.data.quaternion, this.props.data.quaternion) ||
        !compareRotations(nextProps.data.rotation, this.props.data.rotation)
      ) {
        this.renderAR(nextProps);
      }
    }
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(this.props.entity.uri);

      if (entity) {
        entity.removeRenderable(this.stickerObject);
      }
    }
  }

  props: StickerPropTypes;

  renderAR({ entity: { uri }, data }: StickerPropTypes) {
    const entity = letsee.getEntity(uri);

    if (entity) {
      const { width, height } = entity.size;
      let realDiagonal = MAX_DIAGONAL;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;

      if (this.stickerObject.parent !== entity.object) {
        entity.addRenderable(this.stickerObject);
      }

      const { position, rotation, quaternion, scale, text, type } = data;
      this.stickerObject.position.set(position.x, position.y, position.z);
      this.stickerObject.scale.setScalar(scale * realToClamped);

      if (quaternion) {
        this.stickerObject.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
      } else {
        this.stickerObject.quaternion.setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
      }

      const textContent = text.trim().split(/[\n\r]/g).map((line, i) => (
        <div key={i}>
          {line.length > 0 && line}
          <br />
        </div>
      ));

      render(
        type === 'emoji' ? (
          <EmojiSticker size={diagonal}>
            {textContent}
          </EmojiSticker>
        ) : (
          <TextSticker size={diagonal}>
            {textContent}
          </TextSticker>
        ),
        this.stickerObject.element,
      );
    }
  }

  render() {
    return null;
  }
}

export default Sticker;
