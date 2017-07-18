// @flow
import { combineReducers } from 'redux';
import entities from './entities';
import messages from './messages';
import selectedMessage from './selectedMessage';

const reducers = combineReducers({
  entities,
  messages,
  selectedMessage,
});

export default reducers;
