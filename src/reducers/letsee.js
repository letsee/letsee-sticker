// @flow
import {
  LETSEE_LOADED,
} from '../actions';

export const letseeLoaded = (state: boolean = false, action) => {
  switch (action.type) {
    case LETSEE_LOADED:
      return true;
    default:
      return state;
  }
};
