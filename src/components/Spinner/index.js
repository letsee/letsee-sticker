// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import spin from './idc-loading-t.png';
import spin2x from './idc-loading-t@2x.png';
import spin3x from './idc-loading-t@3x.png';

import graySpin from './idc-loading-t-g.png';
import graySpin2x from './idc-loading-t-g@2x.png';
import graySpin3x from './idc-loading-t-g@3x.png';

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

type SpinnerPropTypes = {
  gray?: boolean,
};

const Spinner = ({ gray, ...other }: SpinnerPropTypes) => (
  <SpinnerImage
    alt="Loading.."
    src={gray ? graySpin : spin}
    srcSet={`${gray ? graySpin2x : spin2x} 2x, ${gray ? graySpin3x : spin3x} 3x`}
    {...other}
  />
);

Spinner.propTypes = {
  gray: PropTypes.bool,
};

Spinner.defaultProps = {
  gray: false,
};

export default Spinner;
