// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';
import clamp from 'lodash/clamp';
import { endsWithConsonant, isHangul } from 'hangul-js';
import Frame from '../Frame';
import Envelope from './Envelope';
import NextButton from '../NextButton';
import Spinner from '../Spinner';
import ShareModal from '../ShareModal';
import openCapture from '../../openCapture';
import generateKakaoLinkUrl from '../../generateKakaoLinkUrl';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';
import styles from '../App.scss';

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FrameText = styled.div`
  user-select: none;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: AppleSDGothicNeo, sans-serif;
  opacity: 0.8;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.8px;
  color: #fff;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
`;

const FromText = styled.div`
  user-select: none;
  text-align: center;
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 29px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #fff;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
`;

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

type MessagePropTypes = {
  id: string,
  currentEntity: string | null,
  data: {
    entity: { uri: string, name: string, image?: string },
    author: { firstname: string, lastname: string },
    createdAt: string,
    stickers: ({
      position: { x: number, y: number, z: number },
      rotation: { x: number, y: number, z: number },
      scale: number,
      text: string,
      type: 'emoji' | 'text',
    } | {
      position: { x: number, y: number, z: number },
      quaternion: { x: number, y: number, z: number, w: number },
      scale: number,
      text: string,
      type: 'emoji' | 'text',
    })[],
  },
  onShareComplete?: TouchEventHandler, // eslint-disable-line react/require-default-props
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
      isLoaded(nextProps.data) &&
      !isEmpty(nextProps.data) &&
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
      onShareComplete,
      children,
      ...other
    } = this.props;

    if (!isLoaded(data)) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

    if (isEmpty(data) || !data) {
      // TODO
      return (
        <h1>404</h1>
      );
    }

    const { entity: { name, uri, image }, author: { firstname, lastname } } = data;
    const authorName = `${firstname} ${lastname}`.trim();
    const { shareModalOpened } = this.state;

    if (shareModalOpened) {
      return (
        <ShareModal
          onBack={() => this.setState({ shareModalOpened: false })}
          onComplete={onShareComplete}
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
    const trimmedName = name.trim();
    const lastChar = trimmedName.slice(-1);
    let suffix = '을(를)';

    if (isHangul(lastChar)) {
      suffix = endsWithConsonant(trimmedName) ? '을' : '를';
    }

    if (!entityTracked) {
      return (
        <Frame>
          <FrameText>
            {/* {image && (
              <div>
                <img
                  src={image}
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '150px',
                    margin: '0 auto 20px auto',
                  }}
                />
              </div>
            )} */}

            <div>
              {name}{suffix}
            </div>

            <div>
              비춰주세요
            </div>
          </FrameText>

          <FromText>
            {authorName}님이 보낸 스티커 메세지가 있습니다
          </FromText>
        </Frame>
      );
    }

    const { opened } = this.state;

    if (!opened) {
      return null;
    }

    return (
      <div {...other}>
        <NavTopRight>
          <NextButton onTouchEnd={() => this.setState({ shareModalOpened: true })} />
        </NavTopRight>
      </div>
    );
  }
}

export default Message;
