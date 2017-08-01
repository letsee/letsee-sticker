// @flow
import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import MessageComponent from '../components/Message';
import openCapture from '../openCapture';

type MessageType = {
  params: { id: string },
  currentEntity: string | null,
};

const Message = ({
  params: { id },
  router,
  data,
  currentEntity,
}: MessageType) => (
  <MessageComponent
    id={id}
    data={data}
    currentEntity={currentEntity}
    onCaptureClick={openCapture}
    onShareComplete={() => router.push('/')}
  />
);

export default firebaseConnect(({ params: { id } }) => ([{ path: `messages/${id}`, storeAs: 'message' }]))(connect(({ firebase: { data: { message } }, currentEntity }) => ({ data: message, currentEntity }))(Message));
