// @flow
export const FETCH_ENTITY: 'FETCH_ENTITY' = 'FETCH_ENTITY';
export const FETCH_ENTITY_SUCCESS: 'FETCH_ENTITY_SUCCESS' = 'FETCH_ENTITY_SUCCESS';
export const FETCH_ENTITY_ERROR: 'FETCH_ENTITY_ERROR' = 'FETCH_ENTITY_ERROR';
export const END_TRACK_ENTITY: 'END_TRACK_ENTITY' = 'END_TRACK_ENTITY';

export const endTrackEntity = entity => ({
  type: END_TRACK_ENTITY,
  payload: entity,
});

export const fetchEntity = entity => ({
  type: FETCH_ENTITY,
  payload: entity,
});

export const fetchEntitySuccess = entity => ({
  type: FETCH_ENTITY_SUCCESS,
  payload: entity,
});

export const fetchEntityError = error => ({
  type: FETCH_ENTITY_ERROR,
  meta: {
    error,
  },
});
