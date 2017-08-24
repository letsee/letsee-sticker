// @flow
import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import AppLoader from '../components/AppLoader';
import Entity from '../components/Entity';
import MessageForm from '../components/MessageForm';
import TransformationGuide from '../components/TransformationGuide';
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
} from '../actions';
import openLogin from '../openLogin';
import type { MessageAuthor } from '../types';

type RootPropTypes = {
  loadingEntity: boolean,
  transformationGuideOpened: boolean,
  currentUser: MessageAuthor | null,
  currentEntity: string | null,
  selectedSticker: string | null,
  messageForm: {
    uri: string,
    public: boolean,
    submitting: boolean,
    error: boolean,
  } | null,
};

const Root = ({
  loadingEntity,
  transformationGuideOpened,
  currentUser,
  entities,
  currentEntity,
  selectedSticker,
  stickers,
  messageForm,
  router,
  dispatch,
}: RootPropTypes) => {
  if (transformationGuideOpened) {
    return (
      <TransformationGuide onClose={() => dispatch(closeTransformationGuide())} />
    );
  }

  if (messageForm !== null) {
    const { uri, error, submitting, public: isPublic } = messageForm;
    const entityTracked = currentEntity !== null && uri === currentEntity;
    const messageEntity = entities.byUri[uri];
    const selectedStickerData = stickers.byId[selectedSticker];
    const stickersById = stickers.allIds
      .map(id => stickers.byId[id])
      .filter(sticker => sticker && sticker.entityUri === uri);

    return (
      <div>
        <MessageForm
          entity={messageEntity}
          stickers={stickersById}
          selectedSticker={selectedStickerData}
          entityTracked={entityTracked}
          submitting={submitting}
          error={error}
          public={isPublic}
          onPublicChange={newPublic => dispatch(setMessagePrivacy(uri, newPublic))}
          onClose={() => dispatch(destroyMessageForm(uri, stickersById.map(sticker => sticker.id)))}
          nextDisabled={stickersById.length === 0 || submitting}
          onSubmit={() => {
            if (currentUser === null) {
              openLogin();
            } else {
              dispatch(submitMessageForm(uri));
            }
          }}
          onStickerClick={(id) => {
            if (!selectedStickerData) {
              dispatch(selectSticker(id));
            }
          }}
          onStickerTransform={(id, trans) => dispatch(transformSticker(id, trans))}
          onTextInput={value => dispatch(addSticker(uri, value, 'text', entityTracked))}
          onEmojiInput={value => dispatch(addSticker(uri, value, 'emoji', entityTracked))}
          onTransformationComplete={() => selectedStickerData && dispatch(deselectSticker(selectedStickerData.id))}
          onReset={() => selectedStickerData && dispatch(resetSticker(selectedStickerData.id))}
          onDelete={() => selectedStickerData && dispatch(deleteSticker(selectedStickerData.id))}
          onTipClick={() => dispatch(openTransformationGuide())}
          onHelpClick={() => router.push(`${process.env.PUBLIC_PATH || '/'}help`)}
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
              dispatch(initMessageForm(currentEntity));
            }
          }}
        />
      </div>
    );
  }

  return (
    <AppLoader
      loadingEntity={loadingEntity}
      onHelpClick={() => router.push(`${process.env.PUBLIC_PATH || '/'}help`)}
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
    stickers,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
  }) => ({
    letseeLoaded,
    loadingEntity,
    currentEntity,
    currentUser,
    stickers,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
  }),
)(Root));
