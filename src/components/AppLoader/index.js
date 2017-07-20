// @flow
import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

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

const Frame = styled.img`
  position: absolute;
  user-select: none;
`;

const FrameLeftTop = Frame.extend`
  left: 45px;
  top: 78px;
`;

const FrameRightTop = Frame.extend`
  right: 45px;
  top: 78px;
`;

const FrameLeftBottom = Frame.extend`
  left: 45px;
  bottom: 78px;
`;

const FrameRightBottom = Frame.extend`
  right: 45px;
  bottom: 78px;
`;

const Text = styled.div`
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

type PropTypes = {
  text: string,
  children?: any, // eslint-disable-line react/require-default-props
};

const AppLoader = ({ text, children, ...other }: PropTypes) => (
  <Container {...other}>
    <div>
      <FrameLeftTop
        src={leftTop}
        srcSet={`${leftTop2x} 2x, ${leftTop3x} 3x`}
        alt={text}
      />

      <FrameRightTop
        src={rightTop}
        srcSet={`${rightTop2x} 2x, ${rightTop3x} 3x`}
        alt={text}
      />

      <FrameLeftBottom
        src={leftBottom}
        srcSet={`${leftBottom2x} 2x, ${leftBottom3x} 3x`}
        alt={text}
      />

      <FrameRightBottom
        src={rightBottom}
        srcSet={`${rightBottom2x} 2x, ${rightBottom3x} 3x`}
        alt={text}
      />
    </div>

    <Text>
      <div>스티커 메세지를 남길</div>
      <div>제품을 비춰주세요</div>
    </Text>
  </Container>
);

AppLoader.defaultProps = {
  text: '스티커 메세지를 남길 제품을 비춰주세요',
};

export default AppLoader;
