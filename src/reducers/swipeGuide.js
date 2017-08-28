// @flow
import {
  SHOW_SWIPE_GUIDE,
  HIDE_SWIPE_GUIDE,
} from '../actions';
import { swipeGuide as initialState } from '../initialState';
import type { SwipeGuide as SwipeGuideType } from '../initialState';

const swipeGuide = (state: SwipeGuideType = initialState, action): SwipeGuideType => {
  switch (action.type) {
    case SHOW_SWIPE_GUIDE:
      if (!state.wasShown) {
        return {
          isShowing: true,
          wasShown: true,
        };
      }

      return state;
    case HIDE_SWIPE_GUIDE:
      return {
        ...state,
        isShowing: false,
      };
    default:
      return state;
  }
};

export default swipeGuide;
