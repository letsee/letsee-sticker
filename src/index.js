/* eslint-disable import/first */
// @flow
require('es6-promise').polyfill();
require('isomorphic-fetch');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { getFirebase } from 'react-redux-firebase';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import client from './client';
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
import Frame from './components/Frame';
import EntityLoader from './components/EntityLoader';
import { MIN_DIAGONAL, MAX_DIAGONAL } from './constants';

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
      if (e.user === null) {
        store.dispatch(setCurrentUser(null));
      } else {
        const { uid, firstname, lastname } = e.user;
        store.dispatch(setCurrentUser({ uid, firstname, lastname }));
      }
    });

    if (window._app && window._app.getUser) {
      window._app.getUser();
    }

    const loading = document.createElement('div');
    const loadingRenderable = new DOMRenderable(loading);

    const FrameAR = styled(Frame)`
      position: relative;
      width: ${props => props.width}px;
      height: ${props => props.height}px;

      img {
        width: ${props => Math.sqrt(((props.width * props.width) + (props.height * props.height)) / 2) * 0.06}px;
      }
    `;

    const StyledEntityLoader = styled(EntityLoader)`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `;

    letsee.setLoadingRenderable(loadingRenderable, (e) => {
      const { width, height, depth } = e.pixelSize;
      const realDiagonal = Math.sqrt((width * width) + (height * height));
      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;

      render(
        <FrameAR
          width={width / realToClamped}
          height={height / realToClamped}
          vertical={0}
          horizontal={0}
          white
        >
          <StyledEntityLoader size={diagonal} />
        </FrameAR>,
        loading,
      );

      if (realDiagonal !== diagonal) {
        loadingRenderable.scale.setScalar(realToClamped);
      }

      if (typeof depth !== 'undefined' && depth !== null) {
        loadingRenderable.position.setZ(depth / 2);
      }

      store.dispatch(startLoading());
    }, () => {
      store.dispatch(stopLoading());
    });

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
    <ApolloProvider store={store} client={client}>
      <Router {...renderProps} />
    </ApolloProvider>,
    app,
  );
});
