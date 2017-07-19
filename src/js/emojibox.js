    function createEmojiBox() {
        
        var emojiArray =[
            '❤️',
            '😜',
            '😝',
            '🤡',
            '😞',
            '😣',
            '😖',
            '😫',
            '😤',
            '😡',
            '😵',
            '😱',
            '😰',
            '😭',
            '😷',
            '🤒',
            '🤕', 
            '👿',
            '💩',
            '👻',
            '👍',
            '👊',
            '🙏',
            '👓',
            '😎',
            '🐶',
            '🐱',
            '🐼',
            '🐯',
            '🐷',
            '🐽',
            '😻',
            '😼',
            '😽',
            '🙀',
            '😿',
            '🔥',
            '🌈',
            '⭐',
            '✨',
            '🥂',
            '🍷',
            '💕',
            '💯',
            '♨️',
            '💤',
            '💋',
            '👄',
            '👅',
            '🙆',
            '🙇',
            '👨‍🍳',
            '🐸 ',
            '🍎',
            '🎮',
            '🎨 ',
            '✌️',
            '✊ ',
            '✋'
        ];
            
        // for(var i = emojiArray.length; i--;) {
        for(var i = 0; i < emojiArray.length; i++) {
            var 
                span = document.createElement('span');
            span.innerHTML = '<span onclick="addEmoji(\''+emojiArray[i]+'\');">'+emojiArray[i]+'</span>';
            document.querySelector('.emoji-box-item').appendChild(span);
        }

        document.querySelector('.emoji-box-item').appendChild(document.createElement('br'));
        document.querySelector('.emoji-box-item').appendChild(document.createElement('br'));
    }