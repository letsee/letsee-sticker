    
    /* 엔진이 로드되었을 때 호출되는 구성
    */
    function typeLoadControl(type, deleted) {
        if (type === 5 && content.children.length === 0) return;

        threadType = type;

        if (type === 4) {
            if (document.getElementById('ar-textarea')) {
                if (document.getElementById('ar-textarea').value === '') return typeLoadControl(1);
            }

            // editText = document.getElementById('ar-textarea') ? '<textarea>' + document.getElementById('ar-textarea').value + '</textarea>' : editEmoji;
            editText = document.getElementById('ar-textarea') ? renderables.input.text.textarea : editEmoji;                
                

        }
        
        if (world) {
            world.children.forEach(function(item) {
                world.remove(item);

            });
        }

        switch(deleted) {
            case 0 :
                content.remove(editObject);
                if (content.children.length === 0) document.querySelector('.icon-images.next').style.opacity = '.3';

                editSucsess();
                break;
            case 1 :
                content.children.forEach(function(item) {
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
        
        switch(type) {
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
                isRedit ? edit(editObject) : (function() {
                    typeof editText === 'string' ? edit(createDOMRanderable(editText)) : (function() {
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

    function layout() { 
            document.querySelector('.icon-images.create').style.display = 'none';

            switch(threadType) {
                case 0 :
                    document.querySelector('.intro-title').innerText = '';
                    if (!isTraking) {
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
                    
                    if (notificationObject) {
                        document.querySelector('.intro-title').innerHTML = notificationEntityName+'<span>을(를) 비춰</span><br><span>'+notificationName+'님의 스티커 메세지를 확인하세요</span>';
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

    