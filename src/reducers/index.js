// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import client from '../client';
import currentUser from './currentUser';
import entities from './entities';
import { letseeLoaded, loadingEntity } from './letsee';
import messageForm from './messageForm';
import messagesList from './messagesList';
import selectedSticker from './selectedSticker';

const reducers = combineReducers({
  currentUser,
  entities,
  letseeLoaded,
  loadingEntity,
  messageForm,
  messagesList,
  selectedSticker,
  apollo: client.reducer(),
  firebase: firebaseStateReducer,
  routing: routerReducer,
});

export default reducers;
