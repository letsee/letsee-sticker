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
import type { Message } from '../types';

function* persistToFirebase(getFirebase, id: string | null, message: Message) {
  const firebase = getFirebase().database();
  let messageRef;

  if (id === null) { // if id is null message is new record
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
      yield messageRef.set(message); // retry setting message until success
      messageSet = true;
    } catch (e) {
      // TODO retry??
      console.log(e);
    }
  }

  yield all([ // update user's messages and public messages subtree
    firebase.ref(`${authorMessagesPath}/${messageId}`).set(message),
    firebase.ref(`${publicMessagesPath}/${messageId}`).set(message.public ? message : null),
  ]);

  return messageRef;
}

function* submitMessageForm(getFirebase) {
  while (true) {
    const submitAction = yield take(SUBMIT_MESSAGE_FORM);

    try {
      // get current user data
      const currentUser = yield select(state => state.currentUser);

      // make sure user is logged in
      if (currentUser !== null && submitAction.payload.author.uid === currentUser.uid) {
        // format data for persistence
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
          timestamp: timestamp || getFirebase().database.ServerValue.TIMESTAMP,
        };

        // race 3s timeout, API call and user cancel action
        const { firebase } = yield race({
          firebase: call(persistToFirebase, getFirebase, id, message),
          timeout: call(delay, 3000), // TODO timeout?
          destroy: take(DESTROY_MESSAGE_FORM),
        });

        if (firebase) { // if firebase submits before timeout or user cancel action
          yield put(submitMessageFormSuccess(firebase.key));
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

function* sagas(getFirebase) {
  yield all([
    fork(submitMessageForm, getFirebase),
  ]);
}

export default sagas;
