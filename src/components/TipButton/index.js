// @flow
import React from 'react';
import { ImageButton } from '../Button';

type TipButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const TipButton = ({ children, ...other }: TipButtonProps) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="팁"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_44,q_auto/v1504073862/assets/btn-tip-i_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_88,q_auto/v1504073862/assets/btn-tip-i_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_132,q_auto/v1504073862/assets/btn-tip-i_3x.png 3x
      "
    />
  </ImageButton>
);

export default TipButton;
