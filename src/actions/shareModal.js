// @flow
export const OPEN_SHARE_MODAL: 'OPEN_SHARE_MODAL' = 'OPEN_SHARE_MODAL';
export const CLOSE_SHARE_MODAL: 'CLOSE_SHARE_MODAL' = 'CLOSE_SHARE_MODAL';

export const openShareModal = (entityUri: string, path: string[]) => ({
  type: OPEN_SHARE_MODAL,
  payload: {
    entityUri,
    path,
  },
});

export const closeShareModal = () => ({ type: CLOSE_SHARE_MODAL });
