// @flow
import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import kakaoLinkModal from './kakaoLinkModal';
import { letseeLoaded } from './letsee';
import messageForm from './messageForm';
import selectedSticker from './selectedSticker';
import stickers from './stickers';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  kakaoLinkModal,
  letseeLoaded,
  messageForm,
  selectedSticker,
  stickers,
  firebase: firebaseStateReducer,
});

export default reducers;
