// @flow
import {
  LETSEE_LOADED,
  START_LOADING,
  STOP_LOADING,
} from '../actions';

export const letseeLoaded = (state: boolean = false, action) => {
  switch (action.type) {
    case LETSEE_LOADED:
      return true;
    default:
      return state;
  }
};

export const loadingEntity = (state: boolean = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      return state;
  }
};
