// @flow
import React from 'react';
import { ImageButton } from '../Button';

import tipIcon from './btn-tip.png';
import tipIcon2x from './btn-tip@2x.png';
import tipIcon3x from './btn-tip@3x.png';

const TipButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Tip"
      src={tipIcon}
      srcSet={`${tipIcon2x} 2x, ${tipIcon3x} 3x`}
    />
  </ImageButton>
);

export default TipButton;
