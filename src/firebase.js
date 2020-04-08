// @flow
import firebase from 'firebase';

const firebaseConfig = {
    // 서버환경에서 키 저장.
    // apiKey: `${process.env.FIREBASE_API_KEY}`,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    
    // 기존 letsee-sticker Production
    // apiKey: "AIzaSyAdY-yp074zuymgIbqeR1EKgGWwSQb0-pc",
    // authDomain: "sticker-webapp.firebaseapp.com",
    // databaseURL: "https://sticker-webapp.firebaseio.com",
    // projectId: "sticker-webapp",
    // storageBucket: "",
    // messagingSenderId: "11949169975"
    
    // 마이그레이션 letsee-sticker webar
    apiKey: "AIzaSyCdeMX98pDr1eBu46x8vZDmBeUaJaIzSyU",
    authDomain: "letsee-webar-sticker.firebaseapp.com",
    databaseURL: "https://letsee-webar-sticker.firebaseio.com",
    projectId: "letsee-webar-sticker",
    storageBucket: "",
    messagingSenderId: "630050918149",
    
};

firebase.initializeApp(firebaseConfig);

export default firebase;
