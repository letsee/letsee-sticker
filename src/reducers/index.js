// @flow
import { combineReducers } from 'redux';
import entities from './entities';
import messages from './messages';

const reducers = combineReducers({
  entities,
  messages,
});

export default reducers;
