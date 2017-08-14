// @flow
import {
  DESTROY_MESSAGE_FORM,
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
} from '../actions';

const shareModal = (state = null, action) => {
  switch (action.type) {
    case OPEN_SHARE_MODAL:
      return action.payload;
    case CLOSE_SHARE_MODAL:
      return null;
    case DESTROY_MESSAGE_FORM:
      if (state !== null && action.payload.uri === state.entityUri) {
        return null;
      }

      return state;
    default:
      return state;
  }
};

export default shareModal;
