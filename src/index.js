/* eslint-disable import/first */
// @flow
require('es6-promise').polyfill();
require('isomorphic-fetch');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// 브라우저 히스토리 => 해시히스토리 : 해시히스토리를 사용해야 웹에서 돌아감.
import { match, Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import styled from 'styled-components';
import store from './store';
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

const history = syncHistoryWithStore(hashHistory, store);
// 서버사이드 렌더링..
match({ history, routes }, (err, redirect, renderProps) => {
	Kakao.init('e1444fec00fc98732916741894eee22f');
	const app = document.getElementById('app');
	const handleWindowResize = () => {
		console.log('윈도우 리사이즈.~');
		app.style.width = `${document.documentElement.clientWidth}px`;
		app.style.height = `${document.documentElement.clientHeight}px`;
		// WEBAR SDK가 아래로 오게 하기 위해 position과 z-index를 400 조정
		app.style.position = 'fixed';
		app.style.zIndex = '400';
	};

	/**
	 * 렛시 0.9.20버전의 스크립트를 삽입
	 * 이후 이벤트를 dispatch함.
	 */
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
		});

		letsee.onTrackStart((e) => {
			// letsee.resume();
			console.warn(e);
			const entity = {
				image : 'assets/bts.png',
				name : '',
				size : {
					depth: 200, height: 200, unit: 'mm', width: 140,
				},
				uri : 'bts',
			};

			store.dispatch(addEntity(entity));
			// store.dispatch(startTrackEntity(entity));

			isStarted = true;
		});

		letsee.onTrackEnd((e) => {
			// letsee.pause();
			if (isStarted) {
				const entity = {
					image : 'assets/bts.json',
					name : '',
					size : {
						depth: 200, height: 200, unit: 'mm', width: 140,
					},
					uri : 'asset/bts',

				};
				store.dispatch(endTrackEntity(entity));
				isStarted = false;
			}
		});
	});

	window.addEventListener('resize', handleWindowResize);
	handleWindowResize();
	// TODO: 렛시의 onLoad 이벤트로 바꿔주기.
	window.addEventListener('letsee.load', () => {
		store.dispatch(letseeLoad());

		// 초기 유저 설정부분 제거 => 임의의 유저로 새로 currentUser생성
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
