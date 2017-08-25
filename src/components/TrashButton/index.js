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
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503049973/assets/btn-trash_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503049973/assets/btn-trash_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503049973/assets/btn-trash_3x.png 3x
      "
    />
  </ImageButton>
);

export default TrashButton;
