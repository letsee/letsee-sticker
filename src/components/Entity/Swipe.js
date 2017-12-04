// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

const FadeOutLeft = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const FadeOut = keyframes`
  from {
    opacity: 0.8;
  }

  to {
    opacity: 0;
  }
`;

const SwipeImage = styled.img`
  display: block;
  margin: 0 auto 2px auto;
  opacity: 0;
  animation-delay: 0.5s;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-iteration-count: 2;
  animation-name: ${FadeOutLeft};
`;

const SwipeText = styled.div`
  opacity: 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.6px;
  text-align: center;
  color: #fff;
  animation-delay: 0.5s;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-iteration-count: 2;
  animation-name: ${FadeOut};
`;

type SwipeProps = {
  children?: any, // eslint-disable-line react/require-default-props
};


const Swipe = ({ children, ...other }: SwipeProps) => (
  <div {...other}>
    <SwipeImage
      alt="밀어서 더 보기"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_35,q_auto/v1503567355/assets/idc-swipe_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_70,q_auto/v1503567355/assets/idc-swipe_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_105,q_auto/v1503567355/assets/idc-swipe_3x.png 3x
      "
    />

    <SwipeText>밀어서 더 보기</SwipeText>
  </div>
);

export default Swipe;
