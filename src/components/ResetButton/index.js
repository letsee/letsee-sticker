// @flow
import React from 'react';
import { ImageButton } from '../Button';

const StyledImageButton = ImageButton.extend`
  padding: 11px;
`;

const ResetButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <StyledImageButton
    type="button"
    {...other}
  >
    <img
      alt="Reset"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_32,q_auto/v1503032337/assets/btn-reset_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_64,q_auto/v1503032337/assets/btn-reset_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_96,q_auto/v1503032337/assets/btn-reset_3x.png 3x
      "
    />
  </StyledImageButton>
);

export default ResetButton;
