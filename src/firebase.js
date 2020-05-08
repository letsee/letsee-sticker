// @flow
import firebase from 'firebase';

// 파이어베이스의 렛시 프로젝트의  ``letsee-sticker-webar``와 연동됨
const firebaseConfig = {
    apiKey: "AIzaSyCdeMX98pDr1eBu46x8vZDmBeUaJaIzSyU",
    authDomain: "letsee-webar-sticker.firebaseapp.com",
    databaseURL: "https://letsee-webar-sticker.firebaseio.com",
    projectId: "letsee-webar-sticker",
    storageBucket: "",
    messagingSenderId: "630050918149",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
