// @flow
import React from 'react';
import { ImageButton } from '../Button';

import nextIcon from './btn-next.png';
import nextIcon2x from './btn-next@2x.png';
import nextIcon3x from './btn-next@3x.png';

const StyledImageButton = ImageButton.extend`
  &:disabled {
    opacity: 0.3;
  }
`;

const NextButton = ({
  children,
  ...other
}) => (
  <StyledImageButton
    type="button"
    {...other}
  >
    <img
      alt="Next"
      src={nextIcon}
      srcSet={`${nextIcon2x} 2x, ${nextIcon3x} 3x`}
    />
  </StyledImageButton>
);

export default NextButton;
