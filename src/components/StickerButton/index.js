// @flow
import React from 'react';
import { ImageButton } from '../Button';

const StickerButton = ({ children, ...other }) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1504074117/assets/sticker-home_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1504074117/assets/sticker-home_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1504074117/assets/sticker-home_3x.png 3x
      "
      alt="Letsee Sticker"
    />
  </ImageButton>
);

export default StickerButton;
