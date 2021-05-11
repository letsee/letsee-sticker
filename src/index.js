/* eslint-disable import/first */
// @flow
import {loadingEntity} from "./reducers/letsee";

require('es6-promise').polyfill();
require('isomorphic-fetch');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// 브라우저 히스토리 => 해시히스토리 : 해시히스토리를 사용해야 웹에서 돌아감.
import { match, Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './routes';
import {
	letseeLoad,
	setCurrentUser,
	addEntity,
	startTrackEntity,
	endTrackEntity, START_LOADING, stopLoading, STOP_LOADING, startLoading
} from './actions';

const history = syncHistoryWithStore(hashHistory, store);
// 서버사이드 렌더링..
match({ history, routes }, (err, redirect, renderProps) => {
	const app = document.getElementById('app');
	const handleWindowResize = () => {
		app.style.width = `${document.documentElement.clientWidth}px`;
		app.style.height = `${document.documentElement.clientHeight}px`;
		// WEBAR SDK가 아래로 오게 하기 위해 position과 z-index를 400 조정
		app.style.position = 'fixed';
		app.style.zIndex = '400';
	};
	// <script>를 로드 후, head태그에 추가하는 function.
	const loadScript = (url, callback) => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState) {  // IE Browser
			script.onreadystatechange = function () {
				if (script.readyState === "loaded" || script.readyState === "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  // Others Browser
			script.onload = function () {
				callback();
			};
		}
		script.src = url; //  스크립트 Loading
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	let isStarted = false;
	loadScript("./letsee.js", () => {
		letsee.init();
		letsee.ready(() => {
			letsee.start();
			const entity = {
				image : 'assets/bts.png',
				name : 'LetseeSticker',
				size : {
					depth: 200, height: 200, unit: 'mm', width: 140,
				},
				uri : 'bts',
			};

			window.entity = entity;
			store.dispatch(addEntity(entity));
		});


		letsee.onTrackStart(() => {
			store.dispatch(startTrackEntity(window.entity));
			store.dispatch(startLoading());
			isStarted = true;
		});

		letsee.onTrackEnd(() => {
			if (isStarted) {
				const entity = {
					image : 'assets/bts.json',
					name : 'LetseeSticker',
					size : {
						depth: 200, height: 200, unit: 'mm', width: 140,
					},
					uri : 'asset/bts',

				};
				store.dispatch(endTrackEntity(entity));
				store.dispatch(stopLoading());
				isStarted = false;
			}
		});
	});

	window.addEventListener('resize', handleWindowResize);
	handleWindowResize();

	// TODO: 렛시의 onLoad 이벤트로 바꿔주기.
	window.addEventListener('letsee.load', () => {
		store.dispatch(letseeLoad());
		// 초기 유저 설정부분 제거 => 임의의 유저로 새로 currentUser 생성
		store.dispatch(setCurrentUser({
			firstname: 'WEBARSDK-JUNGWOO',
			lastname: 'TEST',
			uid: "jjjjjw910911-010-6284-8051",
		}));
	});

	render(
		<Provider store={store}>
			<Router {...renderProps} />
		</Provider>,
		app,
	);
});
