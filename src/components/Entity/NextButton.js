// @flow
import React from 'react';
import { ImageButton } from '../Button';

const NextButton = ({ children, ...other }) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589798377/assets/btn-next_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589798377/assets/btn-next_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589798377/assets/btn-next_3x.png 3x
      "
      alt="다음"
    />
  </ImageButton>
);

export default NextButton;
