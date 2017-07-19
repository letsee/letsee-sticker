    var config = {
            apiKey: "AIzaSyAdY-yp074zuymgIbqeR1EKgGWwSQb0-pc",
            authDomain: "sticker-webapp.firebaseapp.com",
            databaseURL: "https://sticker-webapp.firebaseio.com",
            projectId: "sticker-webapp",
            storageBucket: "",
            messagingSenderId: "11949169975"
        },
        database;
    
    window.addEventListener('letsee.load', function() {
        firebase.initializeApp(config);
        database = firebase.database();
    });

    function insert(key, object) {

        var data = [],
            name = USER_NAME,
            datetime = new Date().getTime();

        object.children.forEach(function(item) {
        
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

    function select(key) {

        database.ref('stickers/' + key)
        .once('value')
        .then(function(data) {

            notificationName = data.val().name;
            notificationEntityURI = data.val().entity;
            notificationEntityName = data.val().entityName;
            notificationObject = data.val().data;

            document.getElementById('view-writer').innerText = notificationName;
            document.getElementById('view-datetime').innerText = formatDate(data.val().datetime, 'yyyy년 MM월 dd일');
            typeLoadControl(6);

        });
    }      