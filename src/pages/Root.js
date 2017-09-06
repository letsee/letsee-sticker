// @flow
import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import uuidv4 from 'uuid/v4';
import AppLoader from '../components/AppLoader';
import Entity from '../components/Entity';
import MessageForm from '../components/MessageForm';
import TransformationGuide from '../components/TransformationGuide';
import Help from '../components/Help';
import {
  initMessageForm,
  initEditMessageForm,
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
import type {
  MessageAuthor,
  MessageForm as MessageFormType,
  MessageEntity,
  MessageWithId,
  MessagesList,
} from '../types';

type RootPropTypes = {
  helpOpened: boolean,
  loadingEntity: boolean,
  transformationGuideOpened: boolean,
  currentUser: MessageAuthor | null,
  selectedSticker: string | null,
  messageForm: MessageFormType | null,
  messagesList: MessagesList,
  entities: {
    current: MessageEntity | null,
    byUri: { [uri: string]: MessageEntity },
  },
};

const Root = ({
  helpOpened,
  loadingEntity,
  transformationGuideOpened,
  currentUser,
  entities,
  selectedSticker,
  messageForm,
  messagesList,
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
    const entityTracked = entities.current !== null && entity.uri === entities.current.uri;
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
            } else if (messageForm !== null) {
              dispatch(submitMessageForm(messageForm));
            }
          }}
          onStickerClick={(id) => {
            if (!selectedStickerData) {
              dispatch(selectSticker(id));
            }
          }}
          onStickerTransform={(id, trans) => dispatch(transformSticker(id, trans))}
          onTextInput={value => dispatch(addSticker(value, 'Text', entityTracked))}
          onEmojiInput={value => dispatch(addSticker(value, 'Emoji', entityTracked))}
          onTransformationComplete={() => selectedStickerData && dispatch(deselectSticker(selectedStickerData.id))}
          onReset={() => selectedStickerData && dispatch(resetSticker(selectedStickerData.id))}
          onDelete={() => selectedStickerData && dispatch(deleteSticker(selectedStickerData.id))}
          onTipClick={() => dispatch(openTransformationGuide())}
          onHelpClick={() => dispatch(openHelp())}
        />
      </div>
    );
  }

  if (messagesList.entityUri !== null && entities.current !== null && messagesList.entityUri === entities.current.uri) {
    const currentEntityData = entities.byUri[messagesList.entityUri];

    return (
      <div>
        <Entity
          messagesList={messagesList}
          data={currentEntityData}
          currentUser={currentUser}
          onNewClick={() => {
            if (currentUser === null) {
              openLogin();
            } else {
              dispatch(initMessageForm(currentEntityData, currentUser));
            }
          }}
          onEditClick={(message: MessageWithId) => {
            if (currentUser !== null && message.author.uid === currentUser.uid) {
              const { author, entity, stickers, ...other } = message;

              const stickersWithId = stickers.map(sticker => ({
                ...sticker,
                id: uuidv4(),
              }));

              const stickersById = stickersWithId.reduce((byId, sticker) => ({
                ...byId,
                [sticker.id]: sticker,
              }), {});

              const stickerIds = stickersWithId.map(sticker => sticker.id);

              const messageFormData = {
                ...other,
                author: currentUser,
                entity: entities.byUri[entity.uri],
                stickers: {
                  byId: stickersById,
                  allIds: stickerIds,
                },
                error: false,
                submitting: false,
                submitted: false,
              };

              dispatch(initEditMessageForm(messageFormData));
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
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
    helpOpened,
    messagesList,
  }) => ({
    letseeLoaded,
    loadingEntity,
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
    helpOpened,
    messagesList,
  }),
)(Root));
