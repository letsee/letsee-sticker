// @flow
const emojiArray = [
  '❤️', '😜', '😝', '🤡', '😞', '😣', '😖', '😫', '😤', '😡',
  '😵', '😱', '😰', '😭', '😷', '🤒', '🤕', '👿', '💩', '👻',
  '👍', '👊', '🙏', '👓', '😎', '🐶', '🐱', '🐼', '🐯', '🐷',
  '🐽', '😻', '😼', '😽', '🙀', '😿', '🔥', '🌈', '⭐', '✨',
  '🥂', '🍷', '💕', '💯', '♨️', '💤', '💋', '👄', '👅', '🙆',
  '🙇', '👨‍🍳', '🐸', '🍎', '🎮', '🎨', '✌️', '✊', '✋',
];

const createEmojiBox = () => {
  const emojiBoxItem = document.querySelector('.emoji-box-item');

  if (emojiBoxItem) {
    for (let i = 0; i < emojiArray.length; i += 1) {
      const span = document.createElement('span');
      span.innerHTML = `<span onclick="addEmoji('${emojiArray[i]}');">${emojiArray[i]}</span>`;
      emojiBoxItem.appendChild(span);
    }

    emojiBoxItem.appendChild(document.createElement('br'));
    emojiBoxItem.appendChild(document.createElement('br'));
  }
};

export default createEmojiBox;
