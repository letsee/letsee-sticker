// @flow
import firebase from '@firebase/app';
import '@firebase/database';

const firebaseConfig = {
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
