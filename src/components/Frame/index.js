// @flow
import React from 'react';
import styled from 'styled-components';

import leftTop from './frame-b-lt.png';
import leftTop2x from './frame-b-lt@2x.png';
import leftTop3x from './frame-b-lt@3x.png';

import rightTop from './frame-b-rt.png';
import rightTop2x from './frame-b-rt@2x.png';
import rightTop3x from './frame-b-rt@3x.png';

import leftBottom from './frame-b-lb.png';
import leftBottom2x from './frame-b-lb@2x.png';
import leftBottom3x from './frame-b-lb@3x.png';

import rightBottom from './frame-b-rb.png';
import rightBottom2x from './frame-b-rb@2x.png';
import rightBottom3x from './frame-b-rb@3x.png';

const FrameImage = styled.img`
  position: fixed;
  user-select: none;
`;

const FrameLeftTop = FrameImage.extend`
  left: 45px;
  top: 78px;
`;

const FrameRightTop = FrameImage.extend`
  right: 45px;
  top: 78px;
`;

const FrameLeftBottom = FrameImage.extend`
  left: 45px;
  bottom: 78px;
`;

const FrameRightBottom = FrameImage.extend`
  right: 45px;
  bottom: 78px;
`;

type FramePropTypes = {
  children?: any, // eslint-disable-line react/require-default-props
};

const Frame = ({ children, ...other }: FramePropTypes) => (
  <div {...other}>
    <FrameLeftTop
      src={leftTop}
      srcSet={`${leftTop2x} 2x, ${leftTop3x} 3x`}
    />

    <FrameRightTop
      src={rightTop}
      srcSet={`${rightTop2x} 2x, ${rightTop3x} 3x`}
    />

    <FrameLeftBottom
      src={leftBottom}
      srcSet={`${leftBottom2x} 2x, ${leftBottom3x} 3x`}
    />

    <FrameRightBottom
      src={rightBottom}
      srcSet={`${rightBottom2x} 2x, ${rightBottom3x} 3x`}
    />

    {children}
  </div>
);

export default Frame;
