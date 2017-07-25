// @flow
import React from 'react';
import styled from 'styled-components';

import leftTopBlue from './frame-b-lt.png';
import leftTopBlue2x from './frame-b-lt@2x.png';
import leftTopBlue3x from './frame-b-lt@3x.png';

import rightTopBlue from './frame-b-rt.png';
import rightTopBlue2x from './frame-b-rt@2x.png';
import rightTopBlue3x from './frame-b-rt@3x.png';

import leftBottomBlue from './frame-b-lb.png';
import leftBottomBlue2x from './frame-b-lb@2x.png';
import leftBottomBlue3x from './frame-b-lb@3x.png';

import rightBottomBlue from './frame-b-rb.png';
import rightBottomBlue2x from './frame-b-rb@2x.png';
import rightBottomBlue3x from './frame-b-rb@3x.png';

import leftTopWhite from './frame-w-lt.png';
import leftTopWhite2x from './frame-w-lt@2x.png';
import leftTopWhite3x from './frame-w-lt@3x.png';

import rightTopWhite from './frame-w-rt.png';
import rightTopWhite2x from './frame-w-rt@2x.png';
import rightTopWhite3x from './frame-w-rt@3x.png';

import leftBottomWhite from './frame-w-lb.png';
import leftBottomWhite2x from './frame-w-lb@2x.png';
import leftBottomWhite3x from './frame-w-lb@3x.png';

import rightBottomWhite from './frame-w-rb.png';
import rightBottomWhite2x from './frame-w-rb@2x.png';
import rightBottomWhite3x from './frame-w-rb@3x.png';


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

const Frame = ({ vertical, horizontal, white, children, ...other }: FramePropTypes) => (
  <div {...other}>
    <FrameLeftTop
      top={vertical}
      left={horizontal}
      src={white ? leftTopWhite : leftTopBlue}
      srcSet={white ? `${leftTopWhite2x} 2x, ${leftTopWhite3x} 3x` : `${leftTopBlue2x} 2x, ${leftTopBlue3x} 3x`}
    />

    <FrameRightTop
      top={vertical}
      right={horizontal}
      src={white ? rightTopWhite : rightTopBlue}
      srcSet={white ? `${rightTopWhite2x} 2x, ${rightTopWhite3x} 3x` : `${rightTopBlue2x} 2x, ${rightTopBlue3x} 3x`}
    />

    <FrameLeftBottom
      bottom={vertical}
      left={horizontal}
      src={white ? leftBottomWhite : leftBottomBlue}
      srcSet={white ? `${leftBottomWhite2x} 2x, ${leftBottomWhite3x} 3x` : `${leftBottomBlue2x} 2x, ${leftBottomBlue3x} 3x`}
    />

    <FrameRightBottom
      bottom={vertical}
      right={horizontal}
      src={white ? rightBottomWhite : rightBottomBlue}
      srcSet={white ? `${rightBottomWhite2x} 2x, ${rightBottomWhite3x} 3x` : `${rightBottomBlue2x} 2x, ${rightBottomBlue3x} 3x`}
    />

    {children}
  </div>
);

Frame.defaultProps = {
  white: false,
  vertical: 78,
  horizontal: 45,
};

export default Frame;
