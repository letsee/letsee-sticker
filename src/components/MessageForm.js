// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import clamp from 'lodash/clamp';
import { endsWithConsonant, isHangul } from 'hangul-js';
import AddEmojiButton from './AddEmojiButton';
import AddTextButton from './AddTextButton';
import CloseButton from './CloseButton';
import NextButton from './NextButton';
import EmojiDrawer from './EmojiDrawer';
import Frame from './Frame';
import TextInput from './TextInput';
import Transformation from './Transformation';
import Spinner from './Spinner';
import TranslateZ from './Transformation/TranslateZ';
import manager from '../manager';
import getObjectById from '../getObjectById';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../constants';
import styles from './App.scss';

const xAxis = new Vector3(1, 0, 0);
const yAxis = new Vector3(0, 1, 0);
const zAxis = new Vector3(0, 0, 1);

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

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NavBottomRight = styled.div`
  position: absolute;
  bottom: 80px;
  right: 10px;
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
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.8px;
  color: #fff;
`;

type MessageFormPropTypes = {
  entity: {
    uri: string,
    name: string,
    size: {
      width: number,
      height: number,
      depth: number,
    },
  },
  selectedSticker: {
    id: string,
    position: {
      x: number,
      y: number,
      z: number,
    },
    rotation: {
      x: number,
      y: number,
      z: number,
    },
    scale: number,
  } | null,
  entityTracked: boolean,
  nextDisabled: boolean,
  submitting: boolean,
  onStickerClick?: string => mixed, // eslint-disable-line react/require-default-props
  onTextInput?: string => mixed, // eslint-disable-line react/require-default-props
  onEmojiInput?: string => mixed, // eslint-disable-line react/require-default-props
  onTransformationComplete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onDelete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onNext?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onClose?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onTipClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

class MessageForm extends Component {
  constructor(props: MessageFormPropTypes) {
    super(props);

    this.state = {
      mode: 'default',
    };

    this.messageObject = new Object3D();
    this.selectedStickerObject = null;

    const tmp = document.createElement('template');
    tmp.innerHTML = renderToString(<TranslateZ />);
    this.translateZ = new DOMRenderable(tmp.content.firstChild);
    this.translateZ.rotateX(Math.PI / 2);
    this.press = false;
  }

  state: {
    mode: 'default' | 'text' | 'emoji',
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

    const entity = letsee.getEntity(this.props.entity.uri);
    entity.removeRenderables();
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: MessageFormPropTypes) {
    if (nextProps.entityTracked) {
      this.renderAR(nextProps);
    } else if (nextProps.selectedSticker) {
      nextProps.onTransformationComplete && nextProps.onTransformationComplete();
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

    const entity = letsee.getEntity(this.props.entity.uri);
    entity.removeRenderable(this.messageObject);
    this.selectedStickerObject = null;
  }

  props: MessageFormPropTypes;
  press: boolean;

  renderAR({ entity: { uri, size }, stickers, selectedSticker }: MessageFormPropTypes) {
    if (this.state.mode !== 'default') {
      return;
    }

    const entity = letsee.getEntity(uri);
    const { width, height, depth } = size;
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
        const index = stickers.findIndex(sticker => sticker.id === child.uuid);

        if (index < 0) {
          this.messageObject.remove(child);
        }
      }
    }

    if (stickers.length === 0) {
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
            width={width}
            height={height}
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

      addEmojiButton.addEventListener('click', () => {
        this.setState({ mode: 'emoji' }, () => {
          entity.removeRenderable(this.messageObject);
        });
      });

      addTextButton.addEventListener('click', () => {
        this.setState({ mode: 'text' });
      });

      const buttonsAR = new DOMRenderable(buttonsElem);
      const framesAR = new DOMRenderable(framesElem);

      if (realDiagonal !== diagonal) {
        buttonsAR.scale.setScalar(realToClamped);
      }

      if (typeof depth !== 'undefined' && depth !== null) {
        framesAR.position.setZ(depth / 2);
        buttonsAR.position.setZ(depth / 2);
      }

      this.messageObject.add(framesAR);
      this.messageObject.add(buttonsAR);
    } else {
      for (let i = 0; i < stickers.length; i += 1) {
        const { id, type, text, position, rotation, scale } = stickers[i];
        const selected = selectedSticker && selectedSticker.id === id;
        const textWithBreaks = text.replace(/[\n\r]/g, '<br />');
        const objById = getObjectById(this.messageObject, id);
        let element = document.createElement('div');
        let obj = new DOMRenderable(element);

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
          element.style.opacity = 0.3;
        } else {
          element.style.opacity = 1;
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
        obj.quaternion.setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
        obj.scale.setScalar(scale * realToClamped);
      }
    }
  }

  handlePanMove = (e) => {
    const { entityTracked, selectedSticker, entity, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      const { deltaX, deltaY, pointers } = e;

      if (pointers.length === 1) {
        const { width, height, depth } = entity.size;
        const { clientWidth, clientHeight } = document.documentElement;
        const realDiagonal = Math.sqrt((width * width) + (height * height)); // TODO depth??
        const ratio = realDiagonal / Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight) * 2;

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
          const { x, y } = selectedSticker.position;
          this.selectedStickerObject.position.x = clamp(x + deltaX * ratio, -1.5 * width, 1.5 * width);
          this.selectedStickerObject.position.y = clamp(y - deltaY * ratio, -1.5 * height, 1.5 * height);
        }
      } else if (pointers.length === 3 && !this.press) {
        const { x, y, z } = selectedSticker.rotation;
        const q = new Quaternion().setFromEuler(new Euler(x, y, z));
        q.multiply(new Quaternion().setFromAxisAngle(xAxis, deltaY * Math.PI / 180));
        q.multiply(new Quaternion().setFromAxisAngle(yAxis, deltaX * Math.PI / 180));
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
    const { entityTracked, selectedSticker, entity, onStickerTransform } = this.props;

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

      const { x, y } = selectedSticker.position;
      const { clientWidth, clientHeight } = document.documentElement;
      const ratio = realDiagonal / Math.sqrt((clientWidth * clientWidth) + (clientHeight * clientHeight)) * 2;
      this.selectedStickerObject.position.x = clamp(x + deltaX * ratio, -1.5 * width, 1.5 * width);
      this.selectedStickerObject.position.y = clamp(y - deltaY * ratio, -1.5 * height, 1.5 * height);
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
    const { entityTracked, selectedSticker, entity, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id &&
      !this.press
    ) {
      this.rotateStart = e.rotation;
    }
  }

  handleRotateMove = (e) => {
    const { entityTracked, selectedSticker, entity, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id &&
      !this.press
    ) {
      const { x, y, z } = selectedSticker.rotation;
      const q = new Quaternion().setFromEuler(new Euler(x, y, z));
      q.multiply(new Quaternion().setFromAxisAngle(zAxis, (this.rotateStart - e.rotation) * Math.PI / 180));
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

  handlePressUp = (e) => {
    const { entityTracked, selectedSticker, entity, onStickerTransform } = this.props;

    if (
      entityTracked && this.selectedStickerObject && selectedSticker && onStickerTransform &&
      this.selectedStickerObject.uuid === selectedSticker.id
    ) {
      this.press = false;
      this.selectedStickerObject.parent.remove(this.translateZ);
    }
  };

  handlePress = (e) => {
    const { entityTracked, selectedSticker, entity, onStickerTransform } = this.props;

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

  handleTransform() {
    const { width, height } = this.props.entity.size;
    const { position, rotation, scale } = this.selectedStickerObject;

    const realDiagonal = Math.sqrt((width * width) + (height * height));
    const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
    const realToClamped = realDiagonal / diagonal;

    this.props.onStickerTransform(this.props.selectedSticker.id, {
      position: {
        x: position.x,
        y: position.y,
        z: position.z,
      },
      rotation: {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      },
      scale: scale.x / realToClamped,
    });
  }

  render() {
    const { mode } = this.state;

    const {
      submitting,
      selectedSticker,
      entity,
      stickers,
      onStickerClick,
      entityTracked,
      onClose,
      onNext,
      nextDisabled,
      onTextInput,
      onEmojiInput,
      onTransformationComplete,
      onDelete,
      onTipClick,
      onStickerTransform,
      ...other
    } = this.props;

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
          />
        </div>
      );
    }

    const trimmedName = entity.name.trim();
    const lastChar = trimmedName.slice(-1);
    let suffix = '을(를)';

    if (isHangul(lastChar)) {
      suffix = endsWithConsonant(trimmedName) ? '을' : '를';
    }

    return (
      <div {...other}>
        {mode === 'default' && [
          <NavTopLeft key={0}>
            <CloseButton onTouchEnd={onClose} />
          </NavTopLeft>,

          entityTracked && (
            <NavTopRight key={1}>
              <div style={{ position: 'relative' }}>
                <NextButton
                  onTouchEnd={onNext}
                  disabled={nextDisabled}
                  hidden={submitting}
                />

                {submitting && (
                  <SpinnerContainer>
                    <Spinner />
                  </SpinnerContainer>
                )}
              </div>
            </NavTopRight>
          ),

          entityTracked && (
            <NavBottomRight key={3}>
              <AddEmojiButton
                onTouchEnd={() => this.setState({ mode: 'emoji' }, () => {
                  const e = letsee.getEntity(entity.uri);
                  e.removeRenderable(this.messageObject);
                })}
                small
              />

              <StyledAddTextButton
                onTouchEnd={() => this.setState({ mode: 'text' })}
                small
              />
            </NavBottomRight>
          ),
          !entityTracked && (
            <Frame key={4}>
              <FrameText>
                <div>{entity.name}{suffix}</div>
                <div>비춰주세요</div>
              </FrameText>
            </Frame>
          ),
        ]}

        {mode === 'text' && (
          <TextInput
            entity={entity}
            entityTracked={entityTracked}
            onComplete={(value) => {
              this.setState({ mode: 'default' }, () => {
                if (value.length === 0) {
                  this.renderAR(this.props);
                } else {
                  onTextInput && onTextInput(value);
                }
              });
            }}
          />
        )}

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
                  onEmojiInput && onEmojiInput(emoji);
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
      </div>
    );
  }
}

export default MessageForm;
