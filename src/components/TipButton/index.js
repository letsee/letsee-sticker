// @flow
import React from 'react';
import { ImageButton } from '../Button';

const TipButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Tip"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501870588/assets/btn-tip_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501870588/assets/btn-tip_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501870588/assets/btn-tip_3x.png 3x
      "
    />
  </ImageButton>
);

export default TipButton;
