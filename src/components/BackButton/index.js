// @flow
import React from 'react';
import { ImageButton } from '../Button';

const BackButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Back"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501839365/assets/btn-back_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501839365/assets/btn-back_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501839365/assets/btn-back_3x.png 3x
      "
    />
  </ImageButton>
);

export default BackButton;
