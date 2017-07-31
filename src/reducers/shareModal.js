// @flow
import {
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
} from '../actions';

const shareModal = (state = null, action) => {
  switch (action.type) {
    case OPEN_SHARE_MODAL:
      return action.payload;
    case CLOSE_SHARE_MODAL:
      return null;
    default:
      return state;
  }
};

export default shareModal;
