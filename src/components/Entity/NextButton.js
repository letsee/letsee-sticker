// @flow
import React from 'react';
import { ImageButton } from '../Button';

const NextButton = ({ children, ...other }) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_55,q_auto/v1504232842/assets/btn-s-next_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_110,q_auto/v1504232842/assets/btn-s-next_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_165,q_auto/v1504232842/assets/btn-s-next_3x.png 3x
      "
      alt="다음"
    />
  </ImageButton>
);

export default NextButton;
