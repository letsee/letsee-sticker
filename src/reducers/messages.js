// @flow
import { combineReducers } from 'redux';
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  TRANSLATE_MESSAGE,
  ROTATE_MESSAGE,
  SCALE_MESSAGE,
} from '../actions';

const message = (state = null, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...action.payload,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: 1,
      };
    case DELETE_MESSAGE:
      return null;
    case TRANSLATE_MESSAGE:
    case ROTATE_MESSAGE:
    case SCALE_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
    case DELETE_MESSAGE:
    case TRANSLATE_MESSAGE:
    case ROTATE_MESSAGE:
    case SCALE_MESSAGE:
      return {
        ...state,
        [action.payload.id]: message(state[action.payload.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        action.payload.id,
      ];
    case DELETE_MESSAGE:
      const index = state.findIndex(id => id === action.payload.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
};

const messages = combineReducers({
  byId,
  allIds,
});

export default messages;
