/* eslint-disable import/first */
// @flow
require('es6-promise').polyfill();
require('isomorphic-fetch');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
// 브라우저 히스토리 => 해시히스토리 : 해시히스토리를 사용해야 웹에서 돌아감.
import { match, Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
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
const history = syncHistoryWithStore(hashHistory, store);

// 서버사이드 렌더링..
match({ history, routes }, (err, redirect, renderProps) => {
  // Kakao.init(process.env.KAKAO_APP_KEY);
  Kakao.init('268d83b5b3629f64b515bd27ed0aa2d2');
  const app = document.getElementById('app');
  const handleWindowResize = () => {
    console.log('윈도우 리사이즈.~');
    app.style.width = `${document.documentElement.clientWidth}px`;
    app.style.height = `${document.documentElement.clientHeight}px`;
    // WEBAR SDK가 아래로 오게 하기 위해 position과 z-index를 400 조정
    app.style.position =  'fixed';
    app.style.zIndex = '400';
  };
  

  /**
   * 렛시 0.9.20버전의 스크립트를 삽입
   * 이후 이벤트를 dispatch함.
   */
  const loadLetsee = () => {
    const loadScript = (url, callback) => {
      let script = document.createElement("script")
      script.type = "text/javascript";
      if (script.readyState){  //IE
        script.onreadystatechange = function(){
          if (script.readyState === "loaded" || script.readyState === "complete"){
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {  //Others
        script.onload = function(){
          callback();
        };
      }
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    };
    const onLoaded =  () => {
      letsee.prepare({});
      const config = {
        trackerType: 'IMAGE',
        bodyId: 'fallback-test'
      };
      letsee.init(config, null);
      letsee.entityObserver.subscribe(letsee.ENTITY_EVENT.TRACK_START, e => {
        console.log(e);
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
        // store.dispatch(addEntity(entity));
        // store.dispatch(startTrackEntity(entity));
      });
      letsee.entityObserver.subscribe(letsee.ENTITY_EVENT.TRACK_END, e => {
        console.log(e);
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
        // store.dispatch(endTrackEntity(entity));
      });
    };
    loadScript("../lib/letsee-0.9.20.js", onLoaded);
  };
  loadLetsee();
  
  window.addEventListener('resize', handleWindowResize);
  handleWindowResize();
  // TODO: 렛시의 onLoad 이벤트로 바꿔주기.
  window.addEventListener('letsee.load', () => {
    store.dispatch(letseeLoad());
    
    // 유저 변경 부분 삭제
    // letsee.addEventListener('userchange', (e) => {
    //   store.dispatch(setCurrentUser(e.user));
    // });

    // if (window._app && window._app.getUser) {
    //   window._app.getUser();
    // }

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
    
    // 뭔지는 모르겠지만 중간에 있는 로더 부분인듯하다.. 일단은 내용을 잘 모르겠음..
    // letsee.setLoadingRenderable(loadingRenderable, (e) => {
    //   const { width, height, depth } = e.pixelSize;
    //   const realDiagonal = Math.sqrt((width * width) + (height * height));
    //   const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    //   const realToClamped = realDiagonal / diagonal;
    //
    //   render(
    //     <FrameAR
    //       width={width / realToClamped}
    //       height={height / realToClamped}
    //       vertical={0}
    //       horizontal={0}
    //       white
    //     >
    //       <StyledEntityLoader size={diagonal} />
    //     </FrameAR>,
    //     loading,
    //   );
    //
    //   if (realDiagonal !== diagonal) {
    //     loadingRenderable.scale.setScalar(realToClamped);
    //   }
    //
    //   if (typeof depth !== 'undefined' && depth !== null) {
    //     loadingRenderable.position.setZ(depth / 2);
    //   }
    //
    //   store.dispatch(startLoading());
    // }, () => {
    //   store.dispatch(stopLoading());
    // });
    
    
    // TODO: 렛시의 trackStart이벤트로 바꿔주기
    //letsee.addEventListener('trackstart', (e) => {
    letsee.eventManager.onTrackStart((e) => {
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

    // TODO: 렛시의 trackEnd 이벤트로 바꿔주기
    //letsee.addEventListener('trackend', (e) => {
    letsee.eventManager.onTrackEnd((e) => {
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
