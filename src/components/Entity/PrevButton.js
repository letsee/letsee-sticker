// @flow
import React from 'react';
import { ImageButton } from '../Button';

type PrevButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const PrevButton = ({ children, ...other }: PrevButtonProps) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_55,q_auto/v1504232842/assets/btn-s-back_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_110,q_auto/v1504232842/assets/btn-s-back_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_165,q_auto/v1504232842/assets/btn-s-back_3x.png 3x
      "
      alt="이전"
    />
  </ImageButton>
);

export default PrevButton;
