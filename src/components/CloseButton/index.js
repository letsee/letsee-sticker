// @flow
import React from 'react';
import { ImageButton } from '../Button';

const CloseButton = ({
  gray,
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    {gray ? (
      <img
        alt="Close"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501839104/assets/btn-close-g_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501839104/assets/btn-close-g_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501839104/assets/btn-close-g_3x.png 3x
        "
      />
    ) : (
      <img
        alt="Close"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501837227/assets/btn-close_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501837227/assets/btn-close_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501837227/assets/btn-close_3x.png 3x
        "
      />
    )}
  </ImageButton>
);

CloseButton.defaultProps = {
  gray: false,
};

export default CloseButton;
