// @flow
export const LETSEE_LOADED: 'LETSEE_LOADED' = 'LETSEE_LOADED';
export const START_LOADING: 'START_LOADING' = 'START_LOADING';
export const STOP_LOADING: 'STOP_LOADING' = 'STOP_LOADING';

export const letseeLoad = () => ({ type: LETSEE_LOADED });
export const startLoading = () => ({ type: START_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });
