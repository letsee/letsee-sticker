// @flow
import type { MessageWithId } from '../types';

export const SET_PUBLIC: 'SET_PUBLIC' = 'SET_PUBLIC';
export const SET_COUNT: 'SET_COUNT' = 'SET_COUNT';
export const SET_FIRST_CURSOR: 'SET_FIRST_CURSOR' = 'SET_FIRST_CURSOR';
export const SET_LAST_CURSOR: 'SET_LAST_CURSOR' = 'SET_LAST_CURSOR';
export const SET_CURRENT_CURSOR: 'SET_CURRENT_CURSOR' = 'SET_CURRENT_CURSOR';
export const SET_CURRENT_MESSAGE: 'SET_CURRENT_MESSAGE' = 'SET_CURRENT_MESSAGE';
export const FETCH_PREV: 'FETCH_PREV' = 'FETCH_PREV';
export const FETCH_NEXT: 'FETCH_NEXT' = 'FETCH_NEXT';
export const SET_CURRENT_COUNT: 'SET_CURRENT_COUNT' = 'SET_CURRENT_COUNT';


export const setPublic = (isPublic: boolean) => ({
  type: SET_PUBLIC,
  payload: isPublic,
});

export const setCount = (count: number) => ({
  type: SET_COUNT,
  payload: count,
});

export const setCurrentCount = (count: number) => ({
  type: SET_CURRENT_COUNT,
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

export const setCurrentMessage = (message: MessageWithId | null) => ({
  type: SET_CURRENT_MESSAGE,
  payload: {
    message,
  },
});

export const getMessageList = () => ({
  type: GET_MESSAGE_LIST,
});

export const fetchPrev = () => ({ type: FETCH_PREV });
export const fetchNext = () => ({ type: FETCH_NEXT });
