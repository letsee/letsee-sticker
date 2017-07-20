// @flow
import {
  SELECT_STICKER,
  DESELECT_STICKER,
  DELETE_STICKER,
} from '../actions';

const selectedSticker = (state: string | null = null, action) => {
  switch (action.type) {
    case SELECT_STICKER:
      if (state === null) {
        return action.payload;
      }

      return state;
    case DESELECT_STICKER:
      if (state === action.payload) {
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
