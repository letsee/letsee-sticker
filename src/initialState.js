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
  currentUser: null,
  entities: {
    current: null,
    byUri: {},
    allUris: [],
    byId: {},
    allIds: [],
  },
  messageForm: null,
  messagesList,
  selectedSticker: null,
  shareModal: null,
  transformationGuideOpened: false,
  helpOpened: false,
};
