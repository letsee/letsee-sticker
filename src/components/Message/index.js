// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import Button from '../Button';
import TargetGuide from '../TargetGuide';
import HelpButton from '../HelpButton';
import CloseButton from '../CloseButton';
import ShareButton from '../ShareButton';
import Envelope from './Envelope';
import MessageMeta from '../MessageMeta';
import Spinner from '../Spinner';
import ShareModal from '../ShareModal';
import openCapture from '../../openCapture';
import generateKakaoLinkUrl from '../../generateKakaoLinkUrl';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';
import styles from '../App.scss';
import type { Message as MessageType } from '../../types';

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TrackMessage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;

const TrackMessageImage = styled.img`
  display: block;
  margin: 0 auto 16px auto;
  opacity: 0.8;
  border-radius: 50%;
  border: 2px solid #fff;
  width: 100px;
  height: 100px;
  background-color: #fff;
  object-fit: contain;
`;

const TrackMessageText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  user-select: none;
  padding: 17px 0;
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const StyledHelpButton = styled(HelpButton)`
  position: absolute;
  right: 24px;
  bottom: 96px;
`;

const NavTopLeft = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
`;

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

const BottomLeft = styled.div`
  position: absolute;
  left: 16px;
  bottom: 14px;
`;

const BottomRight = styled.div`
  position: absolute;
  right: 11px;
  bottom: 3px;
`;

const CloseTextButton = Button.extend`
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.4px;
  text-align: center;
  padding: 17px 16px;
`;

type MessagePropTypes = {
  id: string,
  currentEntity: string | null,
  data: MessageType,
  loading: boolean,
  empty: boolean,
  loadingEntity: boolean,
  onClose?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onHelpClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

type MessageStateTypes = {
  opened: boolean,
  shareModalOpened: boolean,
};

class Message extends Component {
  constructor(props: MessagePropTypes) {
    super(props);

    this.state = {
      opened: false,
      shareModalOpened: false,
    };

    if (typeof letsee !== 'undefined' && letsee !== null) {
      this.messageObject = new Object3D();
    }
  }

  state: MessageStateTypes;

  componentWillReceiveProps(nextProps: MessagePropTypes) {
    if (
      !nextProps.loading &&
      !nextProps.empty &&
      nextProps.data &&
      nextProps.currentEntity !== null &&
      nextProps.currentEntity === nextProps.data.entity.uri
    ) {
      this.renderAR(nextProps);
    }
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null && this.props.data && this.props.data.entity) {
      const entity = letsee.getEntity(this.props.data.entity.uri);

      if (entity) {
        entity.removeRenderable(this.messageObject);
      }
    }
  }

  props: MessagePropTypes;

  renderAR({ data: { entity: { uri }, author, stickers } }: MessagePropTypes) {
    const entity = letsee.getEntity(uri);
    const { width, height, depth } = entity.size;
    let realDiagonal = MAX_DIAGONAL;

    if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
      realDiagonal = Math.sqrt((width * width) + (height * height));
    }

    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    if (this.messageObject.parent !== entity.object) {
      entity.addRenderable(this.messageObject);
    }

    for (let i = this.messageObject.children.length; i >= 0; i -= 1) {
      this.messageObject.remove(this.messageObject.children[i]);
    }

    if (this.state.opened) {
      for (let i = 0; i < stickers.length; i += 1) {
        const { position, rotation, quaternion, scale, text, type } = stickers[i];
        const stickerElem = document.createElement('div');
        stickerElem.className = styles[type];

        if (type === 'emoji') {
          const fontSize = diagonal * 0.22;
          stickerElem.style.fontSize = `${fontSize}px`;
          stickerElem.style.letterSpacing = `${-fontSize * 3 / 94}px`;
        } else if (type === 'text') {
          const fontSize = diagonal * 0.11;
          stickerElem.style.fontSize = `${fontSize}px`;
          stickerElem.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
          stickerElem.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
        }

        stickerElem.innerHTML = text.replace(/[\n\r]/g, '<br />');
        const stickerRenderable = new DOMRenderable(stickerElem);
        stickerRenderable.position.set(position.x, position.y, position.z);

        if (quaternion) {
          stickerRenderable.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        } else {
          stickerRenderable.quaternion.setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
        }

        stickerRenderable.scale.setScalar(scale * realToClamped);
        this.messageObject.add(stickerRenderable);
      }

      // TODO
      // const stickersObj = createStickers(stickers);
      // this.messageObject.add(stickersObj);
    } else {
      const tmp = document.createElement('template');
      tmp.innerHTML = renderToString(<Envelope data={author} size={diagonal} />);
      const envelope = tmp.content.firstChild;
      const envelopeButton = envelope.querySelector('button');
      const envelopeRenderable = new DOMRenderable(envelope);
      envelopeRenderable.scale.setScalar(realToClamped);

      if (typeof depth !== 'undefined' && depth !== null) {
        envelopeRenderable.position.setZ(depth / 2);
      }

      envelopeButton.addEventListener('click', () => {
        this.setState({ opened: true }, () => {
          this.messageObject.remove(envelopeRenderable);

          for (let i = 0; i < stickers.length; i += 1) {
            const { position, rotation, quaternion, scale, text, type } = stickers[i];
            const stickerElem = document.createElement('div');
            stickerElem.className = styles[type];

            if (type === 'emoji') {
              const fontSize = diagonal * 0.22;
              stickerElem.style.fontSize = `${fontSize}px`;
              stickerElem.style.letterSpacing = `${-fontSize * 3 / 94}px`;
            } else if (type === 'text') {
              const fontSize = diagonal * 0.11;
              stickerElem.style.fontSize = `${fontSize}px`;
              stickerElem.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
              stickerElem.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
            }

            stickerElem.innerHTML = text.replace(/[\n\r]/g, '<br />');
            const stickerRenderable = new DOMRenderable(stickerElem);
            stickerRenderable.position.set(position.x, position.y, position.z);

            if (quaternion) {
              stickerRenderable.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
            } else {
              stickerRenderable.quaternion.setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
            }

            stickerRenderable.scale.setScalar(scale * realToClamped);
            this.messageObject.add(stickerRenderable);
          }

          // TODO
          // const stickersObj = createStickers(stickers);
          // this.messageObject.add(stickersObj);
        });
      });

      this.messageObject.add(envelopeRenderable);
    }
  }

  render() {
    const {
      id,
      currentEntity,
      data,
      onClose,
      onHelpClick,
      loading,
      empty,
      loadingEntity,
      children,
      ...other
    } = this.props;

    if (loading) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

    if (empty || !data) {
      // TODO
      return (
        <h1>404</h1>
      );
    }

    const { entity: { name, uri, image }, author, timestamp } = data;
    const { firstname, lastname } = author;
    const authorName = `${firstname} ${lastname}`.trim();
    const { shareModalOpened } = this.state;

    if (shareModalOpened) {
      return (
        <ShareModal
          onClose={() => this.setState({ shareModalOpened: false })}
          onCaptureClick={() => {
            openCapture();
            this.setState({ shareModalOpened: false });
          }}
          onKakaoLinkClick={() => {
            const kakaoLinkUrl = generateKakaoLinkUrl(id);

            Kakao.Link.sendDefault({
              objectType: 'feed',
              content: {
                title: '렛시 스티커 메세지가 도착했어요!',
                description: `${authorName}님이 ${name}에 스티커 메세지를 담아 보냈습니다. 지금 렛시 브라우저로 확인해보세요!`,
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
      );
    }

    const entityTracked = currentEntity !== null && currentEntity === uri;

    if (loadingEntity) {
      return null;
    }

    if (!entityTracked) {
      return (
        <div {...other}>
          <Title>{authorName}님의 스티커 메세지</Title>

          <TargetGuide>
            <TrackMessage>
              {image && (
                <TrackMessageImage src={image} />
              )}

              <TrackMessageText>
                {name}의 정면을 비춰주세요
              </TrackMessageText>
            </TrackMessage>
          </TargetGuide>

          <NavTopLeft>
            <CloseButton onClick={onClose} />
          </NavTopLeft>

          <StyledHelpButton onTouchEnd={onHelpClick} />
        </div>
      );
    }

    const { opened } = this.state;

    if (!opened) {
      return null;
    }

    return (
      <div {...other}>
        <BottomLeft>
          <MessageMeta
            author={author}
            timestamp={timestamp}
          />
        </BottomLeft>

        <BottomRight>
          <ShareButton onClick={() => this.setState({ shareModalOpened: true })} />
        </BottomRight>

        <NavTopRight>
          <CloseTextButton onClick={onClose}>
            닫기
          </CloseTextButton>
        </NavTopRight>
      </div>
    );
  }
}

export default Message;
