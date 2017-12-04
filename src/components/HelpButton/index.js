// @flow
import React from 'react';
import { ImageButton } from '../Button';

type HelpButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const HelpButton = ({ children, ...other }: HelpButtonProps) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Help"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_24,q_auto/v1502954653/assets/btn-detect-help_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_48,q_auto/v1502954653/assets/btn-detect-help_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_72,q_auto/v1502954653/assets/btn-detect-help_3x.png 3x
      "
    />
  </ImageButton>
);

export default HelpButton;
