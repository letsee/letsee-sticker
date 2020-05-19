// @flow
import React from 'react';
import { ImageButton } from '../Button';

const TrashButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Delete"
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn_delete_3x.png"
      srcSet="
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn_delete_3x.png 2x,
        https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn_delete_3x.png 3x
      "
    />
  </ImageButton>
);

export default TrashButton;
