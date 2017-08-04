// @flow
import React from 'react';
import { ImageButton } from '../Button';

const LeaveMessageButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="스티커 남기기"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501871467/assets/btn-gocreate_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501871467/assets/btn-gocreate_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501871467/assets/btn-gocreate_3x.png 3x
      "
    />
  </ImageButton>
);

export default LeaveMessageButton;
