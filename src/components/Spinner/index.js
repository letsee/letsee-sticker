import React from 'react';
import styled, { keyframes } from 'styled-components';

import spin from './idc-loading-t.png';
import spin2x from './idc-loading-t@2x.png';
import spin3x from './idc-loading-t@3x.png';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerImage = styled.img`
  display: block;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  animation: 0.8s ${spinAnimation} infinite linear;
`;

const Spinner = () => (
  <SpinnerImage
    alt="Loading.."
    src={spin}
    srcSet={`${spin2x} 2x, ${spin3x} 3x`}
  />
);

export default Spinner;
