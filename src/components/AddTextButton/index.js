// @flow
import React from 'react';
import { ImageButton } from '../Button';

type AddTextButtonPropTypes = {
  small: boolean,
};

const AddTextButton = ({
  small,
  children,
  ...other
}: AddTextButtonPropTypes) => (
  <ImageButton
    type="button"
    {...other}
  >
    {small ? (
      <img
        alt="Add Text"
        src="http://res.cloudinary.com/df9jsefb9/image/upload/s--o8d5-adI--/c_scale,w_54,q_auto/v1502250493/assets/btn-add-txt_3x.png"
        srcSet="
          http://res.cloudinary.com/df9jsefb9/image/upload/s--o8d5-adI--/c_scale,w_108,q_auto/v1502250493/assets/btn-add-txt_3x.png 2x,
          http://res.cloudinary.com/df9jsefb9/image/upload/s--o8d5-adI--/c_scale,w_162,q_auto/v1502250493/assets/btn-add-txt_3x.png 3x
        "
      />
    ) : (
      <img
        alt="Add Text"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/s--nuqSwdgx--/c_scale,h_110,q_auto/v1502250494/assets/icn-ar-text_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/s--nuqSwdgx--/c_scale,h_220,q_auto/v1502250494/assets/icn-ar-text_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/s--nuqSwdgx--/c_scale,h_330,q_auto/v1502250494/assets/icn-ar-text_3x.png 3x
        "
      />
    )}
  </ImageButton>
);

AddTextButton.defaultProps = {
  small: false,
};

export default AddTextButton;
