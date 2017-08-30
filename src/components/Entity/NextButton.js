// @flow
import React from 'react';
import { ImageButton } from '../Button';

const NextButton = ({ children, ...other }) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_44,q_auto/v1504075462/assets/btn-s-next_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_88,q_auto/v1504075462/assets/btn-s-next_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_132,q_auto/v1504075462/assets/btn-s-next_3x.png 3x
      "
      alt="다음"
    />
  </ImageButton>
);

export default NextButton;
