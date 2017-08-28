// @flow
export type SwipeGuide = {
  isShowing: boolean,
  wasShown: boolean,
};

export const swipeGuide: SwipeGuide = {
  isShowing: false,
  wasShown: false,
};

export default {
  letseeLoaded: false,
  loadingEntity: false,
  currentEntity: null,
  currentUser: null,
  entities: {
    byUri: {},
    allUris: [],
  },
  messageForm: null,
  messagesList: null,
  selectedSticker: null,
  shareModal: null,
  swipeGuide,
  transformationGuideOpened: false,
  helpOpened: false,
};
