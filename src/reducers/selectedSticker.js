// @flow
import {
  ADD_STICKER,
  SELECT_STICKER,
  DESELECT_STICKER,
  DELETE_STICKER,
} from '../actions';

/**
 * reducer for currently selected sticker
 */
const selectedSticker = (state: string | null = null, action) => {
  switch (action.type) {
    case ADD_STICKER:
      if (action.payload.selected) {
        return action.payload.id;
      }

      return state;
    case SELECT_STICKER:
      if (state === null) {
        return action.payload.id;
      }

      return state;
    case DESELECT_STICKER:
      if (state === action.payload.id) {
        return null;
      }

      return state;
    case DELETE_STICKER:
      if (state === action.payload.id) {
        return null;
      }

      return state;
    default:
      return state;
  }
};

export default selectedSticker;
