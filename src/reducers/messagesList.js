// @flow
import {
  START_TRACK_ENTITY,
  END_TRACK_ENTITY,
  SET_PUBLIC,
  SET_COUNT,
  SET_FIRST_CURSOR,
  SET_LAST_CURSOR,
  SET_CURRENT_CURSOR,
  SET_CURRENT_USER,
} from '../actions';
import type { MessagesList } from '../types';

const messagesList = (state: MessagesList | null = null, action): MessagesList | null => {
  switch (action.type) {
    case START_TRACK_ENTITY:
      if (state === null) {
        return {
          entityUri: action.payload.uri,
          public: true,
          loading: true,
          empty: true,
          error: false,
          count: 0,
          first: null,
          last: null,
          current: null,
        };
      }

      return state;
    case END_TRACK_ENTITY:
      if (state !== null && state.entityUri === action.payload.uri) {
        return null;
      }

      return state;
    case SET_CURRENT_USER:
      if (state !== null && action.payload === null) {
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
        };
      }

      return state;
    case SET_PUBLIC:
      if (state !== null && state.public !== action.payload) {
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
        };
      }

      return state;
    case SET_COUNT:
      if (state !== null) {
        return {
          ...state,
          empty: action.payload === 0,
          count: action.payload,
        };
      }

      return state;
    case SET_FIRST_CURSOR:
      if (state !== null) {
        return {
          ...state,
          empty: action.payload === null,
          first: action.payload,
        };
      }

      return state;
    case SET_LAST_CURSOR:
      if (state !== null) {
        return {
          ...state,
          empty: action.payload === null,
          last: action.payload,
          current: state.current === null ? action.payload : state.current,
        };
      }

      return state;
    case SET_CURRENT_CURSOR:
      if (state !== null) {
        return {
          ...state,
          current: action.payload === null ? state.last : action.payload,
        };
      }

      return state;
    default:
      return state;
  }
};

export default messagesList;