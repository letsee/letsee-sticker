// @flow
import {
  OPEN_KAKAO_LINK_MODAL,
  CLOSE_KAKAO_LINK_MODAL,
} from '../actions';

const kakaoLinkModal = (state = null, action) => {
  switch (action.type) {
    case OPEN_KAKAO_LINK_MODAL:
      return action.payload;
    case CLOSE_KAKAO_LINK_MODAL:
      return null;
    default:
      return state;
  }
};

export default kakaoLinkModal;
