
    function typeEndControl(e) {
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

        switch(threadType) {
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
                if (currentTarget) {
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