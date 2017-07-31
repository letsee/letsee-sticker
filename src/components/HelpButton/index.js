// @flow
import React from 'react';
import { ImageButton } from '../Button';

import helpIcon from './btn-help.png';
import helpIcon2x from './btn-help@2x.png';
import helpIcon3x from './btn-help@3x.png';

const HelpButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Help"
      src={helpIcon}
      srcSet={`${helpIcon2x} 2x, ${helpIcon3x} 3x`}
    />
  </ImageButton>
);

export default HelpButton;
