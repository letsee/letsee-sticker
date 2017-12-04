// @flow
import React from 'react';
import { ImageButton } from '../Button';

type CaptureButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const CaptureButton = ({ children, ...other }: CaptureButtonProps) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Capture"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501871671/assets/btn-capture-w_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501871671/assets/btn-capture-w_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501871671/assets/btn-capture-w_3x.png 3x
      "
    />
  </ImageButton>
);

export default CaptureButton;
