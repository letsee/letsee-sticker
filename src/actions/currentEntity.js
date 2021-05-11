// @flow
export const START_TRACK_ENTITY: 'START_TRACK_ENTITY' = 'START_TRACK_ENTITY';
export const END_TRACK_ENTITY: 'END_TRACK_ENTITY' = 'END_TRACK_ENTITY';


export const startTrackEntity = entity => ({
  type: START_TRACK_ENTITY,
  payload: entity,
});

export const endTrackEntity = entity => ({
  type: END_TRACK_ENTITY,
  payload: entity,
});

