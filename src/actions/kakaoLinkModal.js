// @flow
export const OPEN_KAKAO_LINK_MODAL: 'OPEN_KAKAO_LINK_MODAL' = 'OPEN_KAKAO_LINK_MODAL';
export const CLOSE_KAKAO_LINK_MODAL: 'CLOSE_KAKAO_LINK_MODAL' = 'CLOSE_KAKAO_LINK_MODAL';

export const openKakaoLinkModal = (entityUri: string, path: string[]) => ({
  type: OPEN_KAKAO_LINK_MODAL,
  payload: {
    entityUri,
    path,
  },
});

export const closeKakaoLinkModal = () => ({ type: CLOSE_KAKAO_LINK_MODAL });
