// @flow
import { combineEpics } from 'redux-observable';
import { logInUser, logOutUser } from './currentUser';
import entities from './entities';

const epics = combineEpics(
  logInUser,
  logOutUser,
  entities,
);

export default epics;
