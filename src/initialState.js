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
  shareModal: null,
  helpOpened: false,
  newsOpened: false,
  transformationGuideOpened: false,
};
