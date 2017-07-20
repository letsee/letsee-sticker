// @flow
import React from 'react';
import { ImageButton } from '../Button';

import emojiSmallIcon from './btn-add-emoji.png';
import emojiSmallIcon2x from './btn-add-emoji@2x.png';
import emojiSmallIcon3x from './btn-add-emoji@3x.png';

import emojiIcon from './group-2-copy-3.png';
import emojiIcon2x from './group-2-copy-3@2x.png';
import emojiIcon3x from './group-2-copy-3@3x.png';

type AddEmojiButtonPropTypes = {
  small: boolean,
};

const AddEmojiButton = ({
  small,
  children,
  ...other
}: AddEmojiButtonPropTypes) => (
  <ImageButton
    type="button"
    {...other}
  >
    {small ? (
      <img
        alt="Add Emoji"
        src={emojiSmallIcon}
        srcSet={`${emojiSmallIcon2x} 2x, ${emojiSmallIcon3x} 3x`}
      />
    ) : (
      <img
        alt="Add Emoji"
        src={emojiIcon}
        srcSet={`${emojiIcon2x} 2x, ${emojiIcon3x} 3x`}
      />
    )}
  </ImageButton>
);

AddEmojiButton.defaultProps = {
  small: false,
};

export default AddEmojiButton;
