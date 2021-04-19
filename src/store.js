// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import initialState from './initialState';
import sagas from './sagas';

let preloadedState = initialState; // 초기 로딩될 Store의 State를 정의
// eslint-disable-next-line no-underscore-dangle
if (typeof window !== 'undefined' && window !== null && window.__PRELOADED_STATE__) {
  // Grab the state from a global variable injected into the server-generated HTML
  // eslint-disable-next-line no-underscore-dangle
  preloadedState = window.__PRELOADED_STATE__;
  // eslint-disable-next-line no-underscore-dangle
  delete window.__PRELOADED_STATE__;
}
const sagaMiddleware = createSagaMiddleware();
const enhancers = compose(
  applyMiddleware(sagaMiddleware),
  // TO-DO 현재 env파일을 따로 생성하지 않기 때문에, redux devTool을 무조건 바인딩 시킨다. Production일 경우에는 devTool로 웹이 제어되는것이 위험할 수 있기 때문에,
  // env 파일 생성 후 해당 내용이 Production이 경우에는 바인딩 되지 않도록 한다.
    // eslint-disable-next-line no-underscore-dangle
    typeof window !== 'undefined' && window !== null && window.__REDUX_DEVTOOLS_EXTENSION__ ?
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : pass => pass,
);
const store = createStore(reducers, preloadedState, enhancers);
sagaMiddleware.run(sagas);
export default store;
