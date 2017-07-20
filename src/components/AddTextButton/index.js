// @flow
import React from 'react';
import { ImageButton } from '../Button';

import textSmallIcon from './btn-add-txt.png';
import textSmallIcon2x from './btn-add-txt@2x.png';
import textSmallIcon3x from './btn-add-txt@3x.png';

import textIcon from './icn-ar-text.png';
import textIcon2x from './icn-ar-text@2x.png';
import textIcon3x from './icn-ar-text@3x.png';

type TextButtonPropTypes = {
  small: boolean,
};

const TextButton = ({
  small,
  children,
  ...other
}: TextButtonPropTypes) => (
  <ImageButton
    type="button"
    {...other}
  >
    {small ? (
      <img
        alt="Add Text"
        src={textSmallIcon}
        srcSet={`${textSmallIcon2x} 2x, ${textSmallIcon3x} 3x`}
      />
    ) : (
      <img
        alt="Add Text"
        src={textIcon}
        srcSet={`${textIcon2x} 2x, ${textIcon3x} 3x`}
      />
    )}
  </ImageButton>
);

TextButton.defaultProps = {
  small: false,
};

export default TextButton;
