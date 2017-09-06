// @flow
import { combineReducers } from 'redux';
import {
  ADD_ENTITY,
  DELETE_ENTITY,
} from '../actions';

const entity = (state = null, action) => {
  switch (action.type) {
    case ADD_ENTITY:
      return action.payload;
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

const allUris = (state: string[] = [], action): string[] => {
  switch (action.type) {
    case ADD_ENTITY:
      if (state.findIndex(uri => uri === action.payload.uri) < 0) {
        return [
          ...state,
          action.payload.uri,
        ];
      }

      return state;
    case DELETE_ENTITY:
      return state.filter(uri => uri !== action.payload.uri);
    default:
      return state;
  }
};

const entities = combineReducers({
  byUri,
  allUris,
});

export default entities;
