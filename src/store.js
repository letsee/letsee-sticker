// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from './firebase';
import reducers from './reducers';
import epics from './epics';
import initialState from './initialState';

let preloadedState = initialState;

if (typeof window !== 'undefined' && window !== null && window.__PRELOADED_STATE__) {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;
}

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware(epics, {
  dependencies: {
    getFirebase,
  },
});

const enhancers = composeWithDevTools(
  reactReduxFirebase(firebase, { enableLogging: process.env.NODE_ENV !== 'production' }),
  applyMiddleware(sagaMiddleware),
  applyMiddleware(epicMiddleware),
);

const store = createStore(reducers, preloadedState, enhancers);
export const runSaga = sagaMiddleware.run;

export default store;
