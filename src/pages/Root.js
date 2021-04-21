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
  zoomInSticker,
  zoomOutSticker,
  colorChangeSticker,
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

const Root = (
  {
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
    let entityTracked;

    // 현재
    if (currentEntity !== null && entity.uri === currentEntity) { entityTracked = true; } else { entityTracked = false; }

    // selectedSticker로부터 값을 전달받아 해당 Sticker에 대한 MessageFormSticker형식을 만들어서 MessageForm으로 전달해주거나
    // id값을 통해 SelectedSticker을 MessageForm 리듀서에서 삭제시켜준다.
    // selectedSticker는 ADD_STCIKER Action이 dispatch 되면 자동으로 생성된다.
    const selectedStickerData = selectedSticker === null ? null : (stickers.byId[selectedSticker] || null);
    // 스티커의 상태를 저장하는 이중 arrow function이 동작하지 않아 단일 arrow function으로 바꾸었더니
    // onStickerTransForm이 정상적으로 호출됨.
    const onStickerTransForm = (id, trans) => {
      dispatch(transformSticker(id, trans));
    };

    const onDelete = () => {
      if (selectedStickerData) {
        dispatch(deleteSticker(selectedStickerData.id));
      }
    };

    return (
      <div>
        <MessageForm
          data={messageForm}
          selectedSticker={selectedStickerData}
          entityTracked={entityTracked}
          onPublicChange={newPublic => dispatch(setMessagePrivacy(newPublic))}
          onClose={() => dispatch(destroyMessageForm())}
          onSubmit={() => {
            // if (currentUser === null) {
            //   openLogin();
            // } else if (messageForm !== null) {
            dispatch(submitMessageForm(messageForm));
            // }
          }}
          onStickerClick={(id) => {
            if (!selectedStickerData) {
              dispatch(selectSticker(id));
            }
          }}
          onStickerTransform={onStickerTransForm}
          onTextInput={(value, color) => dispatch(addSticker(value, 'text', entityTracked, color))}
          onEmojiInput={value => dispatch(addSticker(value, 'emoji', entityTracked, ''))}
          onTransformationComplete={() => selectedStickerData && dispatch(deselectSticker(selectedStickerData.id))}
          onDelete={onDelete}
          onTipClick={() => dispatch(openTransformationGuide())}
          onHelpClick={() => dispatch(openHelp())}
          onReset={() => selectedStickerData && dispatch(resetSticker(selectedStickerData.id))}
          onZoomIn={() => selectedStickerData && dispatch(zoomInSticker(selectedStickerData.id))}
          onZoomOut={() => selectedStickerData && dispatch(zoomOutSticker(selectedStickerData.id))}
          onColorChange={color => dispatch(colorChangeSticker(selectedStickerData.id, color))}

        />
      </div>
    );
  }

  if (messagesList.entityUri !== null && currentEntity !== null && messagesList.entityUri === currentEntity) {
    const currentEntityData = entities.byUri[messagesList.entityUri];
    const currentUser = {
      firstname: 'WEBARSDK-JUNGWOO',
      lastname: 'TEST',
      uid: "jjjjjw910911-010-6284-8051",
    };
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

            dispatch(initMessageForm(currentEntityData, currentUser));
          }}
          onHelpClick={() => dispatch(openHelp())}
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
    />
  );
};

// connect: 해당 Root컴포넌트의 하위의 컴포넌트들이 모두 아래 Store에 접근할 수 있도록 도와주는 기능을 수행함
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
    mapStateToProps,
    mapDispachToProps,
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
    mapStateToProps,
    mapDispachToProps,
  }),
)(Root));
