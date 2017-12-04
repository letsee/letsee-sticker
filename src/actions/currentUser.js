// @flow
import type { User } from '../types';

export const SET_CURRENT_USER: 'SET_CURRENT_USER' = 'SET_CURRENT_USER';
export const SET_CURRENT_USER_SUCCESS: 'SET_CURRENT_USER_SUCCESS' = 'SET_CURRENT_USER_SUCCESS';
export const SET_CURRENT_USER_ERROR: 'SET_CURRENT_USER_ERROR' = 'SET_CURRENT_USER_ERROR';

export const setCurrentUser = (user: { uid: string, firstname: string, lastname: string } | null) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserSuccess = (user: User | null) => ({
  type: SET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_ERROR,
  meta: {
    error,
  },
});
