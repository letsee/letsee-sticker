// @flow
import uuidv4 from 'uuid/v4';

export const ADD_STICKER: 'ADD_STICKER' = 'ADD_STICKER';
export const DELETE_STICKER: 'DELETE_STICKER' = 'DELETE_STICKER';
export const TRANSLATE_STICKER: 'TRANSLATE_STICKER' = 'TRANSLATE_STICKER';
export const ROTATE_STICKER: 'ROTATE_STICKER' = 'ROTATE_STICKER';
export const SCALE_STICKER: 'SCALE_STICKER' = 'SCALE_STICKER';
export const TRANSFORM_STICKER: 'TRANSFORM_STICKER' = 'TRANSFORM_STICKER';

export const addSticker = (entityUri: string, text: string, type: 'emoji' | 'text', selected: boolean = false) => ({
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

export const translateSticker = (id: string, position: {x: number, y: number, z: number}) => ({
  type: TRANSLATE_STICKER,
  payload: {
    id,
    position,
  },
});

export const rotateSticker = (id: string, rotation: {x: number, y: number, z: number}) => ({
  type: ROTATE_STICKER,
  payload: {
    id,
    rotation,
  },
});

export const scaleSticker = (id: string, scale: number) => ({
  type: SCALE_STICKER,
  payload: {
    id,
    scale,
  },
});

export const transformSticker = (id: string, transform: {
  scale: number,
  position: {
    x: number,
    y: number,
    z: number,
  },
  rotation: {
    x: number,
    y: number,
    z: number,
  },
}) => ({
  type: TRANSFORM_STICKER,
  payload: {
    id,
    transform,
  },
});
