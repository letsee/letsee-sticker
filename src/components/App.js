// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import './App.scss';
import AppLoader from './AppLoader';
import Entity from './Entity';
import MessageForm from './MessageForm';
import KakaoLink from './KakaoLink';
import {
  initMessageForm,
  clearMessageForm,
  destroyMessageForm,
  submitMessageForm,
  selectSticker,
  deselectSticker,
  deleteSticker,
  addSticker,
  closeKakaoLinkModal,
  transformSticker,
} from '../actions';

const openCapture = () => typeof window !== 'undefined' && window !== null && window._app && window._app.openCapture && window._app.openCapture();
const generateKakaoLinkUrl = (messageId: string) => `https://vm82m.app.goo.gl/?link=https://browser.letsee.io/load?url=${window.location.protocol}//${window.location.host}${process.env.PUBLIC_PATH}${messageId}&apn=io.letsee.browser&isi=1215633022&ibi=io.letsee.ios.browser`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const App = ({
  kakaoLinkModal,
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
          onTransformationComplete={() => dispatch(deselectSticker(selectedSticker))}
          onDelete={() => dispatch(deleteSticker(selectedSticker))}
        />

        {kakaoLinkModal !== null && (
          <KakaoLink
            onClose={() => dispatch(closeKakaoLinkModal())}
            onComplete={() => {
              dispatch(destroyMessageForm(messageForm.uri));
              dispatch(clearMessageForm(messageForm.uri, stickersById.map(sticker => sticker.id)));
              dispatch(closeKakaoLinkModal());
            }}
            onKakaoLinkClick={() => {
              const messageId = kakaoLinkModal.path[1];
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
    kakaoLinkModal,
  }) => ({
    letseeLoaded,
    currentEntity,
    currentUser,
    stickers,
    entities,
    selectedSticker,
    messageForm,
    kakaoLinkModal,
  }),
)(App);
