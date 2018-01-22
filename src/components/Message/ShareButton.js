// @flow
import React from 'react';
import { ImageButton } from '../Button';

type ShareButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const ShareButton = ({ children, ...other }: ShareButtonProps) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_44,q_auto/v1504074407/assets/btn-share-2_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_88,q_auto/v1504074407/assets/btn-share-2_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_132,q_auto/v1504074407/assets/btn-share-2_3x.png 3x
      "
      alt="공유"
    />
  </ImageButton>
);

export default ShareButton;
