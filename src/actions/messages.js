// @flow
import uuidv4 from 'uuid/v4';

export const ADD_MESSAGE: 'ADD_MESSAGE' = 'ADD_MESSAGE';
export const DELETE_MESSAGE: 'DELETE_MESSAGE' = 'DELETE_MESSAGE';
export const TRANSLATE_MESSAGE: 'TRANSLATE_MESSAGE' = 'TRANSLATE_MESSAGE';
export const ROTATE_MESSAGE: 'ROTATE_MESSAGE' = 'ROTATE_MESSAGE';
export const SCALE_MESSAGE: 'SCALE_MESSAGE' = 'SCALE_MESSAGE';

export const addMessage = (entityUri: string, text: string) => ({
  type: ADD_MESSAGE,
  payload: {
    id: uuidv4(),
    entityUri,
    text,
  },
});

export const deleteMessage = (id: string, entityUri: string) => ({
  type: DELETE_MESSAGE,
  payload: {
    id,
    entityUri,
  },
});

export const translateMessage = (id: string, position: {x: number, y: number, z: number}) => ({
  type: TRANSLATE_MESSAGE,
  payload: {
    id,
    position,
  },
});

export const rotateMessage = (id: string, rotation: {x: number, y: number, z: number}) => ({
  type: ROTATE_MESSAGE,
  payload: {
    id,
    rotation,
  },
});

export const scaleMessage = (id: string, scale: number) => ({
  type: SCALE_MESSAGE,
  payload: {
    id,
    scale,
  },
});
