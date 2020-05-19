// @flow
import React from 'react';
import { ImageButton } from '../Button';

const PrevButton = ({ children, ...other }) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589798377/assets/btn_prev_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589798377/assets/btn_prev_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589798377/assets/btn_prev_3x.png 3x
      "
      alt="이전"
    />
  </ImageButton>
);

export default PrevButton;
