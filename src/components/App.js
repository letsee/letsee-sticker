// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import './App.scss';
import AppLoader from './AppLoader';
import Entity from './Entity';
import MessageForm from './MessageForm';
import {
  initMessageForm,
  clearMessageForm,
  destroyMessageForm,
  submitMessageForm,
  selectSticker,
  deselectSticker,
  deleteSticker,
  addSticker,
} from '../actions';

const openCapture = () => window._app && window._app.openCapture && window._app.openCapture();

const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const App = ({
  currentUser,
  entities,
  currentEntity,
  selectedSticker,
  stickers,
  messageForm,
  dispatch,
}) => {
  if (messageForm !== null) {
    const entityTracked = currentEntity !== null && messageForm.uri === currentEntity;
    const messageEntity = entities.byUri[messageForm.uri];
    const selectedStickerData = stickers.byId[selectedSticker];
    const stickersById = stickers.allIds
      .map(id => stickers.byId[id])
      .filter(sticker => sticker && sticker.entityUri === messageForm.uri);

    return (
      <Main>
        <MessageForm
          entity={messageEntity}
          stickers={stickersById}
          selectedSticker={selectedStickerData}
          entityTracked={entityTracked}
          submitting={messageForm.submitting}
          onClose={() => {
            dispatch(destroyMessageForm(messageForm.uri));
            dispatch(clearMessageForm(messageForm.uri, stickersById.map(sticker => sticker.id)));
          }}
          nextDisabled={stickersById.length === 0 || messageForm.submitting}
          onNext={() => {
            if (currentUser === null) {
              if (window._app && window._app.openLogin) {
                const logIn = confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?');

                if (logIn) {
                  window._app.openLogin();
                }
              }
            } else {
              dispatch(submitMessageForm(messageForm.uri));
            }
          }}
          onCaptureClick={openCapture}
          onStickerClick={id => dispatch(selectSticker(id))}
          onTextInput={(value) => {
            const action = dispatch(addSticker(messageForm.uri, value));

            if (entityTracked) {
              dispatch(selectSticker(action.payload.id));
            }
          }}
          onEmojiInput={(value) => {
            const action = dispatch(addSticker(messageForm.uri, value));

            if (entityTracked) {
              dispatch(selectSticker(action.payload.id));
            }
          }}
          onTransformationComplete={() => dispatch(deselectSticker(selectedSticker))}
          onDelete={() => dispatch(deleteSticker(selectedSticker))}
        />
      </Main>
    );
  }

  if (currentEntity !== null) {
    const currentEntityData = entities.byUri[currentEntity];

    return (
      <Main>
        <Entity
          data={currentEntityData}
          onNewClick={() => {
            if (currentUser === null) {
              if (window._app && window._app.openLogin) {
                const logIn = confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?');

                if (logIn) {
                  window._app.openLogin();
                }
              }
            } else {
              dispatch(initMessageForm(currentEntity));
            }
          }}
          onCaptureClick={openCapture}
        />
      </Main>
    );
  }

  return (
    <Main>
      <AppLoader />
    </Main>
  );
};

export default connect(
  ({
    letseeLoaded,
    currentEntity,
    currentUser,
    stickers,
    entities,
    selectedSticker,
    messageForm,
  }) => ({
    letseeLoaded,
    currentEntity,
    currentUser,
    stickers,
    entities,
    selectedSticker,
    messageForm,
  }),
)(App);
