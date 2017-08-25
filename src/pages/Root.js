// @flow
import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import AppLoader from '../components/AppLoader';
import Entity from '../components/Entity';
import MessageForm from '../components/MessageForm';
import TransformationGuide from '../components/TransformationGuide';
import Help from '../components/Help';
import {
  initMessageForm,
  destroyMessageForm,
  setMessagePrivacy,
  submitMessageForm,
  selectSticker,
  deselectSticker,
  resetSticker,
  deleteSticker,
  addSticker,
  openTransformationGuide,
  closeTransformationGuide,
  transformSticker,
  openHelp,
  closeHelp,
} from '../actions';
import openLogin from '../openLogin';
import type { MessageAuthor, MessageForm as MessageFormType } from '../types';

type RootPropTypes = {
  helpOpened: boolean,
  loadingEntity: boolean,
  transformationGuideOpened: boolean,
  currentUser: MessageAuthor | null,
  currentEntity: string | null,
  selectedSticker: string | null,
  messageForm: MessageFormType | null,
};

const Root = ({
  helpOpened,
  loadingEntity,
  transformationGuideOpened,
  currentUser,
  entities,
  currentEntity,
  selectedSticker,
  messageForm,
  router,
  dispatch,
}: RootPropTypes) => {
  if (transformationGuideOpened) {
    return (
      <TransformationGuide onClose={() => dispatch(closeTransformationGuide())} />
    );
  }

  if (helpOpened) {
    return (
      <Help onCloseClick={() => dispatch(closeHelp())} />
    );
  }

  if (messageForm !== null) {
    const { entity, stickers } = messageForm;
    const entityTracked = currentEntity !== null && entity.uri === currentEntity;
    const selectedStickerData = selectedSticker === null ? null : (stickers.byId[selectedSticker] || null);

    return (
      <div>
        <MessageForm
          data={messageForm}
          selectedSticker={selectedStickerData}
          entityTracked={entityTracked}
          onPublicChange={newPublic => dispatch(setMessagePrivacy(newPublic))}
          onClose={() => dispatch(destroyMessageForm())}
          onSubmit={() => {
            if (currentUser === null) {
              openLogin();
            } else {
              dispatch(submitMessageForm(messageForm));
            }
          }}
          onStickerClick={(id) => {
            if (!selectedStickerData) {
              dispatch(selectSticker(id));
            }
          }}
          onStickerTransform={(id, trans) => dispatch(transformSticker(id, trans))}
          onTextInput={value => dispatch(addSticker(value, 'text', entityTracked))}
          onEmojiInput={value => dispatch(addSticker(value, 'emoji', entityTracked))}
          onTransformationComplete={() => selectedStickerData && dispatch(deselectSticker(selectedStickerData.id))}
          onReset={() => selectedStickerData && dispatch(resetSticker(selectedStickerData.id))}
          onDelete={() => selectedStickerData && dispatch(deleteSticker(selectedStickerData.id))}
          onTipClick={() => dispatch(openTransformationGuide())}
          onHelpClick={() => dispatch(openHelp())}
        />
      </div>
    );
  }

  if (currentEntity !== null) {
    const currentEntityData = entities.byUri[currentEntity];

    return (
      <div>
        <Entity
          data={currentEntityData}
          currentUser={currentUser}
          onNewClick={() => {
            if (currentUser === null) {
              openLogin();
            } else {
              dispatch(initMessageForm(currentEntityData, currentUser));
            }
          }}
        />
      </div>
    );
  }

  return (
    <AppLoader
      loadingEntity={loadingEntity}
      onHelpClick={() => dispatch(openHelp())}
      onNewsClick={() => router.push(`${process.env.PUBLIC_PATH || '/'}news`)}
    />
  );
};

export default withRouter(connect(
  ({
    letseeLoaded,
    loadingEntity,
    currentEntity,
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
    helpOpened,
  }) => ({
    letseeLoaded,
    loadingEntity,
    currentEntity,
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
    helpOpened,
  }),
)(Root));
