// @flow
import {
  OPEN_HELP,
  CLOSE_HELP,
} from '../actions';

const helpOpened = (state: boolean = false, action) => {
  switch (action.type) {
    case OPEN_HELP:
      return true;
    case CLOSE_HELP:
      return false;
    default:
      return state;
  }
};

export default helpOpened;
