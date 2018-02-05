// @flow
import {
  SET_CURRENT_USER,
} from '../actions';
import type { MessageAuthor } from '../types';

/**
 * reducer for currently logged in user
 */
const currentUser = (state: MessageAuthor | null = null, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default currentUser;
