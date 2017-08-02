// @flow
import {
  START_TRACK_ENTITY,
  END_TRACK_ENTITY,
} from '../actions';

const currentEntity = (state: string | null = null, action) => {
  switch (action.type) {
    case START_TRACK_ENTITY:
      if (state === null) {
        return action.payload.uri;
      }

      return state;
    case END_TRACK_ENTITY:
      if (state === action.payload.uri) {
        return null;
      }

      return state;
    default:
      return state;
  }
};

export default currentEntity;
