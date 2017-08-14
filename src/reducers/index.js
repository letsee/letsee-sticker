// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import shareModal from './shareModal';
import { letseeLoaded, loadingEntity } from './letsee';
import messageForm from './messageForm';
import selectedSticker from './selectedSticker';
import stickers from './stickers';
import transformationGuideOpened from './transformationGuideOpened';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  shareModal,
  letseeLoaded,
  loadingEntity,
  messageForm,
  selectedSticker,
  stickers,
  transformationGuideOpened,
  firebase: firebaseStateReducer,
  routing: routerReducer,
});

export default reducers;
