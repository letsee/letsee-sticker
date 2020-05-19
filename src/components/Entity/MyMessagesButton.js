// @flow
import React from 'react';
import { ImageButton } from '../Button';

const MyMessagesButton = ({ children, ...other }) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn-rewrite_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn-rewrite_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn-rewrite_3x.png 3x
      "
      alt="MY"
    />
  </ImageButton>
);

export default MyMessagesButton;
