// @flow
import { delay } from 'redux-saga';
import { take, fork, all, put, select, race, call } from 'redux-saga/effects';
import moment from 'moment';
import {
  DESTROY_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM,
  submitMessageFormSuccess,
  submitMessageFormError,
  openKakaoLinkModal,
} from '../actions';

const getStickersByEntity = (stickers, uri: string) => stickers.allIds
  .map(id => stickers.byId[id])
  .filter(sticker => sticker && sticker.entityUri === uri);

const persistToFirebase = (getFirebase, message) => getFirebase().push('/messages', message);

function* submitMessageForm(getFirebase) {
  while (true) {
    const submitAction = yield take(SUBMIT_MESSAGE_FORM);

    try {
      const currentUser = yield select(state => state.currentUser);
      const stickers = yield select(state => state.stickers);
      const { uri, name, image } = yield select(state => state.entities.byUri[submitAction.payload.uri]);
      const stickersById = getStickersByEntity(stickers, uri).map(({ id, entityUri, selected, ...other }) => other);

      const message = {
        author: {
          uid: currentUser.uid,
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
        },
        entity: { uri, name, image },
        stickers: stickersById,
        createdAt: moment().format('YYYYMMDDHHmmssZZ'),
      };

      const { firebase, timeout, destroy } = yield race({
        firebase: call(persistToFirebase, getFirebase, message),
        timeout: call(delay, 3000), // TODO timeout?
        destroy: take(DESTROY_MESSAGE_FORM),
      });

      if (destroy || timeout) {
        // TODO error
        yield put(submitMessageFormError(destroy.payload.uri, new Error('form destroyed')));
      }

      if (firebase) {
        yield put(submitMessageFormSuccess(submitAction.payload.uri, firebase.path.o));
        yield put(openKakaoLinkModal(submitAction.payload.uri, firebase.path.o));
      }
    } catch (e) {
      // TODO error
      console.log(e);
      yield put(submitMessageFormError(submitAction.payload.uri, e));
    }
  }
}

function* sagas(getFirebase) {
  yield all([
    fork(submitMessageForm, getFirebase),
  ]);
}

export default sagas;
