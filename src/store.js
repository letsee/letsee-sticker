// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from './firebase';
import reducers from './reducers';
import initialState from './initialState';
// 초기 로딩될 State를 정의함
let preloadedState = initialState;

if (typeof window !== 'undefined' && window !== null && window.__PRELOADED_STATE__) {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;
}

const sagaMiddleware = createSagaMiddleware();

// Devtool 사용을 위한 설정.
// redux-saga 미들웨어를 스토어에 설정하는 부분이다.
const enhancers = composeWithDevTools(
  reactReduxFirebase(firebase, { enableLogging: process.env.NODE_ENV !== 'production' }),
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducers, preloadedState, enhancers);
export const runSaga = sagaMiddleware.run;

export default store;
