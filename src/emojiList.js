// @flow
const emojiList = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '☺️', '😊',
  '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚',
  '😋', '😜', '😝', '😛', '🤑', '🤗', '🤓', '😎', '🤡', '🤠',
  '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖',
  '😫', '😩', '😤', '😠', '😡', '😶', '😐', '😑', '😯', '😦',
  '😧', '😮', '😲', '😵', '😳', '😱', '😨', '😰', '😢', '😥',
  '🤤', '😭', '😓', '😪', '😴', '🙄', '🤔', '🤥', '😬', '🤐',
  '🤢', '🤧', '😷', '🤒', '🤕', '❤️', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞',
  '💓', '💗', '💖', '💘', '💝', '😈', '👿', '👹', '👺', '💩',
  '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹',
  '😻', '😼', '😽', '🙀', '😿', '😾', '👐', '🙌', '👏', '🙏',
  '🤝', '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤘',
  '👌', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐', '🖖',
  '👋', '🤙', '💪', '🖕', '✍️', '🤳', '💅', '🖖', '💄', '💋',
  '👄', '👅', '👂', '👃', '👣', '👁', '👀', '🗣', '👤', '👥',
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈',
  '🍒', '🍑', '🍍', '🥝', '🥑', '🍅', '🍆', '🥒', '🥕', '🌽',
  '🌶', '🥔', '🍠', '🌰', '🥜', '🍯', '🥐', '🍞', '🥖', '🧀',
  '🥚', '🍳', '🥓', '🥞', '🍤', '🍗', '🍖', '🍕', '🌭', '🍔',
  '🍟', '🥙', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜', '🍲', '🍥',
  '🍣', '🍱', '🍛', '🍚', '🍙', '🍘', '🍢', '🍡', '🍧', '🍨',
  '🍦', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪',
  '🥛', '🍼', '☕️', '🍵', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃',
  '🍸', '🍹', '🍾', '🥄', '🍴', '🍽',
  '🌎', '🌍', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑',
  '🌒', '🌓', '🌔', '🌚', '🌝', '🌞', '🌛', '🌜', '🌙', '💫',
  '⭐️', '🌟', '✨', '⚡️', '🔥', '💥', '☄️', '☀️', '🌤', '⛅️',
  '🌥', '🌦', '🌈', '☁️', '🌧', '⛈', '🌩', '🌨', '☃️', '⛄️',
  '❄️', '🌬', '💨', '🌪', '🌫', '🌊', '💧', '💦', '☔️',
  '👶', '👦', '👧', '👨', '👩', '👱‍♀️', '👱', '👴', '👵', '👲',
  '👳‍♀️', '👳', '👮‍♀️', '👮', '👷‍♀️', '👷', '💂‍♀️', '💂', '🕵️‍♀️', '🕵️',
  '👩‍⚕️', '👨‍⚕️', '👩‍🌾', '👨‍🌾', '👩‍🍳', '👨‍🍳', '👩‍🎓', '👨‍🎓', '👩‍🎤', '👨‍🎤',
  '👩‍🏫', '👨‍🏫', '👩‍🏭', '👨‍🏭', '👩‍💻', '👨‍💻', '👩‍💼', '👨‍💼', '👩‍🔧', '👨‍🔧',
  '👩‍🔬', '👨‍🔬', '👩‍🎨', '👨‍🎨', '👩‍🚒', '👨‍🚒', '👩‍✈️', '👨‍✈️', '👩‍🚀', '👨‍🚀',
  '👩‍⚖️', '👨‍⚖️', '🤶', '🎅', '👸', '🤴', '👰', '🤵', '👼', '🤰',
  '🙇‍♀️', '🙇', '💁', '💁‍♂️', '🙅', '🙅‍♂️', '🙆', '🙆‍♂️', '🙋', '🙋‍♂️',
  '🤦‍♀️', '🤦‍♂️', '🤷‍♀️', '🤷‍♂️', '🙎', '🙎‍♂️', '🙍', '🙍‍♂️', '💇', '💇‍♂️',
  '💆', '💆‍♂️', '🕴', '💃', '🕺', '👯', '👯‍♂️', '🚶‍♀️', '🚶', '🏃‍♀️',
  '🏃', '👫', '👭', '👬', '💑', '👩‍❤️‍👩', '👨‍❤️‍👨', '💏', '👩‍❤️‍💋‍👩', '👨‍❤️‍💋‍👨',
  '👪', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧',
  '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👦‍👦', '👩‍👧‍👧',
  '👨‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👦‍👦', '👨‍👧‍👧', '👚', '👕', '👖', '👔', '👗',
  '👙', '👘', '👠', '👡', '👢', '👞', '👟', '👒', '🎩', '🎓',
  '👑', '⛑', '🎒', '👝', '👛', '👜', '💼', '👓', '🕶', '🌂',
  '☂️', '🎀', '🎊', '🎉',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙊', '🙉', '🐒',
  '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
  '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐚', '🐞',
  '🐜', '🕷', '🕸', '🐢', '🐍', '🦎', '🦂', '🦀', '🦑', '🐙',
  '🦐', '🐠', '🐟', '🐡', '🐬', '🦈', '🐳', '🐋', '🐊', '🐆',
  '🐅', '🐃', '🐂', '🐄', '🦌', '🐪', '🐫', '🐘', '🦏', '🦍',
  '🐎', '🐖', '🐐', '🐏', '🐑', '🐕', '🐩', '🐈', '🐓', '🦃',
  '🕊', '🐇', '🐁', '🐀', '🐿', '🐾', '🐉', '🐲', '🌵', '🎄',
  '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃',
  '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌻', '🌼',
  '🌸', '🌺',
  '⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
  '🥅', '🏒', '🏑', '🏏', '⛳️', '🏹', '🎣', '🥊', '🥋', '⛸',
  '🎿', '⛷', '🏂', '🏋️‍♀️', '🏋️', '🤺', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️', '🤸‍♂️',
  '⛹️‍♀️', '⛹️', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️', '🏄‍♀️', '🏄', '🏊‍♀️', '🏊',
  '🤽‍♀️', '🤽‍♂️', '🚣‍♀️', '🚣', '🏇', '🚴‍♀️', '🚴', '🚵‍♀️', '🚵', '🎽',
  '🏅', '🎖', '🥇', '🥈', '🥉', '🏆', '🏵', '🎗', '🎫', '🎟',
  '🎪', '🤹‍♀️', '🤹‍♂️', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹',
  '🥁', '🎷', '🎺', '🎸', '🎻', '🎲', '🎯', '🎳', '🎮', '🎰',
  '🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐',
  '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍', '🚨', '🚔', '🚍',
  '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄',
  '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '🚁', '🛩', '✈️',
  '🛫', '🛬', '🚀', '🛰', '💺', '🛶', '⛵️', '🛥', '🚤', '🛳',
  '⛴', '🚢', '⚓️', '🚧', '⛽️', '🚏', '🚦', '🚥', '🗺', '🗿',
  '🗽', '⛲️', '🗼', '🏰', '🏯', '🏟', '🎡', '🎢', '🎠', '⛱',
  '🏖', '🏝', '⛰', '🏔', '🗻', '🌋', '🏜', '🏕', '⛺️', '🛤',
  '🛣', '🏗', '🏭', '🏠', '🏡', '🏘', '🏚', '🏢', '🏬', '🏣',
  '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛', '⛪️',
  '🕌', '🕍', '🕋', '⛩', '🗾', '🎑', '🏞', '🌅', '🌄', '🌠',
  '🎇', '🎆', '🌇', '🌆', '🏙', '🌃', '🌌', '🌉', '🌁',
  '⌚️', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹',
  '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
  '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚',
  '🎛', '⏱', '⏲', '⏰', '🕰', '⌛️', '⏳', '📡', '🔋', '🔌',
  '💡', '🔦', '🕯', '🗑', '🛢', '💸', '💵', '💴', '💶', '💷',
  '💰', '💳', '💎', '⚖️', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩',
  '⚙️', '⛓', '🔫', '💣', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️',
  '⚱️', '🏺', '🔮', '📿', '💈', '⚗️', '🔭', '🔬', '🕳', '💊',
  '💉', '🌡', '🚽', '🚰', '🚿', '🛁', '🛀', '🛎', '🔑', '🗝',
  '🚪', '🛋', '🛏', '🛌', '🖼', '🛍', '🛒', '🎁', '🎈', '🎏',
  '🎎', '🏮', '🎐', '✉️', '📩', '📨', '📧',
  '💌', '📥', '📤', '📦', '🏷', '📪', '📫', '📬', '📭', '📮',
  '📯', '📜', '📃', '📄', '📑', '📊', '📈', '📉', '🗒', '🗓',
  '📆', '📅', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂',
  '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚',
  '📖', '🔖', '🔗', '📎', '🖇', '📐', '📏', '📌', '📍',
  '🎌', '🏳️', '🏴', '🏁', '✂️', '🖊', '🖋', '✒️', '🖌',
  '🖍', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓',
  '💟', '☮️', '✝️', '☪️', '🕉',
  '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️',
  '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️',
  '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚️', '🈸',
  '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵',
  '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕️',
  '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳',
  '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️',
  '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅',
  '🈯️', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤',
  '🏧', '🚾', '♿️', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅',
  '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️',
  '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', // 0
  '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', // 1, 2, 3, 4, 5, 6, 7, 8, 9
  '🔢', '#️⃣', '*️⃣', '▶️', '⏸', '⏯', '⏹', '⏺', '⏭', '⏮',
  '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️',
  '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️',
  '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖',
  '➗', '✖️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿',
  '🔚', '🔙', '🔛', '🔝', '✔️', '☑️', '🔘', '⚪️', '⚫️', '🔴',
  '🔵', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️',
  '▫️', '◾️', '◽️', '◼️', '◻️', '⬛️', '⬜️', '🔈', '🔇', '🔉',
  '🔊', '🔔', '🔕', '📣', '📢', '👁‍🗨', '💬', '💭', '🗯', '♠️',
  '♣️', '♥️', '♦️', '🃏', '🎴', '🀄️', '🕐', '🕑', '🕒', '🕓',
  '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝',
  '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧',
  '🏳️', '🏴', '🏁', '🚩', '🏳️‍🌈', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸',
  '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹',
  '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇲',
  '🇧🇹', '🇧🇴', '🇧🇦', '🇧🇼', '🇧🇷', '🇮🇴', '🇻🇬', '🇧🇳', '🇧🇬', '🇧🇫',
  '🇧🇮', '🇰🇭', '🇨🇲', '🇨🇦', '🇮🇨', '🇨🇻', '🇧🇶', '🇰🇾', '🇨🇫', '🇹🇩',
  '🇨🇱', '🇨🇳', '🇨🇽', '🇨🇨', '🇨🇴', '🇰🇲', '🇨🇬', '🇨🇩', '🇨🇰', '🇨🇷',
  '🇨🇮', '🇭🇷', '🇨🇺', '🇨🇼', '🇨🇾', '🇨🇿', '🇩🇰', '🇩🇯', '🇩🇲', '🇩🇴',
  '🇪🇨', '🇪🇬', '🇸🇻', '🇬🇶', '🇪🇷', '🇪🇪', '🇪🇹', '🇪🇺', '🇫🇰', '🇫🇴',
  '🇫🇯', '🇫🇮', '🇫🇷', '🇬🇫', '🇵🇫', '🇹🇫', '🇬🇦', '🇬🇲', '🇬🇪', '🇩🇪',
  '🇬🇭', '🇬🇮', '🇬🇷', '🇬🇱', '🇬🇩', '🇬🇵', '🇬🇺', '🇬🇹', '🇬🇬', '🇬🇳',
  '🇬🇼', '🇬🇾', '🇭🇹', '🇭🇳', '🇭🇰', '🇭🇺', '🇮🇸', '🇮🇳', '🇮🇩', '🇮🇷',
  '🇮🇶', '🇮🇪', '🇮🇲', '🇮🇱', '🇮🇹', '🇯🇲', '🇯🇵', '🎌', '🇯🇪', '🇯🇴',
  '🇰🇿', '🇰🇪', '🇰🇮', '🇽🇰', '🇰🇼', '🇰🇬', '🇱🇦', '🇱🇻', '🇱🇧', '🇱🇸',
  '🇱🇷', '🇱🇾', '🇱🇮', '🇱🇹', '🇱🇺', '🇲🇴', '🇲🇰', '🇲🇬', '🇲🇼', '🇲🇾',
  '🇲🇻', '🇲🇱', '🇲🇹', '🇲🇭', '🇲🇶', '🇲🇷', '🇲🇺', '🇾🇹', '🇲🇽', '🇫🇲',
  '🇲🇩', '🇲🇨', '🇲🇳', '🇲🇪', '🇲🇸', '🇲🇦', '🇲🇿', '🇲🇲', '🇳🇦', '🇳🇷',
  '🇳🇵', '🇳🇱', '🇳🇨', '🇳🇿', '🇳🇮', '🇳🇪', '🇳🇬', '🇳🇺', '🇳🇫', '🇰🇵',
  '🇲🇵', '🇳🇴', '🇴🇲', '🇵🇰', '🇵🇼', '🇵🇸', '🇵🇦', '🇵🇬', '🇵🇾', '🇵🇪',
  '🇵🇭', '🇵🇳', '🇵🇱', '🇵🇹', '🇵🇷', '🇶🇦', '🇷🇪', '🇷🇴', '🇷🇺', '🇷🇼',
  '🇼🇸', '🇸🇲', '🇸🇦', '🇸🇳', '🇷🇸', '🇸🇨', '🇸🇱', '🇸🇬', '🇸🇽', '🇸🇰',
  '🇸🇮', '🇬🇸', '🇸🇧', '🇸🇴', '🇿🇦', '🇰🇷', '🇸🇸', '🇪🇸', '🇱🇰', '🇧🇱',
  '🇸🇭', '🇰🇳', '🇱🇨', '🇵🇲', '🇻🇨', '🇸🇩', '🇸🇷', '🇸🇿', '🇸🇪', '🇨🇭',
  '🇸🇾', '🇹🇼', '🇹🇯', '🇹🇿', '🇹🇭', '🇹🇱', '🇹🇬', '🇹🇰', '🇹🇴', '🇹🇹',
  '🇹🇳', '🇹🇷', '🇹🇲', '🇹🇨', '🇹🇻', '🇻🇮', '🇺🇬', '🇺🇦', '🇦🇪', '🇬🇧',
  '🇺🇸', '🇺🇾', '🇺🇿', '🇻🇺', '🇻🇦', '🇻🇪', '🇻🇳', '🇼🇫', '🇪🇭', '🇾🇪',
  '🇿🇲', '🇿🇼',
];

export const emojiListLength = emojiList.length;
export const getNEmojis = (n: number) => emojiList.slice(0, n);

export default emojiList;