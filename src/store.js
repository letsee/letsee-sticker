// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { reactReduxFirebase } from 'react-redux-firebase';
import client from './client';
import firebase from './firebase';
import reducers from './reducers';
import initialState from './initialState';

let preloadedState = initialState;

if (typeof window !== 'undefined' && window !== null && window.__PRELOADED_STATE__) {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;
}

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(
  applyMiddleware(client.middleware()),
  reactReduxFirebase(firebase, { enableLogging: process.env.NODE_ENV !== 'production' }),
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducers, preloadedState, enhancers);
export const runSaga = sagaMiddleware.run;

export default store;
