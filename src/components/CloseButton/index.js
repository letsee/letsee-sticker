// @flow
import React from 'react';
import { ImageButton } from '../Button';

import closeIcon from './btn-close.png';
import closeIcon2x from './btn-close@2x.png';
import closeIcon3x from './btn-close@3x.png';

import grayCloseIcon from './btn-close-g.png';
import grayCloseIcon2x from './btn-close-g@2x.png';
import grayCloseIcon3x from './btn-close-g@3x.png';

const CloseButton = ({
  gray,
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    {gray ? (
      <img
        alt="Close"
        src={grayCloseIcon}
        srcSet={`${grayCloseIcon2x} 2x, ${grayCloseIcon3x} 3x`}
      />
    ) : (
      <img
        alt="Close"
        src={closeIcon}
        srcSet={`${closeIcon2x} 2x, ${closeIcon3x} 3x`}
      />
    )}
  </ImageButton>
);

CloseButton.defaultProps = {
  gray: false,
};

export default CloseButton;
