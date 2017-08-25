// @flow
import uuidv4 from 'uuid/v4';
import type { StickerPosition, StickerQuaternion, StickerType } from '../types';

export const ADD_STICKER: 'ADD_STICKER' = 'ADD_STICKER';
export const DELETE_STICKER: 'DELETE_STICKER' = 'DELETE_STICKER';
export const RESET_STICKER: 'RESET_STICKER' = 'RESET_STICKER';
export const TRANSFORM_STICKER: 'TRANSFORM_STICKER' = 'TRANSFORM_STICKER';

export const addSticker = (
  entityUri: string,
  text: string,
  type: StickerType,
  selected: boolean = false,
) => ({
  type: ADD_STICKER,
  payload: {
    id: uuidv4(),
    entityUri,
    text,
    type,
    selected,
  },
});

export const deleteSticker = (id: string) => ({
  type: DELETE_STICKER,
  payload: {
    id,
  },
});

export const resetSticker = (id: string) => ({
  type: RESET_STICKER,
  payload: {
    id,
  },
});

export const transformSticker = (id: string, transform: {
  scale: number,
  position: StickerPosition,
  quaternion: StickerQuaternion,
}) => ({
  type: TRANSFORM_STICKER,
  payload: {
    id,
    transform,
  },
});
