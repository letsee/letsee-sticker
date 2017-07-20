// @flow
import React from 'react';
import { ImageButton } from '../Button';

import closeIcon from './btn-close.png';
import closeIcon2x from './btn-close@2x.png';
import closeIcon3x from './btn-close@3x.png';

const CloseButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Close"
      src={closeIcon}
      srcSet={`${closeIcon2x} 2x, ${closeIcon3x} 3x`}
    />
  </ImageButton>
);

export default CloseButton;
