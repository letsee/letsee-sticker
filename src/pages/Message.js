// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
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

export default firebaseConnect(
  ({ params: { id } }) => ([{ path: `messages/${id}`, storeAs: 'message' }]),
)(connect(
  ({
    firebase: { data: { message } },
    currentEntity,
    loadingEntity,
  }) => ({
    data: message,
    currentEntity,
    loadingEntity,
  }),
)(Message));
