// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import { ImageButton } from '../Button';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';

const ARContainer = styled.div`
  position: relative;
`;

const StyledImageButton = ImageButton.extend`
  margin: 0 auto;
`;

const StyledImageButtonRight = StyledImageButton.extend`
  position: absolute;
  right: 2px;
  bottom: 79px;
`;

const MessageText = styled.div`
  position: absolute;
  white-space: nowrap;
  left: 50%;
  bottom: ${props => props.height}px;
  transform: translateX(-50%);
  opacity: 0.8;
  font-family: 'Noto Sans KR Black', AppleSDGothicNeo, sans-serif;
  font-size: ${props => props.size * 0.06}px;
  font-weight: 800;
  letter-spacing: ${props => -props.size * 0.06 * 0.8 / 25}px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 ${props => props.size * 0.06 * 12 / 25}px rgba(0, 0, 0, 0.5);
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
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

class Entity extends Component {
  constructor(props: EntityPropTypes) {
    super(props);

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const container = document.createElement('div');
      this.object = new DOMRenderable(container);
    }
  }

  componentDidMount() {
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: EntityPropTypes) {
    this.renderAR(nextProps);
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(this.props.data.uri);
      entity.removeRenderable(this.object);
    }
  }

  props: EntityPropTypes;

  renderAR({ data, onNewClick }: EntityPropTypes) {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const { name, uri, size: { width, height, depth } } = data;
      const entity = letsee.getEntity(uri);

      if (this.object.parent !== entity.object) {
        entity.addRenderable(this.object);
      }

      let realDiagonal = MAX_DIAGONAL;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;

      if (realDiagonal !== diagonal) {
        this.object.scale.setScalar(realToClamped);
      }

      if (depth !== null && typeof depth !== 'undefined') {
        this.object.position.setZ(depth / 2);
      }

      const buttonSize = diagonal * 0.33;
      const nearest = Math.ceil(buttonSize / 100) * 100;
      const y = ((buttonSize + (height / realToClamped)) / 2) + (diagonal * 0.04);

      render(
        <ARContainer>
          <MessageText
            size={diagonal}
            height={y}
          >
            <div>
              {name}에
            </div>

            <div>
              스티커 메세지를 남겨보세요
            </div>
          </MessageText>

          <StyledImageButton
            type="button"
            onClick={onNewClick}
          >
            <img
              src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest},q_auto/v1501870222/assets/btn-add-content_3x.png`}
              srcSet={`
                https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest * 2},q_auto/v1501870222/assets/btn-add-content_3x.png 2x,
                https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest * 3},q_auto/v1501870222/assets/btn-add-content_3x.png 3x
              `}
              alt={`${name}에 스티커 메세지를 남겨보세요`}
              height={buttonSize}
            />
          </StyledImageButton>
        </ARContainer>,
        this.object.element,
      );
    }
  }

  render() {
    const {
      data: { name },
      onNewClick,
      children,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <StyledImageButtonRight
          type="button"
          onTouchEnd={onNewClick}
        >
          <img
            alt={`${name}에 스티커 메세지를 남겨보세요`}
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_72/v1501868965/assets/btn-create_3x.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_144/v1501868965/assets/btn-create_3x.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_216/v1501868965/assets/btn-create_3x.png 3x
            "
          />
        </StyledImageButtonRight>
      </div>
    );
  }
}

Entity.propTypes = {
  data: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onNewClick: PropTypes.func,
};

export default Entity;
