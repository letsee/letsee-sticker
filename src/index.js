/* eslint-disable import/first */
// @flow
require('es6-promise').polyfill();
require('isomorphic-fetch');

import 'babel-polyfill';
import 'normalize.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { runSaga } from './store';
import sagas from './sagas';
import App from './components/App';

runSaga(sagas);

const app = document.getElementById('app');

const handleWindowResize = () => {
  app.style.width = `${document.documentElement.clientWidth}px`;
  app.style.height = `${document.documentElement.clientHeight}px`;
};

window.addEventListener('resize', handleWindowResize);
handleWindowResize();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
);
