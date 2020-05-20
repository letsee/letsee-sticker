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
import EmojiDrawer from './EmojiDrawer';
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

const NavTopLeft = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
`;

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

const NavBottomRight = styled.div`
  position: absolute;
  bottom: 139px;
  right: 4px;
`;

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

const StyledAddTextButton = styled(AddTextButton)`
  margin-top: 6px;
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

// BottomActionsContainer
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
  width: 180px;
  height: 80px;
  
  img {
    width: 75px;
    height: 75px;
  }
  
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
      messagePrivacyOpen: false,
    };

    this.messageObject = new letsee.Object3D();
    this.selectedStickerObject = null;

    const tmp = document.createElement('template');
    tmp.innerHTML = renderToString(<TranslateZ />);
    this.translateZ = new letsee.DOMRenderable(tmp.content.firstChild);
    this.translateZ.rotateX(Math.PI / 2);
    this.press = false;
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

    // const entity = letsee.getEntity(this.props.data.entity.uri);
    // entity.removeRenderables();
    this.messageObject.children.forEach((item) => {
      entity.removeRenderable(item);
    });
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

    const entity = letsee.getEntity('assets/bts.json');
    
    this.messageObject.children.forEach((item) => {
      entity.removeRenderable(item);
    });
    // entity.removeRenderable(this.messageObject);
    this.selectedStickerObject = null;
  }

  props: MessageFormPropTypes;
  press: boolean;

  renderAR({ data: { entity: { uri, size }, stickers }, selectedSticker }: MessageFormPropTypes) {
    if (this.state.mode !== 'default') {
      return;
    }

    const entity = letsee.getEntity(`assets/bts.json`);
    const { width, height, depth } = size;
    const stickersArray = stickers.allIds.map(id => stickers.byId[id]);
    let realDiagonal = MAX_DIAGONAL;

    if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
      realDiagonal = Math.sqrt((width * width) + (height * height));
    }

    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    this.selectedStickerObject = null;

    if (this.messageObject.parent !== entity.object) {
      entity.addRenderable(this.messageObject);
    }

    for (let i = this.messageObject.children.length; i >= 0; i -= 1) {
      const child = this.messageObject.children[i];

      if (child) {
        const index = stickersArray.findIndex(sticker => sticker.id === child.uuid);

        if (index < 0) {
          this.messageObject.remove(child);
        }
      }
    }

    if (stickersArray.length === 0) {
      const buttonsTmp = document.createElement('template');
      const framesTmp = document.createElement('template');

      buttonsTmp.innerHTML = renderToString(
        <div>
          <AddEmojiButtonAR size={diagonal} />
          <AddTextButtonAR size={diagonal} />
        </div>,
      );

      framesTmp.innerHTML = renderToString(
        <div>
          <FrameAR
            width={140}
            height={140}
            vertical={0}
            horizontal={0}
            white
          />
        </div>,
      );

      const buttonsElem = buttonsTmp.content.firstChild;
      const framesElem = framesTmp.content.firstChild;

      const addEmojiButton = buttonsElem.querySelectorAll('button')[0];
      const addTextButton = buttonsElem.querySelectorAll('button')[1];
      
      //TODO: 버튼이벤트가 동작하지 않음.. z-index로 가려지는 현상..
      addEmojiButton.addEventListener('click', () => {
        this.setState({ mode: 'emoji' }, () => {
          entity.removeRenderable(this.messageObject);
        });
      });

      addTextButton.addEventListener('click', () => {
        this.setState({ mode: 'text' }, () => {
          entity.removeRenderable(this.messageObject);
        });
      });

      const buttonsAR = new letsee.DOMRenderable(buttonsElem);
      const framesAR = new letsee.DOMRenderable(framesElem);

      if (realDiagonal !== diagonal) {
        buttonsAR.scale.setScalar(realToClamped);
      }

      if (typeof depth !== 'undefined' && depth !== null) {
        // framesAR.position.setZ(depth / 2);
        // buttonsAR.position.setZ(depth / 2);
        framesAR.position.setZ(10);
        buttonsAR.position.setZ(10);
      }

      this.messageObject.add(framesAR);
      this.messageObject.add(buttonsAR);
      this.messageObject.position.z = - 10;
    } else {
      for (let i = 0; i < stickersArray.length; i += 1) {
        const { id, type, text, position, quaternion, scale } = stickersArray[i];
        const selected = selectedSticker && selectedSticker.id === id;
        const textWithBreaks = text.replace(/[\n\r]/g, '<br />');
        const objById = getObjectById(this.messageObject, id);
        let element = document.createElement('div');
        let obj = new letsee.DOMRenderable(element);

        if (objById) {
          obj = objById;
          element = obj.element;
        } else {
          obj.uuid = id;
          this.messageObject.add(obj);
        }

        element.className = styles[type];

        if (type === 'emoji') {
          const fontSize = diagonal * 0.22;
          element.style.fontSize = `${fontSize}px`;
          element.style.letterSpacing = `${-fontSize * 3 / 94}px`;
        } else if (type === 'text') {
          const fontSize = diagonal * 0.11;
          element.style.fontSize = `${fontSize}px`;
          element.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
          element.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
        }

        if (selectedSticker && !selected) {
          element.style.opacity = '0.3';
        } else {
          element.style.opacity = '0.9';
        }

        const onClick = () => {
          element.removeEventListener('click', onClick);

          if (this.props.onStickerClick) {
            this.props.onStickerClick(id);
          }
        };

        element.addEventListener('click', onClick);

        element.innerHTML = textWithBreaks;

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
          this.selectedStickerObject = obj;
        }

        obj.position.set(position.x, position.y, position.z);
        obj.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        obj.scale.setScalar(scale * realToClamped);
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
          const conjugate = this.selectedStickerObject.parent.worldQuaternion.conjugate();
          const translateX = new letsee.Vector3(1, 0, 0).applyQuaternion(conjugate).setLength(deltaX * ratio);
          const translateY = new letsee.Vector3(0, -1, 0).applyQuaternion(conjugate).setLength(deltaY * ratio);

          this.selectedStickerObject.position.set(x, y, z).add(translateX).add(translateY).set(
            clamp(this.selectedStickerObject.position.x, -1.5 * width, 1.5 * width),
            clamp(this.selectedStickerObject.position.y, -1.5 * height, 1.5 * height),
            z,
          );
        }
      } else if (pointers.length === 3 && !this.press) {
        const { x, y, z, w } = selectedSticker.quaternion;
        const q = new letsee.Quaternion(x, y, z, w);
        const conjugate = this.selectedStickerObject.parent.worldQuaternion.conjugate();
        const rotateX = new letsee.Vector3(1, 0, 0).applyQuaternion(conjugate).normalize();
        const rotateY = new letsee.Vector3(0, 1, 0).applyQuaternion(conjugate).normalize();
        q.multiply(new letsee.Quaternion().setFromAxisAngle(rotateX, deltaY * Math.PI / 180));
        q.multiply(new letsee.Quaternion().setFromAxisAngle(rotateY, deltaX * Math.PI / 180));
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
      const conjugate = this.selectedStickerObject.parent.worldQuaternion.conjugate();
      const translateX = new letsee.Vector3(1, 0, 0).applyQuaternion(conjugate).setLength(deltaX * ratio);
      const translateY = new letsee.Vector3(0, -1, 0).applyQuaternion(conjugate).setLength(deltaY * ratio);
      
      this.selectedStickerObject.position.set(x, y, z).add(translateX).add(translateY).set(
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
      const conjugate = this.selectedStickerObject.parent.worldQuaternion.conjugate();
      const rotateAxis = new letsee.Vector3(0, 0, 1).applyQuaternion(conjugate).normalize();
      const q = new letsee.Quaternion(x, y, z, w);
      q.multiply(new letsee.Quaternion().setFromAxisAngle(rotateAxis, (this.rotateStart - e.rotation) * Math.PI / 180));
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
  }

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

    // TransformGuide에 대한 props가 켜졌을때, 해당 TransformGuide를 보여주는
    // 조건부 렌더링 컴포넌트이다.
    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      return (
        <div {...other}>
          <Transformation
            onComplete={onTransformationComplete}
            onTipClick={onTipClick}
            onDelete={onDelete}
            onReset={onReset}
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
              this.setState({ mode: 'default' }, () => {
                if (value.length === 0) {
                  this.renderAR(this.props);
                } else if (onTextInput) {
                  onTextInput(value);
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
          // <NavTopLeft key={0}>
          //   <CloseButton onClick={onClose} />
          // </NavTopLeft>,

          <NavTopRight key={1}>
            <CompleteButton
              onClick={nextDisabled ? null : () => this.setState({ messagePrivacyOpen: true })}
              disabled={nextDisabled}
            />
          </NavTopRight>,

          // 우측 하단 이모지, Text 버튼 삭제
          // <NavBottomRight key={3}>
          //   <AddEmojiButton
          //     onClick={() => this.setState({ mode: 'emoji' }, () => {
          //       // const e = letsee.getEntity('assets/bts.json');
          //       // e.removeRenderable(this.messageObject);
          //     })}
          //     small
          //   />
          //
          //   <StyledAddTextButton
          //     onTouchEnd={() => this.setState({ mode: 'text' }, () => {
          //       // const e = letsee.getEntity('assets/bts.json');
          //       // e.removeRenderable(this.messageObject);
          //     })}
          //     small
          //   />
          // </NavBottomRight>,

          // 왼쪽 하단 TransformationGuide 화면 삭제
          // <StyledTipButton
          //   key={4}
          //   onClick={onTipClick}
          // />,
          
          // 하단 버튼에 대한 컨테이너를 추가한다.
          <BottomButtonContainer
            bottom="20px"
            marginItems="15px"
            key={3}>
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
                onClick={() => this.setState({ mode: 'emoji' }, () => {
                  // const e = letsee.getEntity('assets/bts.json');
                  // e.removeRenderable(this.messageObject);
                })}
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589874021/assets/ico-emoticon_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874021/assets/ico-emoticon_3x.png 1x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874021/assets/ico-emoticon_3x.png 2x
              "/>
            </ImageButton>
            <ImageButton>
              <img
                onTouchEnd={() => this.setState({ mode: 'text' }, () => {
                  // const e = letsee.getEntity('assets/bts.json');
                  // e.removeRenderable(this.messageObject);
                })}
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-text_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-text_3x.png 1x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589874022/assets/ico-text_3x.png 2x
              "/>
            </ImageButton>
          </BottomActionsAddContent>
          ,

          messagePrivacyOpen && (
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
          ),
        ]}

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

          // <NavTopLeft key={2}>
          //   <CloseButton onClick={onClose} />
          // </NavTopLeft>,

          <NavTopRight key={3}>
            <CompleteButton
              onClick={nextDisabled ? null : () => this.setState({ messagePrivacyOpen: true })}
              disabled={nextDisabled}
            />
          </NavTopRight>,

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
      </div>
    );
  }
}

export default MessageForm;
