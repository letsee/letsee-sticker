// @flow
import React from 'react';
import { ImageButton } from '../Button';

const NewsButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="인식 대상 목록"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1502959272/assets/btn-entity-list_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1502959272/assets/btn-entity-list_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1502959272/assets/btn-entity-list_3x.png 3x
      "
    />
  </ImageButton>
);

export default NewsButton;
