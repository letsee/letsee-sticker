// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FrameImage = styled.img`
  position: absolute;
  user-select: none;
`;

const FrameLeftTop = FrameImage.extend`
  left: ${props => props.left}px;
  top: ${props => props.top}px;
`;

const FrameRightTop = FrameImage.extend`
  right: ${props => props.right}px;
  top: ${props => props.top}px;
`;

const FrameLeftBottom = FrameImage.extend`
  left: ${props => props.left}px;
  bottom: ${props => props.bottom}px;
`;

const FrameRightBottom = FrameImage.extend`
  right: ${props => props.right}px;
  bottom: ${props => props.bottom}px;
`;

type FramePropTypes = {
  vertical?: number,
  horizontal?: number,
  white?: boolean,
  children?: any, // eslint-disable-line react/require-default-props
};

const Frame = ({ vertical, horizontal, white, children, ...other }: FramePropTypes) => {
  const colorPrefix = white ? 'w' : 'b';

  return (
    <div {...other}>
      <FrameLeftTop
        top={vertical}
        left={horizontal}
        src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1501840168/assets/frame-${colorPrefix}-lt_3x.png`}
        srcSet={`
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1501840168/assets/frame-${colorPrefix}-lt_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1501840168/assets/frame-${colorPrefix}-lt_3x.png 3x
        `}
      />

      <FrameRightTop
        top={vertical}
        right={horizontal}
        src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1501840168/assets/frame-${colorPrefix}-rt_3x.png`}
        srcSet={`
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1501840168/assets/frame-${colorPrefix}-rt_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1501840168/assets/frame-${colorPrefix}-rt_3x.png 3x
        `}
      />

      <FrameLeftBottom
        bottom={vertical}
        left={horizontal}
        src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1501840168/assets/frame-${colorPrefix}-lb_3x.png`}
        srcSet={`
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1501840168/assets/frame-${colorPrefix}-lb_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1501840168/assets/frame-${colorPrefix}-lb_3x.png 3x
        `}
      />

      <FrameRightBottom
        bottom={vertical}
        right={horizontal}
        src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1501840168/assets/frame-${colorPrefix}-rb_3x.png`}
        srcSet={`
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1501840168/assets/frame-${colorPrefix}-rb_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1501840168/assets/frame-${colorPrefix}-rb_3x.png 3x
        `}
      />

      {children}
    </div>
  );
};

Frame.defaultProps = {
  white: false,
  vertical: 99,
  horizontal: 45,
};

Frame.propTypes = {
  white: PropTypes.bool,
  vertical: PropTypes.number,
  horizontal: PropTypes.number,
};

export default Frame;
