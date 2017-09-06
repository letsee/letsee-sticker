// @flow
import { combineReducers } from 'redux';
import {
  FETCH_ENTITY,
  FETCH_ENTITY_SUCCESS,
  END_TRACK_ENTITY,
} from '../actions';

const entity = (state = null, action) => {
  switch (action.type) {
    case FETCH_ENTITY:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_ENTITY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const byUri = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ENTITY:
    case FETCH_ENTITY_SUCCESS:
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
    case FETCH_ENTITY:
    case FETCH_ENTITY_SUCCESS:
      if (state.findIndex(uri => uri === action.payload.uri) < 0) {
        return [
          ...state,
          action.payload.uri,
        ];
      }

      return state;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ENTITY_SUCCESS:
      return {
        ...state,
        [action.payload.id]: entity(state[action.payload.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state: string[] = [], action): string[] => {
  switch (action.type) {
    case FETCH_ENTITY_SUCCESS:
      if (state.findIndex(id => id === action.payload.id) < 0) {
        return [
          ...state,
          action.payload.id,
        ];
      }

      return state;
    default:
      return state;
  }
};

const current = (state = null, action) => {
  switch (action.type) {
    case FETCH_ENTITY:
      if (state === null || state.uri === action.payload.uri) {
        return {
          ...state,
          ...action.payload,
        };
      }

      return state;
    case FETCH_ENTITY_SUCCESS:
      if (state !== null && state.uri === action.payload.uri) {
        return action.payload;
      }

      return state;
    case END_TRACK_ENTITY:
      if (state !== null && state.uri === action.payload.uri) {
        return null;
      }

      return state;
    default:
      return state;
  }
};

const entities = combineReducers({
  byId,
  allIds,
  byUri,
  allUris,
  current,
});

export default entities;
