// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Circles = styled.div`
  line-height: 0;
  text-align: center;
  user-select: none;
`;

const circleBounce = keyframes`
  0%, 80%, 100% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.4);
  }
`;

const Circle = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 0.6;
  animation: ${circleBounce} 1.4s infinite ease-in-out both;
`;

const GreenCircle = Circle.extend`
  background-color: rgba(0, 234, 255, 0.7);
  animation-delay: -0.32s;
`;

const BlueCircle = Circle.extend`
  background-color: #1c1cff;
  margin: 0 10px;
  animation-delay: -0.16s;
`;

const RedCircle = Circle.extend`
  background-color: #ff4d00;
`;

const Text = styled.div`
  text-align: center;
  user-select: none;
  margin-top: 10px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  letter-spacing: -0.3px;
  color: #fff;
`;

type PropTypes = {
  children?: any, // eslint-disable-line react/require-default-props
};

const EntityLoader = ({ children, ...other }: PropTypes) => (
  <div {...other}>
    <Circles>
      <GreenCircle />
      <BlueCircle />
      <RedCircle />
    </Circles>

    <Text>
      로딩중
    </Text>
  </div>
);

export default EntityLoader;
