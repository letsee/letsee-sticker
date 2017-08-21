// @flow
import {
  INIT_MESSAGE_FORM,
  DESTROY_MESSAGE_FORM,
  SET_MESSAGE_PRIVACY,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM_SUCCESS,
  SUBMIT_MESSAGE_FORM_ERROR,
} from '../actions';

type MessageFormType = {
  uri: string,
  public: boolean,
  path: string[],
  submitting: boolean,
  submitted: boolean,
} | null;

const messageForm = (state: MessageFormType = null, action) => {
  switch (action.type) {
    case INIT_MESSAGE_FORM:
      if (state === null) {
        return {
          ...action.payload,
          public: true,
          path: [],
          submitting: false,
          submitted: false,
        };
      }

      return state;
    case DESTROY_MESSAGE_FORM:
      if (state !== null && state.uri === action.payload.uri) {
        return null;
      }

      return state;
    case SET_MESSAGE_PRIVACY:
      if (state !== null && state.uri === action.payload.uri) {
        return {
          ...state,
          public: action.payload.public,
        };
      }

      return state;
    case SUBMIT_MESSAGE_FORM:
      if (state !== null && state.uri === action.payload.uri) {
        return {
          ...state,
          submitting: true,
          submitted: false,
        };
      }

      return state;
    case SUBMIT_MESSAGE_FORM_SUCCESS:
      if (state !== null && state.uri === action.payload.uri) {
        return {
          ...state,
          path: action.payload.path,
          submitting: false,
          submitted: true,
        };
      }

      return state;
    case SUBMIT_MESSAGE_FORM_ERROR:
      if (state !== null && state.uri === action.payload.uri) {
        return {
          ...state,
          submitting: false,
          submitted: false,
        };
      }

      return state;
    default:
      return state;
  }
};

export default messageForm;
