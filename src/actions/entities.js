// @flow
export const ADD_ENTITY: 'ADD_ENTITY' = 'ADD_ENTITY';
export const FETCH_ENTITY: 'FETCH_ENTITY' = 'FETCH_ENTITY';
export const FETCH_ENTITY_SUCCESS: 'FETCH_ENTITY_SUCCESS' = 'FETCH_ENTITY_SUCCESS';
export const FETCH_ENTITY_ERROR: 'FETCH_ENTITY_ERROR' = 'FETCH_ENTITY_ERROR';
export const DELETE_ENTITY: 'DELETE_ENTITY' = 'DELETE_ENTITY';

export const addEntity = entity => ({
  type: ADD_ENTITY,
  payload: entity,
});

export const deleteEntity = entity => ({
  type: DELETE_ENTITY,
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
