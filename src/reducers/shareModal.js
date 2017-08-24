// @flow
import {
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
} from '../actions';
import type { ShareModal } from '../types';

const shareModal = (state: ShareModal | null = null, action) => {
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
