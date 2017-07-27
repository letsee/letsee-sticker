// @flow
import React from 'react';
import styled from 'styled-components';

import zImage from './idc-zpos.png';
import zImage2x from './idc-zpos@2x.png';
import zImage3x from './idc-zpos@3x.png';

const TranslateZImage = styled.img`
  display: block;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: transparent;
  outline: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

const TranslateZ = props => (
  <TranslateZImage
    src={zImage}
    srcSet={`${zImage2x} 2x, ${zImage3x} 3x`}
    {...props}
  />
);

export default TranslateZ;
