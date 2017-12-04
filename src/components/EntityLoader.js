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
  width: ${props => props.size * 0.04 * 20 / 14}px;
  height: ${props => props.size * 0.04 * 20 / 14}px;
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
  margin: 0 ${props => props.size * 0.04 * 10 / 14}px;
  animation-delay: -0.16s;
`;

const RedCircle = Circle.extend`
  background-color: #ff4d00;
`;

const Text = styled.div`
  text-align: center;
  user-select: none;
  margin-top: ${props => props.size * 0.04 * 10 / 14}px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: ${props => props.size * 0.04}px;
  letter-spacing: ${props => -props.size * 0.04 * 0.3 / 14}px;
  color: #fff;
`;

type EntityLoaderProps = {
  size: number,
  children?: any, // eslint-disable-line react/require-default-props
};

const EntityLoader = ({ size, children, ...other }: EntityLoaderProps) => (
  <div {...other}>
    <Circles>
      <GreenCircle size={size} />
      <BlueCircle size={size} />
      <RedCircle size={size} />
    </Circles>

    <Text size={size}>
      로딩중
    </Text>
  </div>
);

export default EntityLoader;
