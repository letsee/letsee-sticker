// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import AddEmojiButton from './AddEmojiButton';
import AddTextButton from './AddTextButton';
import CloseButton from './CloseButton';
import NextButton from './NextButton';
import CaptureButton from './CaptureButton';
import EmojiDrawer from './EmojiDrawer';
import Frame from './Frame';
import TextInput from './TextInput';
import Transformation from './Transformation';
import Spinner from './Spinner';
import { getObjectById } from '../createOrUpdateStickerObject';
import styles from './App.scss';

const MAX_DIAGONAL = 500;
const MIN_DIAGONAL = 400;
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

const NavBottomLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
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
  entityTracked: boolean,
  nextDisabled: boolean,
  submitting: boolean,
  onStickerClick?: string => mixed, // eslint-disable-line react/require-default-props
  onTextInput?: string => mixed, // eslint-disable-line react/require-default-props
  onEmojiInput?: string => mixed, // eslint-disable-line react/require-default-props
  onTransformationComplete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onDelete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onCaptureClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onNext?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onClose?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

class MessageForm extends Component {
  constructor(props: MessageFormPropTypes) {
    super(props);

    this.state = {
      mode: 'default',
    };

    this.messageObject = new Object3D();
  }

  state: {
    mode: 'default' | 'text' | 'emoji',
  };

  componentWillMount() {
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
    const entity = letsee.getEntity(this.props.entity.uri);
    entity.removeRenderable(this.messageObject);
  }

  props: MessageFormPropTypes;

  renderAR({ entity: { uri, size }, stickers, onStickerClick }: MessageFormPropTypes) {
    if (this.state.mode !== 'default') {
      return;
    }

    const entity = letsee.getEntity(uri);
    const { width, height, depth } = size;

    if (this.messageObject.parent !== entity.object) {
      entity.addRenderable(this.messageObject);
    }

    for (let i = this.messageObject.children.length; i >= 0; i -= 1) {
      const child = this.messageObject.children[i];

      if (child) {
        const index = stickers.findIndex(sticker => child.uuid && sticker.id === child.uuid);

        if (index < 0) {
          this.messageObject.remove(child);
        }
      }
    }

    if (stickers.length === 0) {
      let realDiagonal = 500;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = Math.min(MAX_DIAGONAL, Math.max(realDiagonal, MIN_DIAGONAL));
      const realToClamped = realDiagonal / diagonal;
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
        const { id, type, text, position, rotation, scale, selected } = stickers[i];
        const textWithBreaks = text.replace(/[\n\r]/g, '<br />');
        const obj = getObjectById(this.messageObject, id);

        if (obj) {
          obj.element.className = styles[type];

          if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
            const diagonal = Math.sqrt(width * width + height * height);

            if (type === 'emoji') {
              const fontSize = diagonal * 0.22 * 2;
              obj.element.style.fontSize = `${fontSize}px`;
              obj.element.style.letterSpacing = `${-fontSize * 3 / 94}px`;
            } else if (type === 'text') {
              const fontSize = diagonal * 0.11 * 2;
              obj.element.style.fontSize = `${fontSize}px`;
              obj.element.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
              obj.element.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
            }
          }

          obj.element.innerHTML = textWithBreaks;
          obj.position.copy(position);
          obj.rotation.copy(rotation);
          obj.scale.setScalar(scale / 2);
        } else {
          const element = document.createElement('div');
          element.className = styles[type];

          if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
            const diagonal = Math.sqrt(width * width + height * height);

            if (type === 'emoji') {
              const fontSize = diagonal * 0.22 * 2;
              element.style.fontSize = `${fontSize}px`;
              element.style.letterSpacing = `${-fontSize * 3 / 94}px`;
            } else if (type === 'text') {
              const fontSize = diagonal * 0.11 * 2;
              element.style.fontSize = `${fontSize}px`;
              element.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
              element.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
            }
          }

          element.innerHTML = textWithBreaks; // TODO style, select, gesture events, selected
          const newObj = new DOMRenderable(element);
          newObj.position.set(position.x, position.y, position.z);
          newObj.rotation.set(rotation.x, rotation.y, rotation.z);
          newObj.scale.setScalar(scale / 2);
          this.messageObject.add(newObj);
        }
      }
    }
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
      onCaptureClick,
      onTextInput,
      onEmojiInput,
      onTransformationComplete,
      onDelete,
      ...other
    } = this.props;

    if (entityTracked && selectedSticker) {
      return (
        <div {...other}>
          <Transformation
            onComplete={onTransformationComplete}
            onDelete={onDelete}
          />
        </div>
      );
    }

    return (
      <div {...other}>
        {mode === 'default' && [
          <NavTopLeft key={0}>
            <CloseButton onClick={onClose} />
          </NavTopLeft>,

          entityTracked && (
            <NavTopRight key={1}>
              <div style={{ position: 'relative' }}>
                <NextButton
                  onClick={onNext}
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

          <NavBottomLeft key={2}>
            <CaptureButton onClick={onCaptureClick} />
          </NavBottomLeft>,

          entityTracked && (
            <NavBottomRight key={3}>
              <AddEmojiButton
                onClick={() => this.setState({ mode: 'emoji' }, () => {
                  const e = letsee.getEntity(entity.uri);
                  e.removeRenderable(this.messageObject);
                })}
                small
              />

              <StyledAddTextButton
                onClick={() => this.setState({ mode: 'text' })}
                small
              />
            </NavBottomRight>
          ),
          !entityTracked && (
            <Frame key={4}>
              <FrameText>
                <div>{entity.name}를</div>
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
