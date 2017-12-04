// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import uuidv4 from 'uuid/v4';
import client from '../client';
import {
  SET_CURRENT_USER,
  setCurrentUserSuccess,
  setCurrentUserError,
} from '../actions';
import getUserByUidQuery from '../graphql/getUserByUidQuery.graphql';
import createUserMutation from '../graphql/createUserMutation.graphql';
import updateUserMutation from '../graphql/updateUserMutation.graphql';

type User = {
  uid: string,
  firstname: string,
  lastname: string,
};

const getUserByUid = (user: User) => client.query({
  fetchPolicy: 'network-only',
  query: getUserByUidQuery,
  variables: { uid: user.uid },
})
  .then(res => res.viewer.User)
  .then(res => (res === null ? ({ ...user, id: null }) : res));

const createUser = (user: User) => client.mutate({
  mutation: createUserMutation,
  variables: {
    input: {
      ...user,
      clientMutationId: uuidv4(),
    },
  },
})
  .then(res => res.data.createUser.user);

const updateUser = (id: string, user: User) => client.mutate({
  mutation: updateUserMutation,
  variables: {
    input: {
      id,
      ...user,
      clientMutationId: uuidv4(),
    },
  },
})
  .then(res => res.data.updateUser.user);

export const logInUser = action$ => action$
  .ofType(SET_CURRENT_USER)
  .filter(action => action.payload !== null)
  .switchMap(({ payload }) => Observable
    .fromPromise(getUserByUid(payload))
    .switchMap((user) => {
      if (user.id === null) {
        return Observable.fromPromise(createUser(user));
      }

      if (
        user.firstname !== payload.firstname ||
        user.lastname !== payload.lastname
      ) {
        return Observable.fromPromise(updateUser(user.id, payload));
      }

      return Observable.of(user);
    }))
  .map(user => setCurrentUserSuccess(user))
  .catch(error => setCurrentUserError(error));

export const logOutUser = action$ => action$
  .ofType(SET_CURRENT_USER)
  .filter(action => action.payload === null)
  .map(action => setCurrentUserSuccess(action.payload));
