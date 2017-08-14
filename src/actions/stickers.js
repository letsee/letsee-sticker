// @flow
import uuidv4 from 'uuid/v4';

export const ADD_STICKER: 'ADD_STICKER' = 'ADD_STICKER';
export const DELETE_STICKER: 'DELETE_STICKER' = 'DELETE_STICKER';
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

export const transformSticker = (id: string, transform: {
  scale: number,
  position: {
    x: number,
    y: number,
    z: number,
  },
  quaternion: {
    x: number,
    y: number,
    z: number,
    w: number,
  },
}) => ({
  type: TRANSFORM_STICKER,
  payload: {
    id,
    transform,
  },
});
