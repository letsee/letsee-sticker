// @flow
import React from 'react';
import styled from 'styled-components';
import Frame from './Frame';

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

const AppLoader = ({ children, ...other }) => (
  <Frame {...other}>
    <Text>
      <div>스티커 메세지를 남길</div>
      <div>제품을 비춰주세요</div>
    </Text>
  </Frame>
);

export default AppLoader;