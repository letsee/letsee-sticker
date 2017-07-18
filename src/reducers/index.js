// @flow
import { combineReducers } from 'redux';
import currentEntity from './currentEntity';
import entities from './entities';
import messages from './messages';
import selectedMessage from './selectedMessage';

const reducers = combineReducers({
  currentEntity,
  entities,
  messages,
  selectedMessage,
});

export default reducers;
