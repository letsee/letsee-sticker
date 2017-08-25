// @flow
export const SET_PUBLIC: 'SET_PUBLIC' = 'SET_PUBLIC';
export const SET_COUNT: 'SET_COUNT' = 'SET_COUNT';
export const SET_FIRST_CURSOR: 'SET_FIRST_CURSOR' = 'SET_FIRST_CURSOR';
export const SET_LAST_CURSOR: 'SET_LAST_CURSOR' = 'SET_LAST_CURSOR';
export const SET_CURRENT_CURSOR: 'SET_CURRENT_CURSOR' = 'SET_CURRENT_CURSOR';

export const setPublic = (isPublic: boolean) => ({
  type: SET_PUBLIC,
  payload: isPublic,
});

export const setCount = (count: number) => ({
  type: SET_COUNT,
  payload: count,
});

export const setFirstCursor = (messageId: string | null) => ({
  type: SET_FIRST_CURSOR,
  payload: messageId,
});

export const setLastCursor = (messageId: string | null) => ({
  type: SET_LAST_CURSOR,
  payload: messageId,
});

export const setCurrentCursor = (messageId: string | null) => ({
  type: SET_CURRENT_CURSOR,
  payload: messageId,
});
