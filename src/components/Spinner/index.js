// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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
    src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_28,q_auto/v1501869525/assets/idc-loading-t${gray ? '-g' : ''}_3x.png`}
    srcSet={`
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_56,q_auto/v1501869525/assets/idc-loading-t${gray ? '-g' : ''}_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_84,q_auto/v1501869525/assets/idc-loading-t${gray ? '-g' : ''}_3x.png 3x
    `}
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
