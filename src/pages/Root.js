// @flow
import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import AppLoader from '../components/AppLoader';
import Entity from '../components/Entity';
import MessageForm from '../components/MessageForm';
import ShareModal from '../components/ShareModal';
import TransformationGuide from '../components/TransformationGuide';
import {
  initMessageForm,
  destroyMessageForm,
  submitMessageForm,
  selectSticker,
  deselectSticker,
  resetSticker,
  deleteSticker,
  addSticker,
  closeShareModal,
  openTransformationGuide,
  closeTransformationGuide,
  transformSticker,
} from '../actions';
import openCapture from '../openCapture';
import openLogin from '../openLogin';
import generateKakaoLinkUrl from '../generateKakaoLinkUrl';

type RootPropTypes = {
  loadingEntity: boolean,
  transformationGuideOpened: boolean,
  currentUser: {
    firstname: string,
    lastname: string,
    uid: string,
  } | null,
  currentEntity: string | null,
  selectedSticker: string | null,
  messageForm: {
    uri: string,
    public: boolean,
    submitting: boolean,
  } | null,
  shareModal: { entityUri: string, path: [string, string] } | null,
};

const Root = ({
  loadingEntity,
  transformationGuideOpened,
  shareModal,
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
    const { uri, submitting } = messageForm;
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
          onClose={() => dispatch(destroyMessageForm(uri, stickersById.map(sticker => sticker.id)))}
          nextDisabled={stickersById.length === 0 || submitting}
          onComplete={() => {
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

        {shareModal !== null && (
          <ShareModal
            onBack={() => dispatch(closeShareModal())}
            onComplete={() => dispatch(destroyMessageForm(uri, stickersById.map(sticker => sticker.id)))}
            onCaptureClick={() => {
              openCapture();
              dispatch(closeShareModal());
            }}
            onKakaoLinkClick={() => {
              const messageId = shareModal.path[1];
              const kakaoLinkUrl = generateKakaoLinkUrl(messageId);
              const authorName = `${currentUser.firstname} ${currentUser.lastname}`.trim();
              const entityName = messageEntity.name;

              Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                  title: '렛시 스티커 메세지가 도착했어요!',
                  description: `${authorName}님이 ${entityName}에 스티커 메세지를 담아 보냈습니다. 지금 렛시 브라우저로 확인해보세요!`,
                  imageUrl: process.env.KAKAO_IMAGE_URL,
                  link: {
                    mobileWebUrl: kakaoLinkUrl,
                    webUrl: kakaoLinkUrl,
                    androidExecParams: kakaoLinkUrl,
                    iosExecParams: kakaoLinkUrl,
                  },
                },
                buttons: [{
                  title: '렛시 브라우저로 보기',
                  link: {
                    mobileWebUrl: kakaoLinkUrl,
                    webUrl: kakaoLinkUrl,
                    androidExecParams: kakaoLinkUrl,
                    iosExecParams: kakaoLinkUrl,
                  },
                }],
                fail: (...args) => {
                  // TODO error
                  console.log(args);
                },
              });
            }}
          />
        )}
      </div>
    );
  }

  if (currentEntity !== null) {
    const currentEntityData = entities.byUri[currentEntity];

    return (
      <Entity
        data={currentEntityData}
        onNewClick={() => {
          if (currentUser === null) {
            openLogin();
          } else {
            dispatch(initMessageForm(currentEntity));
          }
        }}
      />
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
    shareModal,
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
    shareModal,
    transformationGuideOpened,
  }),
)(Root));
