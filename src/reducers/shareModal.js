// @flow
import {
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL, URL_COPY,
} from '../actions';
import type { ShareModal } from '../types';

const shareModal = (state: ShareModal | null = null, action) => {
  switch (action.type) {
    case OPEN_SHARE_MODAL:
      // return action.payload;
      return false;
    case CLOSE_SHARE_MODAL:
      return false;
    case URL_COPY:
      return true;
    default:
      return state;
  }
};

export default shareModal;
