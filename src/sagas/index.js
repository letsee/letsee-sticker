// @flow
import { delay } from 'redux-saga';
import {
  take,
  fork,
  all,
  put,
  select,
  race,
  call,
} from 'redux-saga/effects';
import {
  DESTROY_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM,
  submitMessageFormSuccess,
  submitMessageFormError,
  destroyMessageForm,
  setPublic,
  setCurrentCursor,
} from '../actions';
import { getMessagesListPath } from '../entityUriHelper';
import {
  createEntityMessages,
} from '../api/message';
import type { Message } from '../types';

function* persistToFirebase(getFirebase, id: string | null, message: Message) {
  // firebase 데이터베이스 취득
  const firebase = getFirebase().database();
  let messageRef;
  // 아이디가 존재할경우 private repo , 존재하지 않을 경우 public repo를 root로 삼음
  if (id === null) {
    messageRef = firebase.ref('messages').push();
  } else {
    messageRef = firebase.ref(`/messages/${id}`);
  }

  const messageId = messageRef.key;
  const authorMessagesPath = getMessagesListPath(message.entity.uri, message.author.uid);
  const publicMessagesPath = getMessagesListPath(message.entity.uri, null);

  let messageSet = false;

  while (!messageSet) {
    try {
      yield messageRef.set(message);
      messageSet = true;
    } catch (e) {
      // TODO retry??
      console.log(e);
    }
  }

  yield all([
    firebase.ref(`${authorMessagesPath}/${messageId}`).set(message),
    firebase.ref(`${publicMessagesPath}/${messageId}`).set(message.public ? message : null),
  ]);

  return messageRef;
}

function* submitMessageForm() {
  while (true) {
    const submitAction = yield take(SUBMIT_MESSAGE_FORM);

    try {
      // currentUser를 테스트용으로 변경
      // let currentUser = yield select(state => state.currentUser);
      const currentUser = {
        firstname: 'WEBARSDK-JUNGWOO',
        lastname: 'TEST',
        uid: "jjjjjw910911-010-6284-8051",
      };

      if (currentUser !== null && submitAction.payload.author.uid === currentUser.uid) {
        const {
          id,
          author: {
            email,
            picture,
            ...author
          },
          entity: {
            size,
            ...entity
          },
          public: isPublic,
          stickers,
        } = submitAction.payload;

        const stickersById = stickers.allIds.map((stickerId) => {
          const {
            id: sid,
            ...sticker
          } = stickers.byId[stickerId];

          return sticker;
        });

        const message = {
          imageName: 'bts',
          authorMessages :{
            user : currentUser.uid,
            author,
            entity,
            public: isPublic,
            stickers: stickersById,
          }
          /* timestamp: timestamp || getFirebase().database.ServerValue.TIMESTAMP, */
        };
        console.log(message);
        const { apiSubmit, error } = yield createEntityMessages(message);
        if (error) {
          console.error(error);
        }
        if (apiSubmit) {
          yield put(submitMessageFormSuccess());
          yield put(destroyMessageForm());
          yield put(setPublic(false));
          yield put(setCurrentCursor());
        } else {
          // TODO error
          yield put(submitMessageFormError(new Error('form destroyed')));
        }
      } else {
        // TODO error
        yield put(submitMessageFormError(new Error('user changed')));
      }
    } catch (e) {
      // TODO error
      console.log(e);
      yield put(submitMessageFormError(e));
    }
  }
}

function* getMessageListRequest() {

}

function* sagas() {
  yield all([
    fork(submitMessageForm),
    fork(getMessageListRequest),
  ]);
}

export default sagas;
