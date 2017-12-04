// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import client from './client';
import reducers from './reducers';
import epics from './epics';

let preloadedState = {};

if (typeof window !== 'undefined' && window !== null && window.__PRELOADED_STATE__) {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;
}

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware(epics);

const enhancers = composeWithDevTools(
  applyMiddleware(client.middleware()),
  applyMiddleware(sagaMiddleware),
  applyMiddleware(epicMiddleware),
);

const store = createStore(reducers, preloadedState, enhancers);
export const runSaga = sagaMiddleware.run;

export default store;
