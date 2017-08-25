// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Guide = styled.div`
  position: absolute;
  left: ${props => props.horizontal}px;
  right: ${props => props.horizontal}px;
  height: 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

const TopGuide = Guide.extend`
  top: ${props => props.vertical}px;
  border-bottom: 0;
`;

const BottomGuide = Guide.extend`
  bottom: ${props => props.vertical}px;
  border-top: 0;
`;

type TargetGuidePropTypes = {
  vertical?: number,
  horizontal?: number,
  children?: any, // eslint-disable-line react/require-default-props
};

const TargetGuide = ({
  horizontal,
  vertical,
  children,
  ...other
}: TargetGuidePropTypes) => (
  <div {...other}>
    <TopGuide
      horizontal={horizontal}
      vertical={vertical}
    />
    <BottomGuide
      horizontal={horizontal}
      vertical={vertical}
    />
    {children}
  </div>
);

TargetGuide.defaultProps = {
  horizontal: 16,
  vertical: 80,
};

TargetGuide.propTypes = {
  horizontal: PropTypes.number,
  vertical: PropTypes.number,
};

export default TargetGuide;
