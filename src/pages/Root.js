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
  MessageFormEntity,
  MessageWithId,
  MessagesList,
} from '../types';

type RootPropTypes = {
  helpOpened: boolean,
  loadingEntity: boolean,
  transformationGuideOpened: boolean,
  currentUser: MessageAuthor | null,
  currentEntity: string | null,
  selectedSticker: string | null,
  messageForm: MessageFormType | null,
  messagesList: MessagesList,
  entities: {
    byUri: { [uri: string]: MessageFormEntity },
  },
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

  if (messagesList.entityUri !== null && currentEntity !== null && messagesList.entityUri === currentEntity) {
    const currentEntityData = entities.byUri[messagesList.entityUri];

    return (
      <div>
        <Entity
          messagesList={messagesList}
          data={currentEntityData}
          currentUser={currentUser}
          onNewClick={() => {
            /**
             * 맨 처음 증강이후 스티커 추가 버튼 눌렀을시 로그인 체크하는 부분 제거
             */
            // if (currentUser === null) {
            //   openLogin();
            // } else {
            //   dispatch(initMessageForm(currentEntityData, currentUser));
            // }
            currentUser = {}
            dispatch(initMessageForm(currentEntityData, currentUser));
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
    currentEntity,
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
    currentEntity,
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    transformationGuideOpened,
    helpOpened,
    messagesList,
  }),
)(Root));
