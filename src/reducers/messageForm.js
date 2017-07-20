// @flow
import {
  INIT_MESSAGE_FORM,
  DESTROY_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM_SUCCESS,
  SUBMIT_MESSAGE_FORM_ERROR,
} from '../actions';

const messageForm = (state = null, action) => {
  switch (action.type) {
    case INIT_MESSAGE_FORM:
      if (state === null) {
        return {
          ...action.payload,
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
