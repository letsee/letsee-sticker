// @flow
import React from 'react';
import { ImageButton } from '../Button';

import textIcon from './icn-ar-text.png';
import textIcon2x from './icn-ar-text@2x.png';
import textIcon3x from './icn-ar-text@3x.png';

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
        src="http://res.cloudinary.com/df9jsefb9/image/upload/s--o8d5-adI--/c_scale,h_54,q_auto/v1502250493/assets/btn-add-txt_3x.png"
        srcSet="
          http://res.cloudinary.com/df9jsefb9/image/upload/s--o8d5-adI--/c_scale,h_108,q_auto/v1502250493/assets/btn-add-txt_3x.png 2x,
          http://res.cloudinary.com/df9jsefb9/image/upload/s--o8d5-adI--/c_scale,h_162,q_auto/v1502250493/assets/btn-add-txt_3x.png 3x
        "
      />
    ) : (
      <img
        alt="Add Text"
        src={textIcon}
        srcSet={`${textIcon2x} 2x, ${textIcon3x} 3x`}
      />
    )}
  </ImageButton>
);

AddTextButton.defaultProps = {
  small: false,
};

export default AddTextButton;
