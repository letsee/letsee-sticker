// @flow
import type { MessageAuthor } from '../types';

export const SET_CURRENT_USER: 'SET_CURRENT_USER' = 'SET_CURRENT_USER';

export const setCurrentUser = (user: MessageAuthor | null) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
