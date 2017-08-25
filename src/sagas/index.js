// @flow
import { delay } from 'redux-saga';
import { take, fork, all, put, select, race, call } from 'redux-saga/effects';
import {
  DESTROY_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM,
  submitMessageFormSuccess,
  submitMessageFormError,
  destroyMessageForm,
  setPublic,
  setCurrentCursor,
} from '../actions';
// import { entityUriToId } from '../entityUriHelper';
import type { Message } from '../types';

function* persistToFirebase(messageRef, message: Message) {
  // const firebase = getFirebase();
  // const messageId = messageRef.key;
  // const entityId = entityUriToId(message.entity.uri);
  // const authorId = message.author.uid;
  //
  // const oldSnapshot = yield messageRef.once('value');
  // const oldMessage = oldSnapshot.val();
  //
  // if (
  //   oldMessage.entity.uri !== message.entity.uri ||
  //   oldMessage.author.uid !== message.author.uid
  // ) {
  //   const oldEntityId = entityUriToId(oldMessage.entity.uri);
  //   const oldAuthorId = oldMessage.author.uid;
  //
  //   yield all([
  //     firebase.remove(`/entityMessages/${oldEntityId}/authorMessages/${oldAuthorId}/${messageId}`),
  //     firebase.remove(`/entityMessages/${oldEntityId}/publicMessages/${messageId}`),
  //   ]);
  // }
  //
  // const messages = yield all([
  //   firebase.set(`/messages/${messageId}`, message),
  //   firebase.set(`/entityMessages/${entityId}/authorMessages/${authorId}/${messageId}`, message),
  //   firebase.set(`/entityMessages/${entityId}/`),
  // ]);
  //
  // return messages;
  yield messageRef.set(message);
  return messageRef;
}

function* submitMessageForm(getFirebase) {
  while (true) {
    const submitAction = yield take(SUBMIT_MESSAGE_FORM);

    try {
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

      const currentUser = yield select(state => state.currentUser);

      if (currentUser !== null && author.uid === currentUser.uid) {
        let messageRef;

        if (id === null) {
          messageRef = yield getFirebase().database().ref('messages').push();
        } else {
          messageRef = getFirebase().database().ref(`/messages/${id}`);
        }

        const { firebase } = yield race({
          firebase: call(persistToFirebase, messageRef, message),
          timeout: call(delay, 3000), // TODO timeout?
          destroy: take(DESTROY_MESSAGE_FORM),
        });

        if (firebase) {
          yield put(submitMessageFormSuccess(messageRef.key));
          yield put(destroyMessageForm());
          yield put(setPublic(false));
          yield put(setCurrentCursor(messageRef.key));
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
