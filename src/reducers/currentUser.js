// @flow
import {
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
} from '../actions';
import type { MessageAuthor } from '../types';

const currentUser = (state: MessageAuthor | null = null, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_SUCCESS:
      return action.payload;
    case SET_CURRENT_USER_ERROR:
      return null;
    default:
      return state;
  }
};

export default currentUser;
