    Kakao.init('268d83b5b3629f64b515bd27ed0aa2d2');
    var uuid = guid();
    var USER_NAME = '';
    var SERVICE_URL = 'https://intra.letsee.io/apps/sticker';
//      var SERVICE_URL = 'https://apps.letsee.io/stickers';

    var 
        threadType = 0,
        isRedit    = false,
        isTraking  = false,
        isModeView = false,
        CURRENT_URI = '',
        currentTarget = null;

    var 
        notificationKey       = '',
        notificationObject    = null,
        notificationEntityURI = '',
        notificationName      = '';

    var world,
        content,
        editText,
        editEmoji,
        editObject,
        renderables = {
            ready : {
                target : null,
                text :  null,
                plus :  null
            },
            create : {
            wrapper : null,                
            emoji : null,
            text  : null,
            },
            input : {
            text : {
                textarea : null
            },
            emoji : {

            }
            },
            notification : {
            title : null,
            icon : null,
            content : null
            }
        };

    window.addEventListener('letsee.load', function() { 
        createEmojiBox();

        var
        intro = document.querySelector('.target-intro-wrapper');
        intro.style.width  = window.screen.availWidth-(window.screen.availWidth/5)+'px';
        intro.style.height = (window.screen.availHeight-(window.screen.availHeight/4.55))+'px';
        
        world = new Object3D();
        content = new Object3D();

        var
            param = window.location.href.split("?");

        if (param[1] !== undefined) {
        var
            value = param[1].split("/");

            switch(value[0]) {
                case 'type' :
                    notificationKey = value[1];
                    
                    if (!notificationObject) select(notificationKey);
                    isModeView = true;
                    break;
                default : break;
            }
            
            typeLoadControl(6);
        } else typeLoadControl(0);

        letsee.addEventListener("userchange", onUserInfoReceive);

        letsee.addEventListener("trackstart", function(e) {
            if (e.target.size.width > 100) {

            } else {

            }
            
            var uri = e.target.uri;
            document.querySelector('.target-intro-wrapper').style.display = 'none';
            document.querySelector('.intro-title').style.display = 'none';

            isTraking = true;

            if (isModeView && uri !== notificationEntityURI) {
                return alert('메시지가 담긴 사물이 아닙니다.');
            }

            if (uri !== CURRENT_URI) {
                if (CURRENT_URI) {
                    letsee.getEntity(CURRENT_URI).removeRenderable(world);
                    letsee.getEntity(CURRENT_URI).removeRenderable(content);

                    content.children.forEach(function(item) {
                        content.remove(item);
                    });

                    CURRENT_URI = uri;
                    currentTarget = letsee.getEntity(CURRENT_URI);

                    ready();
                }

                CURRENT_URI = uri;

                e.target.addRenderable(world);
                e.target.addRenderable(content);
                console.log(e);

                var depth = e.target.size.depth === null ? 0 : e.target.size.depth/2;

                world.position.z = depth;
                content.position.z = depth;
            }

            typeStartControl(e);
        });

        letsee.addEventListener('trackend', function(e) {
            isTraking = false;
            typeEndControl(e);

        });

    });




    function onUserInfoReceive(e) {
        var user = e.user;

        if (!user) {
            if (confirm("로그인 되어 있지 않습니다.\n로그인 하시겠습니까?")) {
                _app.openLogin();

            } else {
                typeLoadControl(0);
            }

            return;
        }
        USER_NAME = user.lastname+user.firstname;
    }


    function ready() {
        
        world.position.y = 20;

        var name = '';
        if (currentTarget) {
            name = currentTarget.name;
            document.getElementById('edit-target-see-name').innerText = currentTarget.name;
        }

        if (isTraking) document.querySelector('.icon-images.create').style.display = 'block';

        renderables.ready.target = createDOMRanderable('<label id="current-target-name">'+name+'</label>', 'target-ready-content');

        renderables.ready.text   = createDOMRanderable("<div>스티커 메세지를 남겨보세요", 'target-ready-content');
        renderables.ready.plus   = createDOMRanderable('<img src="assets/btn-add-content.png" srcset="assets/btn-add-content@2x.png 2x, assets/btn-add-content@3x.png 3x">', 'ready-button', createLettet);

        if (currentTarget) {

            if (currentTarget.size.width > 100) {
                renderables.ready.target.position.y = (currentTarget.size.height/2)-30;
                renderables.ready.text.position.y = ((currentTarget.size.height/2)-50);
                renderables.ready.plus.position.y = -20;
                renderables.ready.plus.scale.set(.5,.5,.5);
            } else {
                renderables.ready.target.position.y = 7;
                renderables.ready.plus.position.y   = -20; 
                renderables.ready.text.scale.set(.3,.3,.3);
                renderables.ready.target.scale.set(.3,.3,.3);
                renderables.ready.plus.scale.set(.2,.2,.2);
            } 

        }

        world.add(renderables.ready.target);
        world.add(renderables.ready.text);
        world.add(renderables.ready.plus);

    }

    function create() {
        _app.getUser();

        world.position.y = 0;

        if (content.children.length === 0) {
        renderables.create.wrapper = createDOMRanderable('', 'create-target-wrapper');
        renderables.create.emoji   = createDOMRanderable('<img src="assets/group-2-copy-3.png" srcset="assets/group-2-copy-3@2x.png 2x, assets/group-2-copy-3@3x.png 3x">', 'create-target-emoji');
        renderables.create.text    = createDOMRanderable('<img src="assets/icn-ar-text.png" srcset="assets/icn-ar-text@2x.png 2x, assets/icn-ar-text@3x.png 3x">', 'create-target-text');

        renderables.create.emoji.element.addEventListener("click", function() {
            typeLoadControl(3);
        });
        renderables.create.text.element.addEventListener("click", function() {
            typeLoadControl(2);
        });


        if (currentTarget.size.width > 100) {
            renderables.create.emoji.position.x = -48;
            renderables.create.text.position.x  = 48;
            renderables.create.emoji.scale.set(.8,.8,.8);
            renderables.create.text.scale.set(.8,.8,.8);
        } else {
            renderables.create.emoji.position.x = -12;
            renderables.create.text.position.x  = 12;
            renderables.create.emoji.scale.set(.2,.2,.2);
            renderables.create.text.scale.set(.2,.2,.2);
        }

        var w = currentTarget.size.width,
            h = currentTarget.size.height;
        
        renderables.create.wrapper.element.style.width  = w +'px';
        renderables.create.wrapper.element.style.height = h +'px';

        renderables.create.wrapper.element.innerHTML = ''
        +'<img class="create-target-wrapper-frame lt" src="assets/frame-w-lt.png" srcset="assets/frame-w-lt@2x.png 2x, assets/frame-w-lt@3x.png 3x">'
        +'<img class="create-target-wrapper-frame rt" src="assets/frame-w-rt.png" srcset="assets/frame-w-rt@2x.png 2x, assets/frame-w-rt@3x.png 3x">'
        +'<img class="create-target-wrapper-frame lb" src="assets/frame-w-lb.png" srcset="assets/frame-w-lb@2x.png 2x, assets/frame-w-lb@3x.png 3x">'
        +'<img class="create-target-wrapper-frame rb" src="assets/frame-w-rb.png" srcset="assets/frame-w-rb@2x.png 2x, assets/frame-w-rb@3x.png 3x">';
        
        world.add(renderables.create.wrapper);
        world.add(renderables.create.emoji);
        world.add(renderables.create.text);
            
        }          

    }

    function inputText() {
        content.children.forEach(function(item) {
            item.element.removeEventListener('touchstart', selectEditObject);
            if (editObject !== item ) item.element.style.opacity = '0.2';

        });

        renderables.input.text.textarea = createDOMRanderable('<textarea id="ar-textarea" placeholder="메세지를 입력해주세요" type="text"></textarea>','input-text-area');
        
        if (currentTarget.size.width > 100) renderables.input.text.textarea.scale.set(.7,.7,.7);
        else renderables.input.text.textarea.scale.set(.3,.3,.3);

        world.add(renderables.input.text.textarea);
        
        content.children.forEach(function(item) {
            item.element.style.opacity = '0.2';
        });

        if (isTraking) setTimeout(function() {
            document.getElementById('ar-textarea').addEventListener('keyup', resizeTextarea);
            document.getElementById('ar-textarea').focus();
            document.getElementById('ar-textarea').focus();
            document.getElementById('ar-textarea').focus();

        }, 200);

    }

    function inputEmoji() {

    }

    function notification() {

        renderables.notification.title   = createDOMRanderable('<p><label id="noti-name">'+notificationName+'</label>님의</p> <p>스티커 메세지</p>', 'notification-title');
        renderables.notification.icon    = createDOMRanderable('<img src="assets/icn-open-messege.png" srcset="assets/icn-open-messege@2x.png 2x, assets/icn-open-messege@3x.png 3x">', 'notification-icon', viewContent);
        renderables.notification.content = createDOMRanderable('열어 볼까요?', 'notification-content');

        world.add(renderables.notification.title);
        world.add(renderables.notification.icon);
        world.add(renderables.notification.content);

    }  

    function view() {

    if (notificationObject) {

        notificationObject.forEach(function(item) {
            
            var element = document.createElement('div');
            var 
            div = document.createElement('div');
        
            div.className = 'target-text-content';
            div.innerHTML = item.text;
            
            element.appendChild(div);
            element.style.textShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
            element.className = 'renderable-item';

            var 
                object = new DOMRenderable(element);

            object.position.set(item.position.x, item.position.y, item.position.z);
            object.rotateX(item.rotation.x);
            object.rotateY(item.rotation.y);
            object.rotateZ(item.rotation.z);
            object.scale.set(item.scale,item.scale,item.scale);

            content.add(object);

        });
    } else{
        alert('정상적으로 등록되지 않은 메세지입니다.');
        typeLoadControl(6);

    };

    
    }

    function edit(renderable) { 
        
        content.children.forEach(function(item) {
            item.element.removeEventListener('touchstart', selectEditObject);
            if (editObject !== item ) item.element.style.opacity = '0.2';

        });

        renderable.element.style.textShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
        renderable.element.className = 'renderable-item';
        
        if (!isRedit) {
            if (renderable.element.children[0].tagName === 'SPAN') currentTarget.size.width > 100 ? renderable.scale.set(.7,.7,.7) : renderable.scale.set(.3,.3,.3);

            if (renderable.element.children[0].tagName === 'TEXTAREA') {
                
                console.log(renderable.element.children[0].value);
                console.log(renderable.element.children[0].value.replace(/\n/g, '<br/>'));

                var 
                    value = renderable.element.children[0].value.replace(/\n/g, '<br/>');

                renderable.element.removeChild(renderable.element.children[0]);

                var 
                    div = document.createElement('div');
                
                div.className = 'target-text-content';
                div.innerHTML = value;

                renderable.element.appendChild(div);


            }              

            content.add(renderable);
            document.querySelector('.icon-images.next').style.opacity = '1.0';
            
            touch.current = {
                x        : 0,
                y        : 0,
                z        : 0,
                scale    : 1,
                rotation : 0
            };              
        }

        editObject = renderable;
        touch.current.scale = editObject.scale.x;
        editObject.element.style.border = '1px solid rgba(0 ,177 , 199, 0.8)';
        if (editObject.element.children[0].tagName === 'TEXTAREA') {

        editObject.element.children[0].readOnly = true;
        editObject.element.children[0].style.textShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
        }

    }




    function editSucsess() {
        if (isRedit) isRedit = false;
        editObject.element.style.border = 'none';

        content.children.forEach(function(item) {
            item.element.style.opacity = '0.9';
            item.element.addEventListener('touchstart', selectEditObject);

        });

        typeLoadControl(1);


    }

    function selectEditObject(e) {
        content.children.forEach(function(item) {
            
            if (item.element == e.target.parentElement) {
                isRedit = true;
                editObject = item;
                //

                //

                touch.current = {
                    x        : editObject.position.x,
                    y        : -editObject.position.y,
                    z        : -editObject.position.z,
                    scale    : editObject.scale.x,
                    rotation : editObject.rotation.z
                };

                typeLoadControl(4);
            }

        });
    }

    function editClose() {
    typeLoadControl(0, 1);
    }

    function createLettet() {
        typeLoadControl(1);

    }

    function viewContent() {
        typeLoadControl(7);

    }

    function viewSucsess() {
        isModeView = false;
        typeLoadControl(0, 1);

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

    function addEmoji(text) {
        if (document.querySelector('.emoji-box-wrapper').classList.toString() !== 'emoji-box-wrapper') scrollClick();

        document.querySelector('.ar-renderer').removeEventListener('touchend', closeAddEmoji);          
    //   editEmoji = text;
        editEmoji = '<span>'+text+'</span>';          
        typeLoadControl(4);

    }
    function closeAddEmoji() {
        if (document.querySelector('.emoji-box-wrapper').classList.toString() !== 'emoji-box-wrapper') scrollClick();
        
        document.querySelector('.ar-renderer').removeEventListener('touchend', closeAddEmoji);          
        typeLoadControl(1);

    }

    function createDOMRanderable(value, className, clickCallback) {

    var
        element = document.createElement('div');

    element.innerHTML = value;
    element.className = className ? className : '';
    if (clickCallback) element.onclick = clickCallback;

    return new DOMRenderable(element);
    }

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


    /* ---------------------------------- util ------------------------------------------------- */
    function resizeTextarea(ev) {
        this.style.height = '48px';
        this.style.height = this.scrollHeight + 'px';
        
        document.getElementById("temp").innerText = this.value;

        if (this.value === '') this.style.width = '360px';
        else this.style.width = (document.getElementById("temp").offsetWidth+40)+'px';


    }

    function guid() {
    function s4() { return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);}
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function formatDate(time, format) {
        var t = new Date(time);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    }
