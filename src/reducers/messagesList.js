// @flow
import {
  START_TRACK_ENTITY,
  END_TRACK_ENTITY,
  SET_PUBLIC,
  SET_COUNT,
  SET_FIRST_CURSOR,
  SET_LAST_CURSOR,
  SET_CURRENT_CURSOR,
  SET_CURRENT_MESSAGE,
  SET_CURRENT_USER,
  FETCH_PREV,
  FETCH_NEXT, SET_CURRENT_PAGE_COUNT, SET_CURRENT_COUNT
} from '../actions';
import { messagesList as initialState } from '../initialState';
import type { MessagesList } from '../types';

const messagesList = (state: MessagesList = initialState, action): MessagesList | null => {
  switch (action.type) {
    case START_TRACK_ENTITY:
      if (state.entityUri !== action.payload.uri) {
        return {
          ...initialState,
          entityUri: action.payload.uri,
        };
      }

      return state;
    case END_TRACK_ENTITY:
      if (state.entityUri === action.payload.uri) {
        return {
          ...initialState,
          public: state.public,
          entityUri: state.entityUri,
          current: state.current,
        };
      }

      return state;
    case SET_CURRENT_USER:
      if (state.entityUri !== null && action.payload === null) {
        return {
          ...state,
          public: true,
          loading: true,
          empty: true,
          error: false,
          count: 0,
          first: null,
          last: null,
          current: null,
          message: null,
        };
      }

      return state;
    case SET_PUBLIC:
      if (state.entityUri !== null && state.public !== action.payload) {
        return {
          ...state,
          public: action.payload,
          loading: true,
          empty: true,
          error: false,
          count: 0,
          first: null,
          last: null,
          current: null,
          message: null,
        };
      }

      return state;
    case SET_COUNT:
      if (state.entityUri !== null) {
        return {
          ...state,
          empty: action.payload === 0,
          count: action.payload,
        };
      }

      return state;

    case SET_CURRENT_COUNT:
      if (state.entityUri !== null) {
        return {
          ...state,
          currentCount: action.payload
        };
      }
      return state;
    case SET_FIRST_CURSOR:
      if (state.entityUri !== null) {
        return {
          ...state,
          loading: action.payload === null ? false : state.loading,
          empty: action.payload === null,
          first: action.payload,
        };
      }

      return state;
    case SET_LAST_CURSOR:
      if (state.entityUri !== null) {
        return {
          ...state,
          loading: action.payload === null ? false : state.loading,
          empty: action.payload === null,
          last: action.payload,
          current: state.current === null ? action.payload : state.current,
        };
      }

      return state;
    case SET_CURRENT_CURSOR:
      if (state.entityUri !== null) {
        return {
          ...state,
          loading: action.payload === null && state.last === null ? false : state.loading,
          current: action.payload === null ? state.last : action.payload,
          // message: null,
        };
      }

      return state;
    case FETCH_PREV:
      if (state.entityUri !== null) {
        return {
          ...state,
          currentCount: state.currentCount + 1,
          loading: true,
          error: false,
        };
      }

      return state;
    case FETCH_NEXT:
      if (state.entityUri !== null) {
        return {
          ...state,
          currentCount: state.currentCount - 1,
          loading: true,
          error: false,
        };
      }

      return state;
    case SET_CURRENT_MESSAGE:
      if (state.entityUri !== null) {
        return {
          ...state,
          loading: false,
          message: action.payload.message,
          error: false,
        };
      }

      return state;
    default:
      return state;
  }
};

export default messagesList;
