// @flow
import React from 'react';
import { ImageButton } from '../Button';

type ListTypeButtonPropTypes = {
  public: boolean,
  children?: any, // eslint-disable-line react/require-default-props
};

const ListTypeButton = ({ public: isPublic, children, ...other }: ListTypeButtonPropTypes) => (
  <ImageButton
    type="button"
    {...other}
  >
    {isPublic ? (
      <img
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_44,q_auto/v1504074815/assets/btn-my_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_88,q_auto/v1504074815/assets/btn-my_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_132,q_auto/v1504074815/assets/btn-my_3x.png 3x
        "
        alt="내 스티커"
      />
    ) : (
      <img
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_44,q_auto/v1504074813/assets/btn-all_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_88,q_auto/v1504074813/assets/btn-all_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_132,q_auto/v1504074813/assets/btn-all_3x.png 3x
        "
        alt="모든 스티커"
      />
    )}
  </ImageButton>
);

ListTypeButton.defaultProps = {
  public: true,
};

export default ListTypeButton;
