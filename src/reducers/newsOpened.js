// @flow
import {
  OPEN_NEWS,
  CLOSE_NEWS,
} from '../actions';

const newsOpened = (state: boolean = false, action) => {
  switch (action.type) {
    case OPEN_NEWS:
      return true;
    case CLOSE_NEWS:
      return false;
    default:
      return state;
  }
};

export default newsOpened;
