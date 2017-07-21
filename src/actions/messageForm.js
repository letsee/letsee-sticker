// @flow
export const INIT_MESSAGE_FORM: 'INIT_MESSAGE_FORM' = 'INIT_MESSAGE_FORM';
export const DESTROY_MESSAGE_FORM: 'DESTROY_MESSAGE_FORM' = 'DESTROY_MESSAGE_FORM';
export const CLEAR_MESSAGE_FORM: 'CLEAR_MESSAGE_FORM' = 'CLEAR_MESSAGE_FORM';
export const SUBMIT_MESSAGE_FORM: 'SUBMIT_MESSAGE_FORM' = 'SUBMIT_MESSAGE_FORM';
export const SUBMIT_MESSAGE_FORM_SUCCESS: 'SUBMIT_MESSAGE_FORM_SUCCESS' = 'SUBMIT_MESSAGE_FORM_SUCCESS';
export const SUBMIT_MESSAGE_FORM_ERROR: 'SUBMIT_MESSAGE_FORM_ERROR' = 'SUBMIT_MESSAGE_FORM_ERROR';

export const initMessageForm = (uri: string) => ({
  type: INIT_MESSAGE_FORM,
  payload: {
    uri,
  },
});

export const destroyMessageForm = (uri: string) => ({
  type: DESTROY_MESSAGE_FORM,
  payload: {
    uri,
  },
});

export const clearMessageForm = (uri: string, stickerIds: string[]) => ({
  type: CLEAR_MESSAGE_FORM,
  payload: {
    uri,
    stickerIds,
  },
});

export const submitMessageForm = (uri: string) => ({
  type: SUBMIT_MESSAGE_FORM,
  payload: {
    uri,
  },
});

export const submitMessageFormSuccess = (uri: string) => ({
  type: SUBMIT_MESSAGE_FORM_SUCCESS,
  payload: {
    uri,
  },
});

export const submitMessageFormError = (uri: string, error) => ({
  type: SUBMIT_MESSAGE_FORM_ERROR,
  payload: {
    uri,
  },
  meta: {
    error,
  },
});
