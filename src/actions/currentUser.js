// @flow
import type { MessageAuthor } from '../types';

export const SET_CURRENT_USER: 'SET_CURRENT_USER' = 'SET_CURRENT_USER';
export const SET_CURRENT_USER_SUCCESS: 'SET_CURRENT_USER_SUCCESS' = 'SET_CURRENT_USER_SUCCESS';
export const SET_CURRENT_USER_ERROR: 'SET_CURRENT_USER_ERROR' = 'SET_CURRENT_USER_ERROR';

export const setCurrentUser = (user: MessageAuthor | null) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserSuccess = (user: MessageAuthor | null) => ({
  type: SET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_ERROR,
  meta: {
    error,
  },
});
