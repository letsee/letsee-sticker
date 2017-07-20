// @flow
import { combineReducers } from 'redux';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import { letseeLoaded } from './letsee';
import messageForm from './messageForm';
import selectedSticker from './selectedSticker';
import stickers from './stickers';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  letseeLoaded,
  messageForm,
  selectedSticker,
  stickers,
});

export default reducers;
