// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { ImageButton } from '../Button';

type CloseButtonPropTypes = {
  color?: 'gray' | 'white' | 'black',
  children?: any, // eslint-disable-line react/require-default-props
};

const CloseButton = ({
  color,
  children,
  ...other
}: CloseButtonPropTypes) => {
  let image = null;

  if (color === 'gray') {
    image = (
      <img
        alt="Close"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503019324/assets/btn-close-g_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503019324/assets/btn-close-g_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503019324/assets/btn-close-g_3x.png 3x
        "
      />
    );
  } else if (color === 'black') {
    image = (
      <img
        alt="Close"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503031196/assets/btn-close-black_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503031196/assets/btn-close-black_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503031196/assets/btn-close-black_3x.png 3x
        "
      />
    );
  } else {
    image = (
      <img
        alt="Close"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503019761/assets/btn-close_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503019761/assets/btn-close_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503019761/assets/btn-close_3x.png 3x
        "
      />
    );
  }

  return (
    <ImageButton
      type="button"
      {...other}
    >
      {image}
    </ImageButton>
  );
};

CloseButton.defaultProps = {
  color: 'white',
};

CloseButton.propTypes = {
  color: PropTypes.oneOf(['white', 'black', 'gray']),
};

export default CloseButton;
