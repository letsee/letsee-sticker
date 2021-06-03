// @flow
import { delay } from 'redux-saga';
import {
  take,
  fork,
  all,
  put,
  race,
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
import {
  createEntityMessages,
    getEntityMessage,
  updateEntityMessage,
} from '../api/message';

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
      console.log('submitAction.payload',submitAction.payload);
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

        const {data , timeout, destroy} = yield race({ data: id === null ? createEntityMessages(message) : updateEntityMessage(id, message), timeout: delay(2000), destroy: take(DESTROY_MESSAGE_FORM) });
        if (data) {
          yield put(submitMessageFormSuccess());
          yield put(destroyMessageForm());
          yield put(setPublic(false));
          yield put(setCurrentCursor());
        } else {
          // TODO error
          yield put(submitMessageFormError(new Error('form destroyed')));
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
    /* fork(takeMessageList), */
  ]);
}

export default sagas;
