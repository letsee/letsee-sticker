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
