// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { ImageButton } from '../Button';

type AddTextButtonPropTypes = {
  small?: boolean,
  children?: any, // eslint-disable-line react/require-default-props
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
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503050254/assets/btn-add-txt_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503050254/assets/btn-add-txt_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503050254/assets/btn-add-txt_3x.png 3x
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

AddTextButton.propTypes = {
  small: PropTypes.bool,
};

export default AddTextButton;
