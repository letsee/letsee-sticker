// @flow
import {
  SELECT_MESSAGE,
  DESELECT_MESSAGE,
  DELETE_MESSAGE,
} from '../actions';

const selectedMessage = (state: string | null = null, action) => {
  switch (action.type) {
    case SELECT_MESSAGE:
      if (state === null) {
        return action.payload;
      }

      return state;
    case DESELECT_MESSAGE:
      if (state === action.payload) {
        return null;
      }

      return state;
    case DELETE_MESSAGE:
      if (state === action.payload.id) {
        return null;
      }

      return state;
    default:
      return state;
  }
};

export default selectedMessage;
