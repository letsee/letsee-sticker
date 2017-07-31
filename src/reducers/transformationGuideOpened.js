// @flow
import {
  OPEN_TRANSFORMATION_GUIDE,
  CLOSE_TRANSFORMATION_GUIDE,
} from '../actions';

const transformationGuideOpened = (state: boolean = false, action) => {
  switch (action.type) {
    case OPEN_TRANSFORMATION_GUIDE:
      return true;
    case CLOSE_TRANSFORMATION_GUIDE:
      return false;
    default:
      return state;
  }
};

export default transformationGuideOpened;
