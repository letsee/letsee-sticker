// @flow
import React from 'react';
import { ImageButton } from '../Button';

const ResetButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Reset"
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/zoom-center_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/zoom-center_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/zoom-center_3x.png 3x
      "
    />
  </ImageButton>
);

export default ResetButton;
