// @flow
export const OPEN_SHARE_MODAL: 'OPEN_SHARE_MODAL' = 'OPEN_SHARE_MODAL';
export const CLOSE_SHARE_MODAL: 'CLOSE_SHARE_MODAL' = 'CLOSE_SHARE_MODAL';
export const URL_COPY: 'URL_COPY' = 'URL_COPY';

export const openShareModal = (messageId: string, authorName: string, entityName: string) => ({
  type: OPEN_SHARE_MODAL,
  payload: {
    messageId,
    authorName,
    entityName,
  },
});

export const closeShareModal = () => ({ type: CLOSE_SHARE_MODAL });
export const urlCopy = () => ({ type: URL_COPY });
