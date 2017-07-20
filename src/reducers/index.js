// @flow
import { combineReducers } from 'redux';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import { letseeLoaded } from './letsee';
import stickers from './stickers';
import selectedSticker from './selectedSticker';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  letseeLoaded,
  stickers,
  selectedSticker,
});

export default reducers;
