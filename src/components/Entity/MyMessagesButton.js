// @flow
import React from 'react';
import { ImageButton } from '../Button';

type MyMessageButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const MyMessageButton = ({ children, ...other }: MyMessageButtonProps) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_44,q_auto/v1504232415/assets/btn-my_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_88,q_auto/v1504232415/assets/btn-my_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_132,q_auto/v1504232415/assets/btn-my_3x.png 4x
      "
      alt="MY"
    />
  </ImageButton>
);

export default MyMessageButton;
