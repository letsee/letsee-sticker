// @flow
export const SELECT_MESSAGE: 'SELECT_MESSAGE' = 'SELECT_MESSAGE';
export const DESELECT_MESSAGE: 'DESELECT_MESSAGE' = 'DESELECT_MESSAGE';

export const selectMessage = (id: string) => ({
  type: SELECT_MESSAGE,
  payload: id,
});

export const deselectMessage = (id: string) => ({
  type: DESELECT_MESSAGE,
  payload: id,
});
