// @flow
export const GET_MESSAGE_LIST_REQUEST: 'GET_MESSAGE_LIST_REQUEST' = 'GET_MESSAGE_LIST_REQUEST';
export const GET_MESSAGE_LIST_SUCCESS: 'GET_MESSAGE_LIST_SUCCESS' = 'GET_MESSAGE_LIST_SUCCESS';
export const GET_MESSAGE_LIST_FAILURE: 'GET_MESSAGE_LIST_FAILURE' = 'GET_MESSAGE_LIST_FAILURE';

export const GET_MESSAGE_ONE_REQUEST: 'GET_MESSAGE_ONE_REQUEST' = 'GET_MESSAGE_ONE_REQUEST';
export const GET_MESSAGE_ONE_SUCCESS: 'GET_MESSAGE_ONE_SUCCESS' = 'GET_MESSAGE_ONE_SUCCESS';
export const GET_MESSAGE_ONE_FAILURE: 'GET_MESSAGE_ONE_FAILURE' = 'GET_MESSAGE_ONE_FAILURE';

export const getMessageListRequest = entity => ({
    type: GET_MESSAGE_LIST_REQUEST,
    payload: entity,
});

export const getMessageListSuccess = entity => ({
    type: GET_MESSAGE_LIST_SUCCESS,
    payload: entity,
});

export const getMessageListFailure = entity => ({
    type: GET_MESSAGE_LIST_FAILURE,
    payload: entity,
});

export const getMessageOneRequest = entity => ({
    type: GET_MESSAGE_ONE_REQUEST,
    payload: entity,
});

export const getMessageOneSuccess = entity => ({
    type: GET_MESSAGE_ONE_SUCCESS,
    payload: entity,
});

export const getMessageOneFailure = entity => ({
    type: GET_MESSAGE_ONE_FAILURE,
    payload: entity,
});

