// @flow
import { combineReducers } from 'redux';
import zipObject from 'lodash/zipObject';
import {
  ADD_STICKER,
  DELETE_STICKER,
  TRANSLATE_STICKER,
  ROTATE_STICKER,
  SCALE_STICKER,
  TRANSFORM_STICKER,
  SELECT_STICKER,
  DESELECT_STICKER,
  CLEAR_MESSAGE_FORM,
} from '../actions';

const sticker = (state = null, action) => {
  switch (action.type) {
    case ADD_STICKER:
      return {
        ...action.payload,
        selected: false,
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
      if (state !== null) {
        return {
          ...state,
          ...action.payload,
        };
      }

      return state;
    case TRANSFORM_STICKER:
      if (state !== null) {
        return {
          ...state,
          ...action.payload.transform,
        };
      }

      return state;
    case SELECT_STICKER:
      if (state !== null) {
        return {
          ...state,
          selected: true,
        };
      }

      return state;
    case DESELECT_STICKER:
      if (state !== null) {
        return {
          ...state,
          selected: false,
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
    case TRANSLATE_STICKER:
    case ROTATE_STICKER:
    case SCALE_STICKER:
    case TRANSFORM_STICKER:
    case SELECT_STICKER:
    case DESELECT_STICKER:
      return {
        ...state,
        [action.payload.id]: sticker(state[action.payload.id], action),
      };
    case CLEAR_MESSAGE_FORM:
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
    case CLEAR_MESSAGE_FORM:
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
