// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from './firebase';
import reducers from './reducers';

const initialState = {
  letseeLoaded: false,
  currentEntity: null,
  currentUser: null,
  entities: {
    byUri: {},
    allUris: [],
  },
  messageForm: null,
  selectedSticker: null,
  stickers: {
    byId: {},
    allIds: [],
  },
};

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(
  reactReduxFirebase(firebase, { enableLogging: process.env.NODE_ENV !== 'production' }),
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducers, initialState, enhancers);
export const runSaga = sagaMiddleware.run;

export default store;
