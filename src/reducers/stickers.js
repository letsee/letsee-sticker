// @flow
import { combineReducers } from 'redux';
import zipObject from 'lodash/zipObject';
import {
  ADD_STICKER,
  DELETE_STICKER,
  TRANSFORM_STICKER,
  DESTROY_MESSAGE_FORM,
} from '../actions';

const sticker = (state = null, action) => {
  switch (action.type) {
    case ADD_STICKER:
      const { selected, ...other } = action.payload;

      return {
        ...other,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        quaternion: {
          x: 0,
          y: 0,
          z: 0,
          w: 1,
        },
        scale: 1,
      };
    case DELETE_STICKER:
      return null;
    case TRANSFORM_STICKER:
      if (state !== null) {
        return {
          ...state,
          ...action.payload.transform,
        };
      }

      return state;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_STICKER:
    case DELETE_STICKER:
    case TRANSFORM_STICKER:
      return {
        ...state,
        [action.payload.id]: sticker(state[action.payload.id], action),
      };
    case DESTROY_MESSAGE_FORM:
      return {
        ...state,
        ...zipObject(action.payload.stickerIds, action.payload.stickerIds.map(() => null)),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  let index;
  let stickerIds;

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
    case DESTROY_MESSAGE_FORM:
      stickerIds = action.payload.stickerIds;
      return state.filter(id => stickerIds.indexOf(id) < 0);
    default:
      return state;
  }
};

const stickers = combineReducers({
  byId,
  allIds,
});

export default stickers;
