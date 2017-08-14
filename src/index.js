/* eslint-disable import/first */
// @flow
require('es6-promise').polyfill();
require('isomorphic-fetch');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store, { runSaga } from './store';
import sagas from './sagas';
import routes from './routes';
import {
  letseeLoad,
  startLoading,
  stopLoading,
  setCurrentUser,
  addEntity,
  startTrackEntity,
  endTrackEntity,
} from './actions';

runSaga(sagas, getFirebase);
const history = syncHistoryWithStore(browserHistory, store);

match({ history, routes }, (err, redirect, renderProps) => {
  Kakao.init(process.env.KAKAO_APP_KEY);
  const app = document.getElementById('app');

  const handleWindowResize = () => {
    app.style.width = `${document.documentElement.clientWidth}px`;
    app.style.height = `${document.documentElement.clientHeight}px`;
  };

  window.addEventListener('resize', handleWindowResize);
  handleWindowResize();

  window.addEventListener('letsee.load', () => {
    store.dispatch(letseeLoad());

    letsee.addEventListener('userchange', (e) => {
      store.dispatch(setCurrentUser(e.user));
    });

    if (typeof window._app !== 'undefined' && window._app !== null && window._app.getUser) {
      window._app.getUser();
    }

    const loadingRenderable = letsee.loading;

    loadingRenderable.start = (e) => {
      const w = e.pixelSize.width;
      const h = e.pixelSize.height;
      const d = Math.sqrt((w * w) + (h * h));
      const s = d / 350;
      loadingRenderable.scale.setScalar(s);
      loadingRenderable.circleAnim.resume();
      store.dispatch(startLoading());
    };

    loadingRenderable.stop = () => {
      loadingRenderable.circleAnim.pause();
      store.dispatch(stopLoading());
    };

    letsee.addEventListener('trackstart', (e) => {
      const {
        image,
        name,
        size,
        uri,
      } = e.target;

      const entity = {
        image,
        name,
        size,
        uri,
      };

      store.dispatch(addEntity(entity));
      store.dispatch(startTrackEntity(entity));
    });

    letsee.addEventListener('trackend', (e) => {
      const {
        image,
        name,
        size,
        uri,
      } = e.target;

      const entity = {
        image,
        name,
        size,
        uri,
      };

      store.dispatch(endTrackEntity(entity));
    });
  });

  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    app,
  );
});
