// @flow
import React from 'react';
import { ImageButton } from '../Button';

const StyledImageButton = ImageButton.extend`
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};

  &:disabled {
    opacity: 0.3;
  }
`;

const NextButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <StyledImageButton
    type="button"
    {...other}
  >
    <img
      alt="Next"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1501839661/assets/btn-next_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1501839661/assets/btn-next_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1501839661/assets/btn-next_3x.png 3x
      "
    />
  </StyledImageButton>
);

export default NextButton;
