// @flow
import React from 'react';
import { ImageButton } from '../Button';

const HelpButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Help"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_54/v1501836872/assets/btn-help_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_108/v1501836872/assets/btn-help_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_162/v1501836872/assets/btn-help_3x.png 3x
      "
    />
  </ImageButton>
);

export default HelpButton;
