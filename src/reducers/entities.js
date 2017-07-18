// @flow
import { combineReducers } from 'redux';
import {
  ADD_ENTITY,
  DELETE_ENTITY,
} from '../actions';

const entity = (state = null, action) => {
  switch (action.type) {
    case ADD_ENTITY:
      return {
        ...action.payload,
      };
    case DELETE_ENTITY:
      return null;
    default:
      return state;
  }
};

const byUri = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTITY:
    case DELETE_ENTITY:
      return {
        ...state,
        [action.payload.uri]: entity(state[action.payload.uri], action),
      };
    default:
      return state;
  }
};

const allUris = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTITY:
      return [
        ...state,
        action.payload.uri,
      ];
    case DELETE_ENTITY:
      const index = state.findIndex(uri => uri === action.payload.uri);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
};

const entities = combineReducers({
  byUri,
  allUris,
});

export default entities;
