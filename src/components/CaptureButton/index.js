// @flow
import React from 'react';
import { ImageButton } from '../Button';

import captureIcon from './btn-capture.png';
import captureIcon2x from './btn-capture@2x.png';
import captureIcon3x from './btn-capture@3x.png';

const CaptureButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Capture"
      src={captureIcon}
      srcSet={`${captureIcon2x} 2x, ${captureIcon3x} 3x`}
    />
  </ImageButton>
);

export default CaptureButton;
