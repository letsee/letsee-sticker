// @flow
export const messagesList = {
  public: true,
  loading: true,
  empty: true,
  error: false,
  count: 0,
  first: null,
  last: null,
  current: null,
  message: null,
  entityUri: null,
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
  messagesList,
  selectedSticker: null,
  shareModal: null,
  transformationGuideOpened: false,
  helpOpened: false,
  isFirstTrack:false
};
