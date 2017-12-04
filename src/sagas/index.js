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
import firebase from '../firebase';
import type { Message } from '../types';

function* persistToFirebase(id: string | null, message: Message) {
  const database = firebase().database();
  let messageRef;

  if (id === null) {
    messageRef = database.ref('messages').push();
  } else {
    messageRef = database.ref(`/messages/${id}`);
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
    database.ref(`${authorMessagesPath}/${messageId}`).set(message),
    database.ref(`${publicMessagesPath}/${messageId}`).set(message.public ? message : null),
  ]);

  return messageRef;
}

function* submitMessageForm() {
  while (true) {
    const submitAction = yield take(SUBMIT_MESSAGE_FORM);

    try {
      const currentUser = yield select(state => state.currentUser);

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
          timestamp,
        } = submitAction.payload;

        const stickersById = stickers.allIds.map((stickerId) => {
          const {
            id: sid,
            ...sticker
          } = stickers.byId[stickerId];

          return sticker;
        });

        const message = {
          author,
          entity,
          public: isPublic,
          stickers: stickersById,
          timestamp: timestamp || firebase.database.ServerValue.TIMESTAMP,
        };

        const { fb } = yield race({
          fb: call(persistToFirebase, id, message),
          timeout: call(delay, 3000), // TODO timeout?
          destroy: take(DESTROY_MESSAGE_FORM),
        });

        if (fb) {
          yield put(submitMessageFormSuccess(fb.key));
          yield put(destroyMessageForm());
          yield put(setPublic(false));
          yield put(setCurrentCursor(firebase.key));
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

function* sagas() {
  yield all([
    fork(submitMessageForm),
  ]);
}

export default sagas;
