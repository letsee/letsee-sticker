// @flow
import React from 'react';
import styled from 'styled-components';

const SwipeImage = styled.img`
  display: block;
  margin: 0 auto 2px auto;
`;

const SwipeText = styled.div`
  opacity: 0.8;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.6px;
  text-align: center;
  color: #fff;
`;

const Swipe = ({ children, ...other }) => (
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
