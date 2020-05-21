// @flow
import React from 'react';
import { ImageButton } from '../Button';

const DisabledSaveButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="저장"
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590041808/assets/btn-save-dis_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1590041808/assets/btn-save-dis_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1590041808/assets/btn-save-dis_3x.png 3x
      "
    />
  </ImageButton>
);

export default DisabledSaveButton;
