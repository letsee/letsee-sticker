    function typeStartControl(e) {

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
        switch(threadType) {
            case 0 :
                document.querySelector('.icon-images.create').style.display = 'block';
                document.querySelector('.icon-images.capture').style.display = 'block';

                document.body.style.backgroundColor = 'rgba(0,0,0,0.1)';
                currentTarget = e.target;

                renderables.ready.target.element.innerHTML = currentTarget.name+'에';
                document.getElementById('edit-target-see-name').innerText = currentTarget.name;

                if (currentTarget.size.width > 100) {
                    renderables.ready.target.position.y = (currentTarget.size.height/2)-30;
                    renderables.ready.text.position.y = ((currentTarget.size.height/2)-50);
                    renderables.ready.plus.position.y = -20;
                    renderables.ready.plus.scale.set(.6,.6,.6);
                } else {
                    renderables.ready.target.position.y = 7;
                    renderables.ready.plus.position.y   = -20; 
                    renderables.ready.text.scale.set(.3,.3,.3);
                    renderables.ready.target.scale.set(.3,.3,.3);
                    renderables.ready.plus.scale.set(.2,.2,.2);
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
                if (document.getElementById('noti-name')) document.getElementById('noti-name').innerText = notificationName;

                if (currentTarget.size.width > 100) {

                    renderables.notification.title.position.y   =  85;
                    renderables.notification.content.position.y = -75;
                    renderables.notification.icon.scale.set(.8,.8,.8);

                } else {

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
