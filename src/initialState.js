// @flow
export default {
  letseeLoaded: false,
  currentEntity: null,
  currentUser: null,
  entities: {
    byUri: {},
    allUris: [],
  },
  messageForm: null,
  selectedSticker: null,
  stickers: {
    byId: {},
    allIds: [],
  },
  kakaoLinkModal: null,
  helpOpened: false,
};
