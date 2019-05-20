Kakao.init('268d83b5b3629f64b515bd27ed0aa2d2');
var uuid = guid();
var USER_NAME = '';
var SERVICE_URL = 'https://intra.letsee.io/apps/sticker';
//      var SERVICE_URL = 'https://apps.letsee.io/stickers';

var config = {
    apiKey: "AIzaSyAdY-yp074zuymgIbqeR1EKgGWwSQb0-pc",
    authDomain: "sticker-webapp.firebaseapp.com",
    databaseURL: "https://sticker-webapp.firebaseio.com",
    projectId: "sticker-webapp",
    storageBucket: "",
    messagingSenderId: "11949169975"
  },
  database;

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

window.addEventListener('letsee.load', function(){
  createEmojiBox();

  var
    intro = document.querySelector('.target-intro-wrapper');
    intro.style.width  = window.screen.availWidth-(window.screen.availWidth/5)+'px';
  intro.style.height = (window.screen.availHeight-(window.screen.availHeight/4.55))+'px';

  firebase.initializeApp(config);
  database = firebase.database();

  world = new Object3D();
  content = new Object3D();
  var
    param = window.location.href.split("?");

  if(param[1] !== undefined){
    var
      value = param[1].split("/");

    switch(value[0]){
      case 'type' :
        notificationKey = value[1];

        if(!notificationObject) select(notificationKey);
        isModeView = true;
        break;
      default : break;
    }

    typeLoadControl(6);
  } else typeLoadControl(0);

  letsee.addEventListener("userchange", onUserInfoReceive);

  letsee.addEventListener("trackstart", function(e) {
    if (e.target.size.width > 100){
      // resize
    } else {
      // letsee.getEntity('unknown').renderables[0].scale.set(0.3,0.3,0.3);
      // letsee.getEntity('unknown').renderables[1].scale.set(0.3,0.3,0.3);
    }

    // 현재 타겟의 uri
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

        content.children.forEach(function(item){
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

  letsee.addEventListener('trackend', function(e){
    isTraking = false;
    typeEndControl(e);

  });

});






function layout(){
  document.querySelector('.icon-images.create').style.display = 'none';

  switch(threadType){
    case 0 :
      document.querySelector('.intro-title').innerText = '';
      if(!isTraking){
        document.querySelector('.target-intro-wrapper').style.display = 'block';
        document.querySelector('.intro-title').style.display = 'block';
      }

      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 1 :
      document.querySelector('.icon-images.capture').style.display = 'block';
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.icon-images.next').style.display  = 'block';
      document.querySelector('.icon-images.emoji').style.display = 'block';
      document.querySelector('.icon-images.text').style.display  = 'block';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 2 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'block';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 3 :

      document.querySelector('.emoji-box-btn').removeEventListener('click', scrollClick);
      document.querySelector('.emoji-box-btn').addEventListener('click', scrollClick);

      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'block';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      document.querySelector('.ar-renderer').addEventListener('touchend', closeAddEmoji);

      break;
    case 4 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'block';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'block';
      document.querySelector('.edit-title').style.display = 'block';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 5 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'block';
      document.querySelector('.icon-images.back').style.display   = 'block';
      document.querySelector('.icon-kakao-sucsess').style.display = 'block';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 6 :

      if(notificationObject){
        document.querySelector('.intro-title').innerHTML = notificationEntityName+'<span>를 비춰</span><br><span>'+notificationName+'님의 스티커 메세지를 확인하세요</span>';
      }
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display  = 'none';
      document.querySelector('.icon-images.next').style.display   = 'none';
      document.querySelector('.icon-images.emoji').style.display  = 'none';
      document.querySelector('.icon-images.text').style.display   = 'none';

      document.querySelector('.icon-text-sucsess').style.display  = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display  = 'none';

      document.querySelector('.icon-images.trash').style.display  = 'none';
      document.querySelector('.edit-title').style.display         = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      document.querySelector('.target-intro-text').style.display = 'none';

      break;
    case 7 :
      document.querySelector('.icon-images.capture').style.display = 'block';
      document.querySelector('.icon-images.close').style.display  = 'none';
      document.querySelector('.icon-images.next').style.display   = 'none';
      document.querySelector('.icon-images.emoji').style.display  = 'none';
      document.querySelector('.icon-images.text').style.display   = 'none';

      document.querySelector('.icon-text-sucsess').style.display  = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display  = 'none';

      document.querySelector('.icon-images.trash').style.display  = 'none';
      document.querySelector('.edit-title').style.display         = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'block';
      document.querySelector('.icon-view-sucsess').style.display = 'block';

      break;
    default : break;
  }
}



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

// ????
function typeLoadControl(type, deleted){
  if(type === 5 && content.children.length === 0) return;

  threadType = type;

  if(type === 4){
    if(document.getElementById('ar-textarea')){
      if(document.getElementById('ar-textarea').value === '') return typeLoadControl(1);
    }

    // editText = document.getElementById('ar-textarea') ? '<textarea>' + document.getElementById('ar-textarea').value + '</textarea>' : editEmoji;
    editText = document.getElementById('ar-textarea') ? renderables.input.text.textarea : editEmoji;


  }

  if(world){
    world.children.forEach(function(item){
      world.remove(item);

    });
  }

  switch(deleted){
    case 0 :
      content.remove(editObject);
      if(content.children.length === 0) document.querySelector('.icon-images.next').style.opacity = '.3';

      editSucsess();
      break;
    case 1 :
      content.children.forEach(function(item){
        content.remove(item);
        document.querySelector('.icon-images.next').style.opacity = '.3';
      });
      break;
    case 2 :
      uuid = guid();
      insert(uuid, content);

      // var IMAGE_URL = currentTarget.image ? currentTarget.image : 'https://intra.letsee.io/test/assets/img-kakao@3x.png';

      Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '렛시 스티커 메세지가 도착했어요!',
          description: USER_NAME+'님이 '+currentTarget.name+'에 스티커 메세지를 담아 보냈습니다. 지금 렛시 브라우저로 확인해보세요!',
          imageUrl: SERVICE_URL + '/assets/img-kakao@3x.png',
          link: {
            mobileWebUrl: 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser',
            webUrl: 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser',
            androidExecParams : 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser',
            iosExecParams : 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser'
          }
        },
        buttons: [
          {
            title: '렛시 브라우저로 보기',
            link: {
              mobileWebUrl: 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser',
              webUrl: 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser',
              androidExecParams : 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser',
              iosExecParams : 'https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=' + SERVICE_URL + '?type/'+uuid+'&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser'
            }
          }
        ]
      });

      break;
    default : break;
  }

  layout();

  switch(type){
    case 0 :
      ready();
      document.querySelector('.edit-target-see-wrapper').style.display = 'none';
      break;
    case 1 :
      document.body.style.backgroundColor = 'transparent';
      create();
      editObject = null;
      break;
    case 2 :
      document.body.style.backgroundColor = 'rgba(0,0,0,0.1)';
      inputText();
      break;
    case 3 :

      document.body.style.backgroundColor = 'rgba(0,0,0,0.1)';
      inputEmoji();

      break;
    case 4 :

      document.body.style.backgroundColor = 'transparent';
      isRedit ? edit(editObject) :
        (function(){
        typeof editText === 'string' ?
          edit(createDOMRenderable(editText)) :
          (function(){
            editText.element.children[0].id = '';
            edit(editText);
        })();
      })();

      break;
    case 5 :

      break;
    case 6 :
      notification();
      break;

    case 7 :
      view();
      break;

    default : break;
  }
}

function ready(){

  world.position.y = 20;

  var name = '';
  if(currentTarget){
    name = currentTarget.name;
    document.getElementById('edit-target-see-name').innerText = currentTarget.name;
  }

  if(isTraking) document.querySelector('.icon-images.create').style.display = 'block';

  renderables.ready.target = createDOMRenderable('<label id="current-target-name">'+name+'</label>', 'target-ready-content');
  renderables.ready.text   = createDOMRenderable("<div>스티커 메세지를 남겨보세요</div>", 'target-ready-content');
  renderables.ready.plus   = createDOMRenderable('<img src="assets/btn-add-content.png" srcset="assets/btn-add-content@2x.png 2x, assets/btn-add-content@3x.png 3x">', 'ready-button', createLettet);

  if(currentTarget){

    if(currentTarget.size.width > 100){
      renderables.ready.text.position.y = ((currentTarget.size.height/2)-50);
      renderables.ready.plus.position.y = -20;
      renderables.ready.plus.scale.set(.5,.5,.5);
      renderables.ready.target.position.y = (currentTarget.size.height/2)-30;
    }else{

      renderables.ready.text.scale.set(.3,.3,.3);
      renderables.ready.target.position.y = 7;
      renderables.ready.target.scale.set(.3,.3,.3);

      renderables.ready.plus.position.y   = -20;
      renderables.ready.plus.scale.set(.2,.2,.2);
    }

  }

  world.add(renderables.ready.target);
  world.add(renderables.ready.text);
  //world.add(renderables.ready.plus);

  initDummyData();
}

function create(){
  _app.getUser();

  world.position.y = 0;

  if(content.children.length === 0){
    renderables.create.wrapper = createDOMRenderable('', 'create-target-wrapper');
    renderables.create.emoji   = createDOMRenderable('<img src="assets/group-2-copy-3.png" srcset="assets/group-2-copy-3@2x.png 2x, assets/group-2-copy-3@3x.png 3x">', 'create-target-emoji');
    renderables.create.text    = createDOMRenderable('<img src="assets/icn-ar-text.png" srcset="assets/icn-ar-text@2x.png 2x, assets/icn-ar-text@3x.png 3x">', 'create-target-text');

    renderables.create.emoji.element.addEventListener("click", function(){
      typeLoadControl(3);
    });
    renderables.create.text.element.addEventListener("click", function(){
      typeLoadControl(2);
    });


    if(currentTarget.size.width > 100){
      renderables.create.emoji.position.x = -48;
      renderables.create.text.position.x  = 48;
      renderables.create.emoji.scale.set(.8,.8,.8);
      renderables.create.text.scale.set(.8,.8,.8);
    }else{
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

function inputText(){
  content.children.forEach(function(item){
    item.element.removeEventListener('touchstart', selectEditObject);
    if(editObject !== item ) item.element.style.opacity = '0.2';

  });

  renderables.input.text.textarea = createDOMRenderable('<textarea id="ar-textarea" placeholder="메세지를 입력해주세요" type="text"></textarea>','input-text-area');

  if(currentTarget.size.width > 100) renderables.input.text.textarea.scale.set(.7,.7,.7);
  else renderables.input.text.textarea.scale.set(.3,.3,.3);

  world.add(renderables.input.text.textarea);

  content.children.forEach(function(item){
    item.element.style.opacity = '0.2';
  });

  if(isTraking) setTimeout(function(){
    document.getElementById('ar-textarea').addEventListener('keyup', resizeTextarea);
    document.getElementById('ar-textarea').focus();
    document.getElementById('ar-textarea').focus();
    document.getElementById('ar-textarea').focus();

  }, 200);

}

function inputEmoji(){

}

function notification(){

  renderables.notification.title   = createDOMRenderable('<p><label id="noti-name">'+notificationName+'</label>님의</p> <p>스티커 메세지</p>', 'notification-title');
  renderables.notification.icon    = createDOMRenderable('<img src="assets/icn-open-messege.png" srcset="assets/icn-open-messege@2x.png 2x, assets/icn-open-messege@3x.png 3x">', 'notification-icon', viewContent);
  renderables.notification.content = createDOMRenderable('열어 볼까요?', 'notification-content');

  world.add(renderables.notification.title);
  world.add(renderables.notification.icon);
  world.add(renderables.notification.content);

}

// 서버로부터 오는 데이터
function view(){

  if(notificationObject){

    notificationObject.forEach(function(item){

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

function edit(renderable){

  content.children.forEach(function(item){
    item.element.removeEventListener('touchstart', selectEditObject);
    if(editObject !== item ) item.element.style.opacity = '0.2';

  });

  renderable.element.style.textShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
  renderable.element.className = 'renderable-item';

  if(!isRedit){
    if(renderable.element.children[0].tagName === 'SPAN') currentTarget.size.width > 100 ? renderable.scale.set(.7,.7,.7) : renderable.scale.set(.3,.3,.3);

    if(renderable.element.children[0].tagName === 'TEXTAREA'){

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
  if(editObject.element.children[0].tagName === 'TEXTAREA'){

    editObject.element.children[0].readOnly = true;
    // object.element.children[0].disabled = true;
    editObject.element.children[0].style.textShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
  }

}




function editSucsess(){
  if(isRedit) isRedit = false;
  editObject.element.style.border = 'none';

  content.children.forEach(function(item){
    item.element.style.opacity = '0.9';
    item.element.addEventListener('touchstart', selectEditObject);

  });

  typeLoadControl(1);


}

function selectEditObject(e){
  content.children.forEach(function(item){

    if(item.element == e.target.parentElement){
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

function editClose(){
  typeLoadControl(0, 1);
}

function createLettet(){
  typeLoadControl(1);

}

function viewContent(){
  typeLoadControl(7);

}

function viewSucsess(){
  isModeView = false;
  typeLoadControl(0, 1);

}

function scrollClick(){
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

function addEmoji(text){
  if(document.querySelector('.emoji-box-wrapper').classList.toString() !== 'emoji-box-wrapper') scrollClick();

  document.querySelector('.ar-renderer').removeEventListener('touchend', closeAddEmoji);
  //   editEmoji = text;
  editEmoji = '<span>'+text+'</span>';
  typeLoadControl(4);

}
function closeAddEmoji(){
  if(document.querySelector('.emoji-box-wrapper').classList.toString() !== 'emoji-box-wrapper') scrollClick();

  document.querySelector('.ar-renderer').removeEventListener('touchend', closeAddEmoji);
  typeLoadControl(1);

}

function typeStartControl(e){

  document.querySelector('.icon-images.create').style.display = 'none';

  switch(threadType){
    case 0 :
      document.querySelector('.intro-title').innerText = '';
      if(!isTraking){
        document.querySelector('.target-intro-wrapper').style.display = 'block';
        document.querySelector('.intro-title').style.display = 'block';
      }

      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 1 :
      document.querySelector('.icon-images.capture').style.display = 'block';
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.icon-images.next').style.display  = 'block';
      document.querySelector('.icon-images.emoji').style.display = 'block';
      document.querySelector('.icon-images.text').style.display  = 'block';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 2 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'block';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 3 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'block';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 4 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'block';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'block';
      document.querySelector('.edit-title').style.display = 'block';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 5 :
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.icon-images.next').style.display  = 'none';
      document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';

      document.querySelector('.icon-text-sucsess').style.display = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display = 'none';

      document.querySelector('.icon-images.trash').style.display = 'none';
      document.querySelector('.edit-title').style.display = 'none';

      document.querySelector('.kakao-background').style.display   = 'block';
      document.querySelector('.icon-images.back').style.display   = 'block';
      document.querySelector('.icon-kakao-sucsess').style.display = 'block';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 6 :

      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.icon-images.close').style.display  = 'none';
      document.querySelector('.icon-images.next').style.display   = 'none';
      document.querySelector('.icon-images.emoji').style.display  = 'none';
      document.querySelector('.icon-images.text').style.display   = 'none';

      document.querySelector('.icon-text-sucsess').style.display  = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display  = 'none';

      document.querySelector('.icon-images.trash').style.display  = 'none';
      document.querySelector('.edit-title').style.display         = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'none';
      document.querySelector('.icon-view-sucsess').style.display = 'none';

      break;
    case 7 :
      document.querySelector('.icon-images.capture').style.display = 'block';
      document.querySelector('.icon-images.close').style.display  = 'none';
      document.querySelector('.icon-images.next').style.display   = 'none';
      document.querySelector('.icon-images.emoji').style.display  = 'none';
      document.querySelector('.icon-images.text').style.display   = 'none';

      document.querySelector('.icon-text-sucsess').style.display  = 'none';
      document.querySelector('.icon-edit-sucsess').style.display  = 'none';

      document.querySelector('.emoji-box-wrapper').style.display  = 'none';

      document.querySelector('.icon-images.trash').style.display  = 'none';
      document.querySelector('.edit-title').style.display         = 'none';

      document.querySelector('.kakao-background').style.display   = 'none';
      document.querySelector('.icon-images.back').style.display   = 'none';
      document.querySelector('.icon-kakao-sucsess').style.display = 'none';

      document.querySelector('.icon-view-writer').style.display  = 'block';
      document.querySelector('.icon-view-sucsess').style.display = 'block';

      break;
    default : break;
  }

  document.querySelector('.edit-target-see-wrapper').style.display = 'none';
  switch(threadType){
    case 0 :
      document.querySelector('.icon-images.create').style.display = 'block';
      document.querySelector('.icon-images.capture').style.display = 'block';

      document.body.style.backgroundColor = 'rgba(0,0,0,0.1)';
      currentTarget = e.target;

      renderables.ready.target.element.innerHTML = currentTarget.name+'에';
      document.getElementById('edit-target-see-name').innerText = currentTarget.name;

      if(currentTarget.size.width > 100){
        renderables.ready.text.position.y = ((currentTarget.size.height/2)-50);
        renderables.ready.plus.position.y = -20;
        renderables.ready.plus.scale.set(.6,.6,.6);
        renderables.ready.target.position.y = (currentTarget.size.height/2)-30;

      }else{
        renderables.ready.plus.position.y   = -20;
        renderables.ready.text.scale.set(.3,.3,.3);
        renderables.ready.plus.scale.set(.2,.2,.2);
        renderables.ready.target.position.y = 7;
        renderables.ready.target.scale.set(.3,.3,.3);
      }
      break;
    case 1 :
      var w = e.target.size.width,
        h = e.target.size.height;

      renderables.create.wrapper.element.style.width  = w +'px';
      renderables.create.wrapper.element.style.height = h +'px';
      document.querySelector('.icon-images.emoji').style.display = 'block'; document.querySelector('.icon-images.text').style.display  = 'block';

      break;
    case 2 :
      document.getElementById('ar-textarea').focus();
      break;
    case 3 :
      break;
    case 4 :
      break;
    case 5 :
      break;
    case 6 :
      currentTarget = e.target;
      if(document.getElementById('noti-name')) document.getElementById('noti-name').innerText = notificationName;

      if(currentTarget.size.width > 100){

        renderables.notification.title.position.y   =  85;
        renderables.notification.content.position.y = -75;
        renderables.notification.icon.scale.set(.8,.8,.8);

      }else{

        renderables.notification.title.position.y   =  35;
        renderables.notification.content.position.y = -35;

        renderables.notification.title.scale.set(.4,.4,.4);
        renderables.notification.icon.scale.set(.2,.2,.2);
        renderables.notification.content.scale.set(.4,.4,.4);

      }

      break;
    case 7 :
      break;
    default : break;
  }
}

function typeEndControl(e){
  document.querySelector('.icon-images.capture').style.display = 'block';
  // document.querySelector('.icon-images.close').style.display = 'block';
  document.querySelector('.icon-images.next').style.display  = 'none';
  document.querySelector('.icon-images.emoji').style.display = 'none';
  document.querySelector('.icon-images.text').style.display  = 'none';

  document.querySelector('.icon-text-sucsess').style.display = 'none';
  document.querySelector('.icon-edit-sucsess').style.display  = 'none';

  document.querySelector('.emoji-box-wrapper').style.display = 'none';

  document.querySelector('.icon-images.trash').style.display = 'none';
  document.querySelector('.edit-title').style.display = 'none';

  document.querySelector('.kakao-background').style.display   = 'none';
  document.querySelector('.icon-images.back').style.display   = 'none';
  document.querySelector('.icon-kakao-sucsess').style.display = 'none';

  document.querySelector('.icon-view-writer').style.display  = 'none';
  document.querySelector('.icon-view-sucsess').style.display = 'none';

  switch(threadType){
    case 0 :
      document.body.style.backgroundColor = 'transparent';
      document.querySelector('.icon-images.create').style.display = 'none';
      document.querySelector('.icon-images.capture').style.display = 'none';
      document.querySelector('.target-intro-wrapper').style.display = 'block';
      document.querySelector('.intro-title').style.display = 'block';
      break;
    case 1 :
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.edit-target-see-wrapper').style.display = 'block'; document.querySelector('.icon-images.emoji').style.display = 'none'; document.querySelector('.icon-images.text').style.display  = 'none';
      break;
    case 2 :
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.edit-target-see-wrapper').style.display = 'block'; document.querySelector('.icon-images.emoji').style.display = 'none'; document.querySelector('.icon-images.text').style.display  = 'none';

      break;
    case 3 :
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.edit-target-see-wrapper').style.display = 'block'; document.querySelector('.icon-images.emoji').style.display = 'none'; document.querySelector('.icon-images.text').style.display  = 'none';
      break;
    case 4 :
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.edit-target-see-wrapper').style.display = 'block'; document.querySelector('.icon-images.emoji').style.display = 'none'; document.querySelector('.icon-images.text').style.display  = 'none';

      break;
    case 5 :
      document.querySelector('.icon-images.close').style.display = 'block';
      document.querySelector('.edit-target-see-wrapper').style.display = 'block'; document.querySelector('.icon-images.emoji').style.display = 'none'; document.querySelector('.icon-images.text').style.display  = 'none';
      break;
    case 6 :
      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.target-intro-wrapper').style.display = 'block';
      document.querySelector('.intro-title').style.display = 'block';

      document.querySelector('.target-intro-text').style.display = 'none';

      break;
    case 7 :

      var name = '';
      if(currentTarget){
        name = currentTarget.name;
        document.getElementById('edit-target-see-name').innerText = currentTarget.name;
      }

      document.querySelector('.icon-images.close').style.display = 'none';
      document.querySelector('.edit-target-see-wrapper').style.display = 'block'; document.querySelector('.icon-images.emoji').style.display = 'none';
      document.querySelector('.icon-images.text').style.display  = 'none';
      break;
    default : break;
  }
}

function createDOMRenderable(value, className, clickCallback){

  var element = document.createElement('div');

  element.innerHTML = value;
  element.className = className ? className : '';
  if(clickCallback) element.onclick = clickCallback;

  return new DOMRenderable(element);
}

function createEmojiBox(){

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

  // for(var i = emojiArray.length; i--;){
  for(var i = 0; i < emojiArray.length; i++){
    var
      span = document.createElement('span');
    span.innerHTML = '<span onclick="addEmoji(\''+emojiArray[i]+'\');">'+emojiArray[i]+'</span>';
    document.querySelector('.emoji-box-item').appendChild(span);
  }

  document.querySelector('.emoji-box-item').appendChild(document.createElement('br'));
  document.querySelector('.emoji-box-item').appendChild(document.createElement('br'));
}

function insert(key, object){
  console.log(key);

  var data = [],
    name = USER_NAME,
    datetime = new Date().getTime();

  object.children.forEach(function(item){

    var
      text = item.element.children[0].tagName === 'SPAN' ? item.element.innerHTML : item.element.children[0].innerHTML;

    var prop = {
      position : {
        x : item.position.x,
        y : item.position.y,
        z : item.position.z
      },
      rotation : {
        x : item.rotation.x,
        y : item.rotation.y,
        z : item.rotation.z
      },
      scale : item.scale.x,
      text  : text
    };

    data.push(prop);

  });

  database.ref('stickers/' + key).set({
    name : name,
    datetime : datetime,
    entity : CURRENT_URI,
    entityName : currentTarget.name,
    data : data
  });
}

function select(key){

  database.ref('stickers/' + key)
    .once('value')
    // 데이터를 가져오는 부분
    .then(function(data){

      notificationName = data.val().name;
      notificationEntityURI = data.val().entity;
      notificationEntityName = data.val().entityName;
      notificationObject = data.val().data;

      document.getElementById('view-writer').innerText = notificationName;
      document.getElementById('view-datetime').innerText = formatDate(data.val().datetime, 'yyyy년 MM월 dd일');
      typeLoadControl(6);

    });
}

function resizeTextarea(ev) {
  this.style.height = '48px';
  this.style.height = this.scrollHeight + 'px';

  document.getElementById("temp").innerText = this.value;

  if(this.value === '') this.style.width = '360px';
  else this.style.width = (document.getElementById("temp").offsetWidth+100)+'px';
  //   this.style.width = (document.getElementById("temp").offsetWidth+100)+'px';


}

function guid(){
  function s4(){ return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);}
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

// "이정우 입니다" 텍스트 추가하기.
function initDummyData() {

  /*
  // set renderable data
  let dData = [
    {
      "text": "더미1",
      "position": {
        "x": 100,
        "y": 100,
        "z": 0
      },
      "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "scale": 1
    },
    {
      "text": "더미2",
      "position": {
        "x": -100,
        "y": 100,
        "z": 0
      },
      "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "scale": 1
    },
    {
      "text": "더미3",
      "position": {
        "x": 100,
        "y": -100,
        "z": 0
      },
      "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "scale": 1
    },
    {
      "text": "더미4",
      "position": {
        "x": -100,
        "y": -100,
        "z": 0
      },
      "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "scale": 1
    }
  ];
  localStorage.setItem("renderables", JSON.stringify(dData));
  */
  createDOMRenderableFromJson();
}

// Create renderable item from localstorage json and add to the world.
function createDOMRenderableFromJson() {
  // get renderable data
  let dData = JSON.parse(localStorage.getItem("renderables"));

  dData.forEach(function(item) {
      let element = document.createElement('div');
      element.style.textShadow = '0 0 8px rgba(0, 0, 0, 0.5)';

      let div = document.createElement('div');
      div.className = "target-text-content";
      div.innerHTML = item.text;

      element.appendChild(div);
      element.className = "renderable-item";

      // element 는 div, object 설정
      let object = new DOMRenderable(element);

      // 여기서부터 가져온 데이터로 position 등등을 설정함.
      object.position.set(item.position.x, item.position.y, item.position.z);
      object.rotateX(item.rotation.x);
      object.rotateY(item.rotation.y);
      object.rotateZ(item.rotation.z);
      object.scale.set(item.scale,item.scale,item.scale);

      world.add(object);
  });
}

function addTextItem() {
  let text = $('#inputArea').val();

  let jungwooText = createDOMRenderable("<div>" + text + "</div>", 'target-ready-content');
  world.add(jungwooText);
  editObject = jungwooText;

  showInputTextDiv();
  showInputConfirmDiv();
}


function addTextComplete(text) {
  showBtnAddAndMenu();

  let dData = JSON.parse(localStorage.getItem("renderables"));
  let object = {
    "text": text,
    "position": {
      "x": editObject.position.x,
      "y": editObject.position.y,
      "z": editObject.position.z
    },
    "rotation": {
      "x": editObject.rotation.x,
      "y": editObject.rotation.y,
      "z": editObject.rotation.z
    },
    "scale": editObject.scale.x
  };

  dData.push(object);
  localStorage.setItem("renderables", JSON.stringify(dData));
}

