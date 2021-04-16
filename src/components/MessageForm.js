// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import clamp from 'lodash/clamp';
import AddEmojiButton from './AddEmojiButton';
import AddTextButton from './AddTextButton';
import CloseButton from './CloseButton';
import CompleteButton from './CompleteButton';
import HelpButton from './HelpButton';
import TipButton from './TipButton';
import SaveButton from './SaveButton';
import DisabledSaveButton from './DisabledSaveButton';
import EmojiDrawer from './EmojiDrawer';
import ColorPicker from './ColorPicker';
import Frame from './Frame';
import TargetGuide from './TargetGuide';
import TextInput from './TextInput';
import Transformation from './Transformation';
import TranslateZ from './Transformation/TranslateZ';
import MessagePrivacy from './MessagePrivacy';
import manager from '../manager';
import getObjectById from '../getObjectById';
import { ImageButton } from './Button';
import { BottomButtonContainer} from './Container'
import debounce from 'lodash/debounce';

import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../constants';
import styles from './App.scss';
import type {
  MessageForm as MessageFormType,
  MessageFormSticker,
  StickerPosition,
  StickerQuaternion,
} from '../types';

const transitionDuration = 200;

const transitionStyles = {
  entered: {
    opacity: 1,
    transform: 'none',
    transition: `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`,
  },
};

// STICKER pos array 매개변수 타
const TRANSFORM: 'TRANSFORM' = 'TRANSFORM';
const ZOOM_IN: 'ZOOM_IN' = 'ZOOM_IN';
const ZOOM_OUT: 'ZOOM_OUT' = 'ZOOM_OUT';

// const NavTopLeft = styled.div`
//   position: absolute;
//   top: 25px;
//   left: 0;
// `;

const NavTopCenter = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  padding: 18px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.3px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

// const NavBottomRight = styled.div`
//   position: absolute;
//   bottom: 139px;
//   right: 4px;
// `;

const AddTextButtonAR = styled(AddTextButton)`
  display: inline-block;

  img {
    width: ${props => props.size * 0.2}px;
  }
`;

const AddEmojiButtonAR = styled(AddEmojiButton)`
  display: inline-block;
  margin-left: ${props => props.size * 0.05}px;

  img {
    width: ${props => props.size * 0.2}px;
  }
`;

const FrameAR = styled(Frame)`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  img {
    width: ${props => Math.sqrt(((props.width * props.width) + (props.height * props.height)) / 2) * 0.06}px;
  }
`;

const StickerFrame = styled(Frame)`
  img {
    width: ${props => props.imageSize}px;
    height: ${props => props.imageSize}px;
  }
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
  opacity: 0.5;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: contain;
  width: 100px;
  height: 100px;
  background-color: #fff;
`;

const TrackMessageText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: #fff;
`;

const StyledHelpButton = styled(HelpButton)`
  display: inline-block;
  margin-left: 2px;
  vertical-align: middle;
`;

const StyledTipButton = styled(TipButton)`
  position: absolute;
  bottom: 4px;
  left: 4px;
`;

const BottomActionsAddContent = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image : url('https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-background_3x.png');
  background-repeat : no-repeat;
  background-size : cover;
  width: 133px;
  height: 61px;
  
  img {
    width: 55px;
    height: 55px;
    padding-bottom: 3px;
  }
`;

const StyledSaveButton = styled(SaveButton)`
  position: absolute;
  bottom: 84px;
  right: 3%;
`;

const StyledDisabledSaveButton = styled(DisabledSaveButton)`
  position: absolute;
  bottom: 84px;
  right: 3%;
`;

const InitialFrame = styled.div`
  width: 140px;
  height: 140px;
  border: 1px solid #34A5AF;
  border-radius: 15px;
`;

const InitialText = styled.div`
  text-align: center;
  font-size: 10px;
  color: white;
`;

type MessageFormPropTypes = {
  data: MessageFormType,
  selectedSticker: MessageFormSticker | null,
  entityTracked: boolean,
  onPublicChange?: boolean => mixed,  // eslint-disable-line react/require-default-props
  onStickerClick?: string => mixed, // eslint-disable-line react/require-default-props
  onTextInput?: string => mixed, // eslint-disable-line react/require-default-props
  onEmojiInput?: string => mixed, // eslint-disable-line react/require-default-props
  onTransformationComplete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onDelete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onReset?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onZoomIn?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onZoomOut?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onColorChange?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onSubmit?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onClose?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onHelpClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onTipClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onStickerTransform: (string, {
    position: StickerPosition,
    quaternion: StickerQuaternion,
    scale: number,
  }) => mixed,
};

class MessageForm extends Component {
  constructor(props: MessageFormPropTypes) {
    super(props);

    this.state = {
      mode: 'default',
      isTextMode: false,
      messagePrivacyOpen: false,
      currentStickerPosArray: [],
      selectedTextColor: '#ffffff',
    };
    this.entity = letsee.getEntityByUri('https://s-developer.letsee.io/api-tm/target-manager/target-uid/6077a4622b256dfa2f0dfca5');
    // this.messageObject = new letsee.Object3D();
    this.messageObject = letsee.createXRElement('<div class="messageObject"></div>', this.entity);
    this.selectedStickerObject = null;
    this.press = false;

    // 100ms 안에 오는 이벤트는 모두 한번으로 처리함.
    // 스티커의 Pos를 업데이트할수 있는 function을 debounce를 이용하여 선언함.
    this.debouncedAddStickerPos = debounce(this.addStickerPos, 100);
  }

  state: {
    mode: 'default' | 'text' | 'emoji',
    messagePrivacyOpen: boolean,
  };

  componentWillMount() {
    manager.on('panmove', this.handlePanMove);
    manager.on('panend', this.handlePanEnd);
    manager.on('pinchmove', this.handlePinchMove);
    manager.on('pinchend', this.handlePinchEnd);
    manager.on('rotatestart', this.handleRotateStart);
    manager.on('rotatemove', this.handleRotateMove);
    manager.on('rotateend', this.handleRotateEnd);
    manager.on('pressup', this.handlePressUp);
    manager.on('press', this.handlePress);
    
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: MessageFormPropTypes) {
    if (nextProps.entityTracked) {
      this.renderAR(nextProps);
    }
  }

  componentWillUnmount() {
    manager.off('panmove', this.handlePanMove);
    manager.off('panend', this.handlePanEnd);
    manager.off('pinchmove', this.handlePinchMove);
    manager.off('pinchend', this.handlePinchEnd);
    manager.off('rotatestart', this.handleRotateStart);
    manager.off('rotatemove', this.handleRotateMove);
    manager.off('rotateend', this.handleRotateEnd);
    manager.off('pressup', this.handlePressUp);
    manager.off('press', this.handlePress);

    // debounced 함수 해
    this.debouncedAddStickerPos.cancel();

    this.entity = letsee.getEntityByUri('https://s-developer.letsee.io/api-tm/target-manager/target-uid/6077a4622b256dfa2f0dfca5');
    letsee.removeAllXRElements(this.entity);
    this.selectedStickerObject = null;
  }

  props: MessageFormPropTypes;
  press: boolean;

  // 스티커에 표시될 DOMRenderable(AR)에 대한 화면을 표현하는 함수.
  renderAR({ data: { entity: { uri, size }, stickers }, selectedSticker }: MessageFormPropTypes) {
    // console.warn(this.messageObject.children[this.messageObject.children.length - 1]);
    if (this.state.mode !== 'default') {
      return;
    }
    
    const { width, height, depth } = size;
    const stickersArray = stickers.allIds.map(id => stickers.byId[id]);
    let realDiagonal = MAX_DIAGONAL;

    if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
      realDiagonal = Math.sqrt((width * width) + (height * height));
    }
    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    this.selectedStickerObject = null;
  
    const messageObjectLegnth = this.messageObject.children.length;
    for (let i = messageObjectLegnth - 1; i >= 0; i--) {
      const xrElement = this.messageObject.children[i];
      this.messageObject.removeChild(xrElement);
    }
    
    if (stickersArray.length === 0) { /** 스티커가 0개 일 때 : 초기 MessageForm 화면 **/
      /** 위쪽 화살표 **/
      const translateTmp = document.createElement('template');
      translateTmp.innerHTML = renderToString(<TranslateZ />);
      this.translateZ = letsee.createXRElement(translateTmp.content.firstChild);
      this.translateZ.rotateX(Math.PI / 2);
      this.messageObject.add(this.translateZ);
  
      /** 프레임 **/
      const frameTmp = document.createElement('template');
      frameTmp.innerHTML = renderToString(
        <div>
          <InitialFrame/>
        </div>,
      );
      const frameElem = frameTmp.content.firstChild;
      this.frameAR = letsee.createXRElement(frameElem);
      if (typeof depth !== 'undefined' && depth !== null) {
        this.frameAR.position.setZ(10);
      }
      this.messageObject.add(this.frameAR);
  
      /** 텍스트 **/
      const textTmp = document.createElement('template');
      textTmp.innerHTML = renderToString(
        <InitialText>
          <div>
            추가하고 싶은 <br/>
            이모티콘 또는 텍스트 스티커를 <br/>
            선택해 주세요.
          </div>
        </InitialText>
      );
      const textElem = textTmp.content.firstChild;
      this.textAR = letsee.createXRElement(textElem);
      this.messageObject.add(this.textAR);
    } else { /** 스티커가 1개 이상일 때 **/
      // 프레임, 텍스트, 위쪽 화살표를 제거
      if (this.frameAR && this.textAR) {
        this.messageObject.removeChild(this.frameAR);
        this.messageObject.removeChild(this.translateZ);
        this.messageObject.removeChild(this.textAR);
        this.frameAR = null;
        this.textAR = null;
      }
      
      for (let i = 0; i < stickersArray.length; i += 1) {
        const { id, type, text, position, quaternion, scale, color } = stickersArray[i];
        const selected = selectedSticker && selectedSticker.id === id; // 마지막에 추가된 스티커이면 selected라고 지정. (ADD_STICKER)
        const textWithBreaks = text.replace(/[\n\r]/g, '<br />'); // CR + LF => Enter 개행문자 => <br> 태그로 바꿔줌.
        const objById = getObjectById(this.messageObject, id);
        let element = document.createElement('div');
        let stickerObj = letsee.createXRElement(element);
        
        if (objById) { // 기존에 있는 스티커
          stickerObj = objById;
          element = stickerObj.element;
        } else { // 새롭게 만든 스티커, 다음에 getObjectById로 찾아서 css를 변경해주기 위한 uuid 지정.
          stickerObj.uuid = id;
          /** 새로운 스티 **/
          this.messageObject.add(stickerObj);
        }
        element.className = styles[type];

        // 스티커의 타입 체크를 한뒤 각각의 타입에 맞는 DOM Element 스타일을 지정.
        if (type === 'emoji') {
          const fontSize = diagonal * 0.22;
          element.style.fontSize = `${fontSize}px`;
          element.style.letterSpacing = `${-fontSize * 3 / 94}px`;
        } else if (type === 'text') {
          const { selectedTextColor } = this.state;
          const fontSize = diagonal * 0.11;
          element.style.fontSize = `${fontSize}px`;
          element.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
          element.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
          element.style.color = `${color}`;
          // if (selectedTextColor) {
          //   element.style.color = `${selectedTextColor}`;
          // }
        }
        
        // 마지막에 추가된 스티커라면 밝기값을 좀더 밝게 선언, 나머지 스티커는 좀더 어둡게 선언
        if (selectedSticker && !selected) {
          element.style.opacity = '0.3';
        } else {
          element.style.opacity = '0.9';
        }

        // 증강된 스티커 클릭시 스티커 Select
        const onClick = () => {
          element.removeEventListener('click', onClick);

          if (this.props.onStickerClick) {
            this.props.onStickerClick(id);
          }
        };

        element.addEventListener('click', onClick);
        element.innerHTML = textWithBreaks; // 내부 텍스트 추가.

        // 마지막에 추가된 스티커라면, Frame을 마지막에 추가된 스티커의 HTML요소에 자식으로 추가함.
        if (selected) {
          const frameTmp = document.createElement('template');
          const frameImageSize = diagonal * Math.sqrt(2) * 0.06;

          frameTmp.innerHTML = renderToString(
            <StickerFrame
              imageSize={frameImageSize}
              vertical={-frameImageSize}
              horizontal={-frameImageSize}
            />,
          );

          const frame = frameTmp.content.firstChild;
          element.appendChild(frame);
          this.selectedStickerObject = stickerObj;
        }
  
        stickerObj.position.set(position.x, position.y, position.z);
        stickerObj.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        stickerObj.scale.setScalar(scale * realToClamped);
      }
    }
  }
  
  handlePanMove = (e) => {
    const { entityTracked, selectedSticker, data: { entity }, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      const { deltaX, deltaY, pointers } = e;

      if (pointers.length === 1) {
        const { width, height, depth } = entity.size;
        const { clientWidth, clientHeight } = document.documentElement;
        const realDiagonal = Math.sqrt((width * width) + (height * height));
        const ratio = realDiagonal / Math.sqrt((clientWidth * clientWidth) + (clientHeight * clientHeight)) * 2;
        // debugger
        if (this.press) {
          const { z } = selectedSticker.position;
          let max = depth;

          if (typeof depth === 'undefined' || depth === null || depth === 0) {
            max = realDiagonal;
          }

          this.selectedStickerObject.position.z = clamp(z - deltaY * ratio, -1.5 * max, 1.5 * max);
          this.translateZ.position.copy(this.selectedStickerObject.position);
          this.translateZ.scale.copy(this.selectedStickerObject.scale);
        } else {
          const { x, y, z } = selectedSticker.position;
          const conjugate = this.selectedStickerObject.parent.quaternion.conjugate();
          const translateX = new THREE.Vector3(1, 0, 0).applyQuaternion(conjugate).setLength(deltaX * ratio);
          const translateY = new THREE.Vector3(0, -1, 0).applyQuaternion(conjugate).setLength(deltaY * ratio);
          
          this.selectedStickerObject.position.set(x + translateX.x, y + translateY.y, z).set(
              clamp(this.selectedStickerObject.position.x, -1.5 * width, 1.5 * width),
              clamp(this.selectedStickerObject.position.y, -1.5 * height, 1.5 * height),
              z,
          );
          /* this.selectedStickerObject.position.set(x, y, z).add(translateX).add(translateY).set(
            clamp(this.selectedStickerObject.position.x, -1.5 * width, 1.5 * width),
            clamp(this.selectedStickerObject.position.y, -1.5 * height, 1.5 * height),
            z,
          );*/
        }
      } else if (pointers.length === 3 && !this.press) {
        const { x, y, z, w } = selectedSticker.quaternion;
        const q = new THREE.Quaternion(x, y, z, w);
        const conjugate = this.selectedStickerObject.parent.quaternion.conjugate();
        const rotateX = new THREE.Vector3(1, 0, 0).applyQuaternion(conjugate).normalize();
        const rotateY = new THREE.Vector3(0, 1, 0).applyQuaternion(conjugate).normalize();
        q.multiply(new THREE.Quaternion().setFromAxisAngle(rotateX, deltaY * Math.PI / 180));
        q.multiply(new THREE.Quaternion().setFromAxisAngle(rotateY, deltaX * Math.PI / 180));
        this.selectedStickerObject.quaternion.copy(q);
      }
    }
  };

  handlePanEnd = () => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      if (this.press) {
        this.press = false;
        this.selectedStickerObject.parent.remove(this.translateZ);
      }

      this.handleTransform();
    }
  };

  handlePinchMove = (e) => {
    const { entityTracked, selectedSticker, data: { entity }, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id &&
      !this.press
    ) {
      const { deltaX, deltaY, scale } = e;
      const { width, height } = entity.size;

      const realDiagonal = Math.sqrt((width * width) + (height * height));
      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;
      const { x, y, z } = selectedSticker.position;
      const { clientWidth, clientHeight } = document.documentElement;
      const ratio = realDiagonal / Math.sqrt((clientWidth * clientWidth) + (clientHeight * clientHeight)) * 2;
      const conjugate = this.selectedStickerObject.parent.quaternion.conjugate();
      const translateX = new THREE.Vector3(1, 0, 0).applyQuaternion(conjugate).setLength(deltaX * ratio);
      const translateY = new THREE.Vector3(0, -1, 0).applyQuaternion(conjugate).setLength(deltaY * ratio);

      this.selectedStickerObject.position.set(x + translateX.x, y + translateY.y, z).set(
        clamp(this.selectedStickerObject.position.x, -1.5 * width, 1.5 * width),
        clamp(this.selectedStickerObject.position.y, -1.5 * height, 1.5 * height),
        z,
      );

      this.selectedStickerObject.scale.setScalar(selectedSticker.scale * scale * realToClamped);
    }
  };

  handlePinchEnd = () => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      this.handleTransform();
    }
  };

  handleRotateStart = (e) => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id &&
      !this.press
    ) {
      this.rotateStart = e.rotation;
    }
  }

  handleRotateMove = (e) => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id &&
      !this.press
    ) {
      const { x, y, z, w } = selectedSticker.quaternion;
      const conjugate = this.selectedStickerObject.parent.quaternion.conjugate();
      const rotateAxis = new THREE.Vector3(0, 0, 1).applyQuaternion(conjugate).normalize();
      const q = new THREE.Quaternion(x, y, z, w);
      q.multiply(new THREE.Quaternion().setFromAxisAngle(rotateAxis, (this.rotateStart - e.rotation) * Math.PI / 180));
      this.selectedStickerObject.quaternion.copy(q);
    }
  };

  handleRotateEnd = () => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      this.handleTransform();
    }
  };

  handlePressUp = () => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      this.press = false;
      this.selectedStickerObject.parent.remove(this.translateZ);
    }
  };

  handlePress = () => {
    const { entityTracked, selectedSticker, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      this.press = true;
      this.translateZ.position.copy(this.selectedStickerObject.position);
      this.translateZ.scale.copy(this.selectedStickerObject.scale);
      this.selectedStickerObject.parent.add(this.translateZ);
    }
  };

  // 변경된 Sticker의 위치, 회전, 스케일을 저장 후 onStickerTransform 함수를 통해 Root로 해당 값을 전달한 뒤 Reducer에 Action을 Dispatch함.
  handleTransform = () => {
    const { width, height } = this.props.data.entity.size;
    const { position, quaternion, scale } = this.selectedStickerObject;

    const realDiagonal = Math.sqrt((width * width) + (height * height));
    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    this.props.onStickerTransform(this.props.selectedSticker.id, {
      position: {
        x: position.x,
        y: position.y,
        z: position.z,
      },
      quaternion: {
        x: quaternion.x,
        y: quaternion.y,
        z: quaternion.z,
        w: quaternion.w,
      },
      scale: scale.x / realToClamped,
    });

    this.debouncedAddStickerPos(TRANSFORM);
  };

  // type => transform, zoomin, zoomout
  addStickerPos = (type) => {
    const { width, height } = this.props.data.entity.size;
    const { position, quaternion, scale } = this.selectedStickerObject;
    const realDiagonal = Math.sqrt((width * width) + (height * height));
    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    const { currentStickerPosArray } = this.state;

    if (currentStickerPosArray.length === 0) {
      this.setState((prevState) => {
        const initialStickerPos = {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          quaternion: {
            x: 0,
            y: 0,
            z: 0,
            w: 0,
          },
          scale: 1,
        };

        return {
          currentStickerPosArray:
            [...prevState.currentStickerPosArray,
              initialStickerPos,
              {
                position: {
                  x: position.x,
                  y: position.y,
                  z: position.z,
                },
                quaternion: {
                  x: quaternion.x,
                  y: quaternion.y,
                  z: quaternion.z,
                  w: quaternion.w,
                },
                scale: scale.x / realToClamped,
              }
            ]
        }
      });
    }

    switch(type) {
      case TRANSFORM :
        this.setState((prevState) => {
          return {
            currentStickerPosArray:
              [...prevState.currentStickerPosArray,
                {
                  position: {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                  },
                  quaternion: {
                    x: quaternion.x,
                    y: quaternion.y,
                    z: quaternion.z,
                    w: quaternion.w,
                  },
                  scale: scale.x / realToClamped,
                }
              ]
          };
        });
        break;
      case ZOOM_IN:
        this.setState((prevState) => {
          return {
            currentStickerPosArray:
              [...prevState.currentStickerPosArray,
                {
                  position: {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                  },
                  quaternion: {
                    x: quaternion.x,
                    y: quaternion.y,
                    z: quaternion.z,
                    w: quaternion.w,
                  },
                  scale: (scale.x / realToClamped) + 0.2,
                }
              ]
          };
        });
        break;

      case ZOOM_OUT:
        this.setState((prevState) => {
          return {
            currentStickerPosArray:
              [...prevState.currentStickerPosArray,
                {
                  position: {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                  },
                  quaternion: {
                    x: quaternion.x,
                    y: quaternion.y,
                    z: quaternion.z,
                    w: quaternion.w,
                  },
                  scale: (scale.x / realToClamped) - 0.2,
                }
              ]
          };
        });
        break;
    }
    // console.warn(this.state.currentStickerPosArray);
  };

  unDoStickerPos = () => {
    const { currentStickerPosArray } = this.state;
    const length = currentStickerPosArray.length;
    // if (length > 0) {
    if (length > 1) {
      const pos = currentStickerPosArray[length - 2];
      this.props.onStickerTransform(this.props.selectedSticker.id, {
        position: {
          x: pos.position.x,
          y: pos.position.y,
          z: pos.position.z,
        },
        quaternion: {
          x: pos.quaternion.x,
          y: pos.quaternion.y,
          z: pos.quaternion.z,
          w: pos.quaternion.w,
        },
        scale: pos.scale,
      });

      this.setState((prevState) => {
        return {
          currentStickerPosArray: prevState.currentStickerPosArray.slice(0, length - 1),
        };
      });

      console.warn(this.state.currentStickerPosArray);
    }
  };

  render() {
    const { mode, messagePrivacyOpen } = this.state;

    const {
      data,
      selectedSticker,
      onStickerClick,
      entityTracked,
      onPublicChange,
      onClose,
      onSubmit,
      onTextInput,
      onEmojiInput,
      onTransformationComplete,
      onDelete,
      onReset,
      onHelpClick,
      onTipClick,
      onStickerTransform,
      onZoomIn,
      onZoomOut,
      onColorChange,
      ...other
    } = this.props;

    const {
      public: isPublic,
      submitting,
      error,
      entity,
      stickers,
    } = data;

    const nextDisabled = stickers.allIds.length === 0 || submitting;
    const stickersArray = stickers.allIds.map(id => stickers.byId[id]);

    // 현재 조작하고있는 스티커의 Text 값을 얻어옴 (Color Picker에 전달 목적)
    const selectedStickerText =
      ((this.selectedStickerObject && this.selectedStickerObject.element)
        ? this.selectedStickerObject.element.innerText
        : null);

    // 입력할 스티커를 선택하고, 이동할 AR컨텐츠를 touch제스쳐로 이동시킬수 있을때의 화면을 나타낸다.
    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id && mode !== 'color'
    ) {
      return (
        <div {...other}>
          <Transformation
            onComplete={onTransformationComplete}
            onTipClick={onTipClick}
            //TODO: Transformation에 mode를 넘겨주어야 함.
            onDelete={() => {
              this.setState({
                currentStickerPosArray: [],
              });
              onDelete();
            }}
            onReset={() => {
              this.setState({
                currentStickerPosArray: [],
              });
              onReset();
            }}
            onZoomIn={() => {
              this.debouncedAddStickerPos(ZOOM_IN);
              onZoomIn();
            }}
            onZoomOut={() => {
              this.debouncedAddStickerPos(ZOOM_OUT);
              onZoomOut();
            }}
            onUndo={this.unDoStickerPos}
            isTextMode={this.state.isTextMode}

            onColorPickerOpen={() => {
              this.setState({
                mode: 'color',
              });
            }}
          />
        </div>
      );
    }

    // text입력 모드가 켜졌을 때 동작하는 조건부 렌더링 컴포넌트이다.
    if (mode === 'text') {
      return (
        <div {...other}>
          <TextInput
            entity={entity}
            entityTracked={entityTracked}
            onComplete={(value) => {
              const { selectedTextColor } = this.state;

              this.setState({ mode: 'default' }, () => {
                // 텍스트의 갯수가 0개라면 그냥 AR화면을 띄워줌.
                if (value.length === 0) {
                  this.renderAR(this.props);
                } else if (onTextInput) {
                  onTextInput(value, selectedTextColor);
                }
              });
            }}
            onClose={() => {
              this.setState({ mode: 'default' }, () => {
                this.renderAR(this.props);
              });
            }}
          />
        </div>
      );
    }

    return (
      <div {...other}>
        {mode === 'default' && entityTracked && [
          // 하단 버튼들에 대한 컨테이너를 추가
          <BottomButtonContainer bottom="12px" marginItems="2px" key={3}>
            <ImageButton>
              <img
                onClick={onHelpClick}
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_question_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_question_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589793948/assets/btn_question_3x.png 3x
              "/>
            </ImageButton>

            <ImageButton
              imageWidth="70px"
              onClick={onClose}
            >
              <img
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589964785/assets/btn-remove_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589964785/assets/btn-remove_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589964785/assets/btn-remove_3x.png 3x
              "/>
            </ImageButton>

            <ImageButton
              onClick={onClose}
            >
              <img
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589961657/assets/btn_not_all_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589961657/assets/btn_not_all_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589961657/assets/btn_not_all_3x.png 3x
              "/>
            </ImageButton>
          </BottomButtonContainer>,
          // 하단 이모지 및 텍스트 추가 버튼
          <BottomActionsAddContent
            key={4}
          >
            <ImageButton>
              <img
                onClick={() => this.setState({ mode: 'emoji', isTextMode: false, selectedTextColor: '#ffffff' }, () => {
                  // const e = letsee.getEntity('assets/bts.json');
                  // e.removeRenderable(this.messageObject);
                })}
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589874021/assets/ico-emoticon_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874021/assets/ico-emoticon_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874021/assets/ico-emoticon_3x.png 3x
              "/>
            </ImageButton>
            <ImageButton>
              <img
                onTouchEnd={() => this.setState({ mode: 'text', isTextMode: true, selectedTextColor: '#ffffff'  }, () => {
                  // const e = letsee.getEntity('assets/bts.json');
                  // e.removeRenderable(this.messageObject);
                })}
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-text_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-text_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-text_3x.png 3x
              "/>
            </ImageButton>
          </BottomActionsAddContent>,

          // 우측 하단의 남기기버튼
          // 현재 추가한 스티커의 갯수를 확인하여 남긴 스티커가 있을때에만 활성화 버튼을 표시함.
          (stickersArray.length === 0) ? <StyledDisabledSaveButton key={5}/>: <StyledSaveButton key={6} onClick={() => this.setState({ messagePrivacyOpen: true })}/>,

          messagePrivacyOpen && (
            <MessagePrivacy
              key={7}
              error={error}
              submitting={submitting}
              entity={entity}
              public={isPublic}
              onPublicChange={onPublicChange}
              onSubmit={onSubmit}
              onClose={() => this.setState({ messagePrivacyOpen: false })}
            />
          ),
        ]}
        {/*Entity가 Tracking 중이지 않을때 아래 가이드가 나와야 하지만 현재 entityTracked가 false일때 이벤트가 전달되지 않아서 동작하지 않음*/}
        {mode === 'default' && !entityTracked && [
          <NavTopCenter key={0}>
            스티커 만드는 중
          </NavTopCenter>,

          <TargetGuide key={1}>
            <TrackMessage>
              {entity.image && (
                <TrackMessageImage
                  src={entity.image}
                  alt={`${entity.name}의 정면을 비춰주세요`}
                />
              )}

              <TrackMessageText>
                {entity.name}의 정면을 비춰주세요

                <StyledHelpButton onClick={onHelpClick} />
              </TrackMessageText>
            </TrackMessage>
          </TargetGuide>,

          <StyledTipButton key={4} onClick={onTipClick} />,

          messagePrivacyOpen ? (
            <MessagePrivacy
              key={5}
              error={error}
              submitting={submitting}
              entity={entity}
              public={isPublic}
              onPublicChange={onPublicChange}
              onSubmit={onSubmit}
              onClose={() => this.setState({ messagePrivacyOpen: false })}
            />
          ) : null,
        ]}

        {mode === 'emoji' && (
          <Transition
            in={mode === 'emoji'}
            timeout={transitionDuration}
            mountOnEnter
            unmountOnExit
          >
            {state => (
              <EmojiDrawer
                style={{
                  opacity: 0,
                  transform: 'translateY(100%)',
                  transition: `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`,
                  ...transitionStyles[state],
                }}
                onClick={(emoji) => {
                  this.setState({ mode: 'default' }, () => {
                    if (onEmojiInput) {
                      onEmojiInput(emoji);
                    }
                  });
                }}
                onClose={() => {
                  this.setState({ mode: 'default' }, () => {
                    this.renderAR(this.props);
                  });
                }}
              />
            )}
          </Transition>
        )}

        {mode === 'color' && (
          <ColorPicker
            selectedStickerText={selectedStickerText}
            onClose={() => {
              this.setState({ mode: 'default' }, () => {
                this.renderAR(this.props);
              });
            }}

            // 색상이 선택되면 텍스트의 색상을 변경한뒤 messageForm store에 해당 색상 값을 갱신함.
            onSelectedTextColor={color => () => {
              this.setState({ mode: 'default', selectedTextColor: color }, () => {
                this.renderAR(this.props);
                onColorChange(color);
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default MessageForm;
