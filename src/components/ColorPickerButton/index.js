// @flow
import React from 'react';
import { ImageButton } from '../Button';

const ColorPickerButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="ColorPicker"
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590143476/assets/btn-colorpicker_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1590143476/assets/btn-colorpicker_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1590143476/assets/btn-colorpicker_3x.png 3x
      "
    />
  </ImageButton>
);

export default ColorPickerButton;
