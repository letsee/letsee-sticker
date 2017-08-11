// @flow
import React from 'react';
import styled from 'styled-components';

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
    src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_126,q_auto/v1502251629/assets/idc-zpos_3x.png"
    srcSet="
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_252,q_auto/v1502251629/assets/idc-zpos_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_378,q_auto/v1502251629/assets/idc-zpos_3x.png 3x
    "
    {...props}
  />
);

export default TranslateZ;
