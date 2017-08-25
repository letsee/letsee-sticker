// @flow
import uuidv4 from 'uuid/v4';
import type {
  MessageForm,
  MessageFormEntity,
  MessageAuthor,
  StickerPosition,
  StickerQuaternion,
  StickerType,
} from '../types';

export const INIT_MESSAGE_FORM: 'INIT_MESSAGE_FORM' = 'INIT_MESSAGE_FORM';
export const INIT_EDIT_MESSAGE_FORM: 'INIT_EDIT_MESSAGE_FORM' = 'INIT_EDIT_MESSAGE_FORM';
export const DESTROY_MESSAGE_FORM: 'DESTROY_MESSAGE_FORM' = 'DESTROY_MESSAGE_FORM';
export const SET_MESSAGE_PRIVACY: 'SET_MESSAGE_PRIVACY' = 'SET_MESSAGE_PRIVACY';
export const SET_MESSAGE_FORM_ID: 'SET_MESSAGE_FORM_ID' = 'SET_MESSAGE_FORM_ID';
export const SUBMIT_MESSAGE_FORM: 'SUBMIT_MESSAGE_FORM' = 'SUBMIT_MESSAGE_FORM';
export const SUBMIT_MESSAGE_FORM_SUCCESS: 'SUBMIT_MESSAGE_FORM_SUCCESS' = 'SUBMIT_MESSAGE_FORM_SUCCESS';
export const SUBMIT_MESSAGE_FORM_ERROR: 'SUBMIT_MESSAGE_FORM_ERROR' = 'SUBMIT_MESSAGE_FORM_ERROR';

export const initMessageForm = (entity: MessageFormEntity, author: MessageAuthor) => ({
  type: INIT_MESSAGE_FORM,
  payload: {
    entity,
    author,
  },
});

export const initEditMessageForm = (messageForm: MessageForm) => ({
  type: INIT_EDIT_MESSAGE_FORM,
  payload: messageForm,
});

export const destroyMessageForm = () => ({ type: DESTROY_MESSAGE_FORM });

export const setMessagePrivacy = (isPublic: boolean) => ({
  type: SET_MESSAGE_PRIVACY,
  payload: {
    public: isPublic,
  },
});

export const submitMessageForm = (messageForm: MessageForm) => ({
  type: SUBMIT_MESSAGE_FORM,
  payload: messageForm,
});

export const setMessageFormId = (id: string) => ({
  type: SET_MESSAGE_FORM_ID,
  payload: {
    id,
  },
});

export const submitMessageFormSuccess = (id: string) => ({
  type: SUBMIT_MESSAGE_FORM_SUCCESS,
  payload: {
    id,
  },
});

export const submitMessageFormError = error => ({
  type: SUBMIT_MESSAGE_FORM_ERROR,
  meta: {
    error,
  },
});

export const ADD_STICKER: 'ADD_STICKER' = 'ADD_STICKER';
export const DELETE_STICKER: 'DELETE_STICKER' = 'DELETE_STICKER';
export const RESET_STICKER: 'RESET_STICKER' = 'RESET_STICKER';
export const TRANSFORM_STICKER: 'TRANSFORM_STICKER' = 'TRANSFORM_STICKER';

export const addSticker = (
  text: string,
  type: StickerType,
  selected: boolean = false,
) => ({
  type: ADD_STICKER,
  payload: {
    id: uuidv4(),
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
