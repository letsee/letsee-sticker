// @flow
import React from 'react';
import { ImageButton } from '../Button';

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
        src="https://res.cloudinary.com/df9jsefb9/image/upload/s--Nic5mPel--/c_scale,h_54,q_auto/v1502250483/assets/btn-add-emoji_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/s--Nic5mPel--/c_scale,h_108,q_auto/v1502250483/assets/btn-add-emoji_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/s--Nic5mPel--/c_scale,h_162,q_auto/v1502250483/assets/btn-add-emoji_3x.png 3x
        "
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
