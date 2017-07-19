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






    function scrollClick() {
        var 
            wrapper = document.querySelector('.emoji-box-wrapper');
        
        document.querySelector('.emoji-box-content').style.overflow = wrapper.classList.toString() === 'emoji-box-wrapper' ? 'scroll' : 'hidden';

        var ctrl = wrapper.classList.toString() === 'emoji-box-wrapper' ? false : true;

        manager.get('pan').set({ enable : ctrl });
        manager.get('pinch').set({ enable : ctrl });
        manager.get('rotate').set({ enable : ctrl });

        document.querySelector('.emoji-box-content').scrollTop = 0;
        wrapper.classList.toggle('transform-active');
    }






    function closeAddEmoji() {
        if (document.querySelector('.emoji-box-wrapper').classList.toString() !== 'emoji-box-wrapper') scrollClick();
        
        document.querySelector('.ar-renderer').removeEventListener('touchend', closeAddEmoji);          
        typeLoadControl(1);

    }    