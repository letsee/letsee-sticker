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

    function createDOMRanderable(value, className, clickCallback) {

    var
        element = document.createElement('div');

    element.innerHTML = value;
    element.className = className ? className : '';
    if (clickCallback) element.onclick = clickCallback;

    return new DOMRenderable(element);
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
