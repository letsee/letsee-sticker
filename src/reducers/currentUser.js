// @flow
import {
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERROR,
} from '../actions';
import type { User } from '../types';

const currentUser = (state: User | null = null, action) => {
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
