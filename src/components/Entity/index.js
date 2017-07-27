// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import { ImageButton } from '../Button';
import CaptureButton from '../CaptureButton';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';

import createIcon from './btn-create.png';
import createIcon2x from './btn-create@2x.png';
import createIcon3x from './btn-create@3x.png';

import addIcon from './btn-add-content.png';
import addIcon2x from './btn-add-content@2x.png';
import addIcon3x from './btn-add-content@3x.png';

const StyledCaptureButton = styled(CaptureButton)`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const StyledImageButton = ImageButton.extend`
  position: absolute;
  right: 2px;
  bottom: 79px;
  margin: 0 auto;
`;

const MessageText = styled.div`
  opacity: 0.8;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: ${props => props.size * 0.06}px;
  font-weight: 800;
  letter-spacing: ${props => -props.size * 0.06 * 0.8 / 25}px;
  text-align: center;
  color: #fff;
`;

type EntityPropTypes = {
  data: {
    uri: string,
    name: string,
    size: {
      height: number,
      depth: number,
    },
  },
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onCaptureClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

class Entity extends Component {
  componentWillMount() {
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: EntityPropTypes) {
    this.renderAR(nextProps);
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(this.props.data.uri);

      entity.object.children.forEach((child) => {
        if (child instanceof DOMRenderable) {
          child.element.removeEventListener('click', this.props.onNewClick);
        }

        entity.object.remove(child);
      });

      entity.removeRenderables();
    }
  }

  props: EntityPropTypes;

  renderAR({ data, onNewClick }: EntityPropTypes) {
    const { name, uri, size: { width, height, depth } } = data;
    const entity = letsee.getEntity(uri);

    entity.object.children.forEach((child) => {
      if (child instanceof DOMRenderable) {
        child.element.removeEventListener('click', onNewClick);
      }

      entity.object.remove(child);
    });

    entity.removeRenderables();

    let realDiagonal = MAX_DIAGONAL;

    if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
      realDiagonal = Math.sqrt((width * width) + (height * height));
    }

    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    const nameTmp = document.createElement('template');
    const buttonTmp = document.createElement('template');

    nameTmp.innerHTML = renderToString(
      <MessageText size={diagonal}>
        <div>
          {name}에
        </div>

        <div>
          스티커 메세지를 남겨보세요
        </div>
      </MessageText>,
    );

    buttonTmp.innerHTML = renderToString(
      <ImageButton type="button">
        <img
          src={addIcon}
          srcSet={`${addIcon2x} 2x, ${addIcon3x} 3x`}
          alt={`${name}에 스티커 메세지를 남겨보세요`}
          width={diagonal * 0.33}
        />
      </ImageButton>,
    );

    const nameElem = nameTmp.content.firstChild;
    const buttonElem = buttonTmp.content.firstChild;

    buttonElem.addEventListener('click', onNewClick);

    const nameAR = new DOMRenderable(nameElem);
    const buttonAR = new DOMRenderable(buttonElem);

    if (realDiagonal !== diagonal) {
      nameAR.scale.setScalar(realToClamped);
      buttonAR.scale.setScalar(realToClamped);
    }

    if (depth !== null && typeof depth !== 'undefined') {
      nameAR.position.setZ(depth / 2);
      buttonAR.position.setZ(depth / 2);
    }

    entity.addRenderable(nameAR);
    nameAR.position.setY((height + (nameElem.clientHeight * realToClamped)) / 2 + realDiagonal * 0.04);
    entity.addRenderable(buttonAR);
  }

  render() {
    const {
      data: { name },
      onCaptureClick,
      onNewClick,
      children,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <StyledCaptureButton onClick={onCaptureClick} />

        <StyledImageButton
          type="button"
          onClick={onNewClick}
        >
          <img
            alt={`${name}에 스티커 메세지를 남겨보세요`}
            src={createIcon}
            srcSet={`${createIcon2x} 2x, ${createIcon3x} 3x`}
          />
        </StyledImageButton>
      </div>
    );
  }
}

export default Entity;