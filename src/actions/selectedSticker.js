// @flow
export const SELECT_STICKER: 'SELECT_STICKER' = 'SELECT_STICKER';
export const DESELECT_STICKER: 'DESELECT_STICKER' = 'DESELECT_STICKER';

export const selectSticker = (id: string) => ({
  type: SELECT_STICKER,
  payload: id,
});

export const deselectSticker = (id: string) => ({
  type: DESELECT_STICKER,
  payload: id,
});
