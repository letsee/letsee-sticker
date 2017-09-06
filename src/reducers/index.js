// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import client from '../client';
import currentUser from './currentUser';
import entities from './entities';
import helpOpened from './helpOpened';
import shareModal from './shareModal';
import { letseeLoaded, loadingEntity } from './letsee';
import messageForm from './messageForm';
import messagesList from './messagesList';
import selectedSticker from './selectedSticker';
import transformationGuideOpened from './transformationGuideOpened';

const reducers = combineReducers({
  currentUser,
  entities,
  helpOpened,
  shareModal,
  letseeLoaded,
  loadingEntity,
  messageForm,
  messagesList,
  selectedSticker,
  transformationGuideOpened,
  apollo: client.reducer(),
  firebase: firebaseStateReducer,
  routing: routerReducer,
});

export default reducers;
