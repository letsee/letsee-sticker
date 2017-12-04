// @flow
import { combineEpics } from 'redux-observable';
import { logInUser, logOutUser } from './currentUser';

const epics = combineEpics(
  logInUser,
  logOutUser,
);

export default epics;
