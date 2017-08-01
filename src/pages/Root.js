// @flow
import React from 'react';
import { connect } from 'react-redux';
import AppLoader from '../components/AppLoader';
import Entity from '../components/Entity';
import MessageForm from '../components/MessageForm';
import ShareModal from '../components/ShareModal';
import Help from '../components/Help';
import TransformationGuide from '../components/TransformationGuide';
import {
  initMessageForm,
  clearMessageForm,
  destroyMessageForm,
  submitMessageForm,
  selectSticker,
  deselectSticker,
  deleteSticker,
  addSticker,
  closeShareModal,
  openHelp,
  closeHelp,
  openTransformationGuide,
  closeTransformationGuide,
  transformSticker,
} from '../actions';
import openCapture from '../openCapture';
import generateKakaoLinkUrl from '../generateKakaoLinkUrl';

type RootPropTypes = {
  transformationGuideOpened: boolean,
  helpOpened: boolean,
  currentUser: {
    firstname: string,
    lastname: string,
    uid: string,
  } | null,
  currentEntity: string | null,
  selectedSticker: string | null,
  messageForm: {
    uri: string,
    submitting: boolean,
  } | null,
  shareModal: { entityUri: string, path: [string, string] } | null,
};

const Root = ({
  transformationGuideOpened,
  helpOpened,
  shareModal,
  currentUser,
  entities,
  currentEntity,
  selectedSticker,
  stickers,
  messageForm,
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
    const entityTracked = currentEntity !== null && messageForm.uri === currentEntity;
    const messageEntity = entities.byUri[messageForm.uri];
    const selectedStickerData = stickers.byId[selectedSticker];
    const stickersById = stickers.allIds
      .map(id => stickers.byId[id])
      .filter(sticker => sticker && sticker.entityUri === messageForm.uri);

    return (
      <div>
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
          onStickerClick={(id) => {
            if (!selectedStickerData) {
              dispatch(selectSticker(id));
            }
          }}
          onStickerTransform={(id, trans) => dispatch(transformSticker(id, trans))}
          onTextInput={(value) => {
            const action = dispatch(addSticker(messageForm.uri, value, 'text'));

            if (entityTracked) {
              dispatch(selectSticker(action.payload.id));
            }
          }}
          onEmojiInput={(value) => {
            const action = dispatch(addSticker(messageForm.uri, value, 'emoji'));

            if (entityTracked) {
              dispatch(selectSticker(action.payload.id));
            }
          }}
          onTransformationComplete={() => selectedStickerData && dispatch(deselectSticker(selectedStickerData.id))}
          onDelete={() => selectedStickerData && dispatch(deleteSticker(selectedStickerData.id))}
          onTipClick={() => dispatch(openTransformationGuide())}
        />

        {shareModal !== null && (
          <ShareModal
            onBack={() => dispatch(closeShareModal())}
            onComplete={() => {
              dispatch(destroyMessageForm(messageForm.uri));
              dispatch(clearMessageForm(messageForm.uri, stickersById.map(sticker => sticker.id)));
              dispatch(closeShareModal());
            }}
            onCaptureClick={() => {
              openCapture();
              dispatch(closeShareModal());
            }}
            onKakaoLinkClick={() => {
              const messageId = shareModal.path[1];
              const kakaoLinkUrl = generateKakaoLinkUrl(messageId);
              const authorName = `${currentUser.firstname} ${currentUser.lastname}`.trim();
              const entityName = messageEntity.name;
              const imageUrl = `${window.location.protocol}//${window.location.host}${process.env.PUBLIC_PATH}img/img-kakao@3x.png`;

              Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                  title: '렛시 스티커 메세지가 도착했어요!',
                  description: `${authorName}님이 ${entityName}에 스티커 메세지를 담아 보냈습니다. 지금 렛시 브라우저로 확인해보세요!`,
                  imageUrl,
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
    );
  }

  return (
    <AppLoader onHelpClick={() => dispatch(openHelp())} />
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
    shareModal,
    helpOpened,
    transformationGuideOpened,
  }) => ({
    letseeLoaded,
    currentEntity,
    currentUser,
    stickers,
    entities,
    selectedSticker,
    messageForm,
    shareModal,
    helpOpened,
    transformationGuideOpened,
  }),
)(Root);
