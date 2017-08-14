// @flow
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
  selectedSticker: null,
  stickers: {
    byId: {},
    allIds: [],
  },
  shareModal: null,
  transformationGuideOpened: false,
};
