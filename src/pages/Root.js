// @flow
import React, { Component } from 'react';
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
  transformSticker,
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
  loadingEntity: boolean,
  currentUser: MessageAuthor | null,
  selectedSticker: string | null,
  messageForm: MessageFormType | null,
  messagesList: MessagesList,
  entities: {
    current: MessageEntity | null,
    byUri: { [uri: string]: MessageEntity },
  },
};

type RootState = {
  helpOpened: boolean,
  transformationGuideOpened: boolean,
};

class Root extends Component<RootPropTypes, RootState> {
  state = {
    helpOpened: false,
    transformationGuideOpened: false,
  };

  render() {
    const {
      loadingEntity,
      currentUser,
      entities,
      selectedSticker,
      messageForm,
      messagesList,
      router,
      dispatch,
    } = this.props;

    if (this.state.transformationGuideOpened) {
      return (
        <TransformationGuide onClose={() => this.setState({ transformationGuideOpened: false })} />
      );
    }

    if (this.state.helpOpened) {
      return (
        <Help onCloseClick={() => this.setState({ helpOpened: false })} />
      );
    }

    if (messageForm !== null) {
      const { entity, stickers } = messageForm;
      const entityTracked = entities.current !== null && entity.uri === entities.current.uri;
      const selectedStickerData = selectedSticker === null ? null : (stickers.byId[selectedSticker] || null);

      return (
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
          onTipClick={() => this.setState({ transformationGuideOpened: true })}
          onHelpClick={() => this.setState({ helpOpened: true })}
        />
      );
    }

    if (messagesList.entityUri !== null && entities.current !== null && messagesList.entityUri === entities.current.uri) {
      const currentEntityData = entities.current;

      return (
        <Entity
          messagesList={messagesList}
          entity={currentEntityData}
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
      );
    }

    return (
      <AppLoader
        onHelpClick={() => this.setState({ helpOpened: true })}
        onNewsClick={() => router.push(`${process.env.PUBLIC_PATH || '/'}news`)}
      />
    );
  }
      loadingEntity={loadingEntity}
}

export default withRouter(connect(
  ({
    letseeLoaded,
    loadingEntity,
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    messagesList,
  }) => ({
    letseeLoaded,
    loadingEntity,
    currentUser,
    entities,
    selectedSticker,
    messageForm,
    messagesList,
  }),
)(Root));
