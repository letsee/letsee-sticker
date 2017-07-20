// @flow
import { combineReducers } from 'redux';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import { letseeLoaded } from './letsee';
import messages from './messages';
import selectedMessage from './selectedMessage';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  letseeLoaded,
  messages,
  selectedMessage,
});

export default reducers;
