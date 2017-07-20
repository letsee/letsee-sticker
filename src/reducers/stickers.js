// @flow
import { combineReducers } from 'redux';
import {
  ADD_STICKER,
  DELETE_STICKER,
  TRANSLATE_STICKER,
  ROTATE_STICKER,
  SCALE_STICKER,
} from '../actions';

const message = (state = null, action) => {
  switch (action.type) {
    case ADD_STICKER:
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
    case DELETE_STICKER:
      return null;
    case TRANSLATE_STICKER:
    case ROTATE_STICKER:
    case SCALE_STICKER:
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
    case ADD_STICKER:
    case DELETE_STICKER:
    case TRANSLATE_STICKER:
    case ROTATE_STICKER:
    case SCALE_STICKER:
      return {
        ...state,
        [action.payload.id]: message(state[action.payload.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  let index;

  switch (action.type) {
    case ADD_STICKER:
      return [
        ...state,
        action.payload.id,
      ];
    case DELETE_STICKER:
      index = state.findIndex(id => id === action.payload.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
};

const stickers = combineReducers({
  byId,
  allIds,
});

export default stickers;
