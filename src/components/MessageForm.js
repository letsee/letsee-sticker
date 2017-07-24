// @flow
import React, { Component } from 'react';
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
  entity: { uri: string, name: string },
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

  renderAR({ entity: { uri }, stickers, onStickerClick }: MessageFormPropTypes) {
    if (this.state.mode !== 'default') {
      return;
    }

    const entity = letsee.getEntity(uri);

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

    for (let i = 0; i < stickers.length; i += 1) {
      const { id, text, position, rotation, scale, selected } = stickers[i];
      const textWithBreaks = text.replace(/[\n\r]/g, '<br />');
      const obj = getObjectById(this.messageObject, id);

      if (obj) {
        obj.element.innerHTML = textWithBreaks;
        obj.position.copy(position);
        obj.rotation.copy(rotation);
        obj.scale.setScalar(scale);
      } else {
        const element = document.createElement('div');
        element.innerHTML = textWithBreaks; // TODO style, select, gesture events, selected
        const newObj = new DOMRenderable(element);
        newObj.position.set(position.x, position.y, position.z);
        newObj.rotation.set(rotation.x, rotation.y, rotation.z);
        newObj.scale.setScalar(scale);
        this.messageObject.add(newObj);
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
