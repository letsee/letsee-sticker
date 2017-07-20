// @flow
import React from 'react';
import { ImageButton } from '../Button';

import emojiIcon from './btn-add-emoji.png';
import emojiIcon2x from './btn-add-emoji@2x.png';
import emojiIcon3x from './btn-add-emoji@3x.png';

import textIcon from './btn-add-txt.png';
import textIcon2x from './btn-add-txt@2x.png';
import textIcon3x from './btn-add-txt@3x.png';

const StyledImageButton = ImageButton.extend`
  margin-top: 6px;
`;

type AddStickerButtonsPropTypes = {
  onEmojiClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onTextClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

const AddStickerButtons = ({
  onEmojiClick,
  onTextClick,
  children,
  ...other
}: AddStickerButtonsPropTypes) => (
  <div {...other}>
    <ImageButton
      type="button"
      onClick={onEmojiClick}
    >
      <img
        alt="Add Emoji"
        src={emojiIcon}
        srcSet={`${emojiIcon2x} 2x, ${emojiIcon3x} 3x`}
      />
    </ImageButton>

    <StyledImageButton
      type="button"
      onClick={onEmojiClick}
    >
      <img
        alt="Add Text"
        src={textIcon}
        srcSet={`${textIcon2x} 2x, ${textIcon3x} 3x`}
      />
    </StyledImageButton>
  </div>
);

export default AddStickerButtons;
