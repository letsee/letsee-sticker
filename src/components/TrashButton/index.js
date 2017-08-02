// @flow
import React from 'react';
import { ImageButton } from '../Button';

import trashIcon from './btn-trash.png';
import trashIcon2x from './btn-trash@2x.png';
import trashIcon3x from './btn-trash@3x.png';

const TrashButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="Next"
      src={trashIcon}
      srcSet={`${trashIcon2x} 2x, ${trashIcon3x} 3x`}
    />
  </ImageButton>
);

export default TrashButton;
