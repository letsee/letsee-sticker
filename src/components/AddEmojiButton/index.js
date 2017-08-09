// @flow
import React from 'react';
import { ImageButton } from '../Button';

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
        src="https://res.cloudinary.com/df9jsefb9/image/upload/s--Nic5mPel--/c_scale,w_54,q_auto/v1502250483/assets/btn-add-emoji_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/s--Nic5mPel--/c_scale,w_108,q_auto/v1502250483/assets/btn-add-emoji_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/s--Nic5mPel--/c_scale,w_162,q_auto/v1502250483/assets/btn-add-emoji_3x.png 3x
        "
      />
    ) : (
      <img
        alt="Add Emoji"
        src="https://res.cloudinary.com/df9jsefb9/image/upload/s--nnCHGEWM--/c_scale,h_110,q_auto/v1502250483/assets/group-2-copy-3_3x.png"
        srcSet="
          https://res.cloudinary.com/df9jsefb9/image/upload/s--nnCHGEWM--/c_scale,h_220,q_auto/v1502250483/assets/group-2-copy-3_3x.png 2x,
          https://res.cloudinary.com/df9jsefb9/image/upload/s--nnCHGEWM--/c_scale,h_330,q_auto/v1502250483/assets/group-2-copy-3_3x.png 3x,
        "
      />
    )}
  </ImageButton>
);

AddEmojiButton.defaultProps = {
  small: false,
};

export default AddEmojiButton;
