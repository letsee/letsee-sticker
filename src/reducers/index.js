// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import helpOpened from './helpOpened';
import kakaoLinkModal from './kakaoLinkModal';
import { letseeLoaded } from './letsee';
import messageForm from './messageForm';
import selectedSticker from './selectedSticker';
import stickers from './stickers';
import transformationGuideOpened from './transformationGuideOpened';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  helpOpened,
  kakaoLinkModal,
  letseeLoaded,
  messageForm,
  selectedSticker,
  stickers,
  transformationGuideOpened,
  firebase: firebaseStateReducer,
  routing: routerReducer,
});

export default reducers;
