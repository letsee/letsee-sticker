// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

const initialState = {
  letseeLoaded: false,
  currentEntity: null,
  currentUser: null,
  messages: {
    byId: {},
    allIds: [],
  },
  entities: {
    byUri: {},
    allUris: [],
  },
  selectedMessage: null,
};

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducers, initialState, enhancers);
export const runSaga = sagaMiddleware.run;

export default store;
