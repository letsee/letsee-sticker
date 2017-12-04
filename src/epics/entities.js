// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import uuidv4 from 'uuid/v4';
import client from '../client';
import {
  FETCH_ENTITY,
  fetchEntitySuccess,
  fetchEntityError,
} from '../actions';
import getEntityByUriQuery from '../graphql/getEntityByUriQuery.graphql';
import createEntityMutation from '../graphql/createEntityMutation.graphql';
import updateEntityMutation from '../graphql/updateEntityMutation.graphql';

type Entity = {
  uri: string,
  name: string,
  image: string,
};

const getEntityByUri = (entity: Entity) => client.query({
  query: getEntityByUriQuery,
  variables: { uri: entity.uri },
})
  .then(res => res.data.viewer.Entity)
  .then(res => (res === null ? ({ ...entity, id: null }) : res));

const createEntity = (entity: Entity) => client.mutation({
  mutation: createEntityMutation,
  variables: {
    input: {
      ...entity,
      clientMutationId: uuidv4(),
    },
  },
})
  .then(res => res.data.createEntity.entity);

const updateEntity = (id: string, entity: Entity) => client.mutation({
  mutation: updateEntityMutation,
  variables: {
    input: {
      id,
      ...entity,
      clientMutationId: uuidv4(),
    },
  },
})
  .then(res => res.data.updateEntity.entity);

const entities = action$ => action$
  .ofType(FETCH_ENTITY)
  .switchMap(({ payload }) => Observable
    .fromPromise(getEntityByUri(payload))
    .switchMap(({ id, ...entity }) => {
      if (id === null) {
        return Observable.fromPromise(createEntity(entity));
      }

      if (
        entity.name !== payload.name ||
        entity.image !== payload.image
      ) {
        return Observable.fromPromise(updateEntity(id, payload));
      }

      return Observable.of({ id, ...entity });
    }))
  .map(entity => fetchEntitySuccess(entity))
  .catch(error => Observable.of(fetchEntityError(error)));

export default entities;
