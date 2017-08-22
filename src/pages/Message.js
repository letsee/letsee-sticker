// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate,
} from 'react-redux-firebase';
import MessageComponent from '../components/Message';

type MessageType = {
  params: { id: string },
  currentEntity: string | null,
  loadingEntity: boolean,
};

const Message = ({
  params: { id },
  router,
  data,
  currentEntity,
  loadingEntity,
}: MessageType) => (
  <MessageComponent
    id={id}
    data={data}
    loading={!isLoaded(data)}
    empty={isEmpty(data)}
    currentEntity={currentEntity}
    loadingEntity={loadingEntity}
    onClose={() => router.push(process.env.PUBLIC_PATH || '/')}
    onHelpClick={() => router.push(`${process.env.PUBLIC_PATH || '/'}help`)}
  />
);

const populates = [
  { child: 'author', root: 'authors' },
];

export default firebaseConnect(
  ({ params: { id } }) => ([{ path: `messages/${id}`, storeAs: 'message', populates }]),
)(connect(
  ({
    firebase,
    currentEntity,
    loadingEntity,
  }) => ({
    data: populate(firebase, 'message', populates),
    currentEntity,
    loadingEntity,
  }),
)(Message));
