// @flow
import React from 'react';
import { ImageButton } from '../Button';

const SaveButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="팁"
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590041808/assets/btn-save_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1590041808/assets/btn-save_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1590041808/assets/btn-save_3x.png 3x
      "
    />
  </ImageButton>
);

export default SaveButton;
