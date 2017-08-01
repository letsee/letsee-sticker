// @flow
import React from 'react';
import { ImageButton } from '../Button';

import backIcon from './btn-back.png';
import backIcon2x from './btn-back@2x.png';
import backIcon3x from './btn-back@3x.png';

const BackButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Back"
      src={backIcon}
      srcSet={`${backIcon2x} 2x, ${backIcon3x} 3x`}
    />
  </ImageButton>
);

export default BackButton;
