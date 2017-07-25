// @flow
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import CompleteButton from './CompleteButton';

const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

const TextareaContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  top: ${props => (props.focus ? 33 : 50)}%;
  transform: ${props => (props.focus ? 'none' : 'translateY(-50%)')};
  height: ${props => props.height}px;
`;

const Textarea = styled.textarea`
  display: block;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  resize: none;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 48px;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.5);

  &::placeholder {
    opacity: 0.5;
    color: #fff;
  }
`;

const StaticTextarea = Textarea.extend`
  width: 100%;
  height: 100%;
`;

type TextInputPropTypes = {
  entity: {
    uri: string,
    size: {
      width: number,
      height: number,
      depth: number,
    },
  },
  entityTracked: boolean,
  onComplete?: string => mixed, // eslint-disable-line react/require-default-props
};

class TextInput extends Component {
  constructor(props: TextInputPropTypes) {
    super(props);

    this.state = {
      focus: false,
      value: '',
      height: 1,
      selectionStart: 1,
      selectionEnd: 1,
      selectionDirection: 'none',
    };

    const tmp = document.createElement('template');
    tmp.innerHTML = renderToString(
      <Textarea
        placeholder="메세지를 입력해주세요"
        value={this.state.value}
      />,
    );

    this.textareaAR = tmp.content.firstChild;
    this.textareaAR.addEventListener('input', this.handleChange);

    if (!isIOS) {
      this.textareaAR.addEventListener('mouseup', this.setSelection);
      this.textareaAR.addEventListener('keyup', this.setSelection);
      this.textareaAR.addEventListener('focus', this.handleFocus);
    }
  }

  state: {
    focus: boolean,
    value: string,
    height: number,
    selectionStart: number,
    selectionEnd: number,
  };

  componentWillMount() {
    const { entityTracked, entity: { uri, size } } = this.props;
    const entity = letsee.getEntity(uri);

    entity.object.children.forEach((child) => {
      entity.object.remove(child);
    });

    entity.removeRenderables();

    if (entityTracked) {
      const { width, height, depth } = size;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        const diagonal = Math.sqrt(width * width + height * height);
        const fontSize = diagonal * 0.11 * 2;
        this.textareaAR.style.fontSize = `${fontSize}px`;
        this.textareaAR.style.letterSpacing = `${-fontSize * 0.8 / 48}px`;
        this.textareaAR.style.textShadow = `0 0 ${fontSize * 12 / 48}px rgba(0, 0, 0, 0.5)`;
      }

      this.textareaAR.value = this.state.value;

      const textarea = new DOMRenderable(this.textareaAR);

      if (typeof depth !== 'undefined' && depth !== null) { // TODO default Z?
        textarea.position.setZ(depth / 2);
      }

      textarea.scale.setScalar(0.5);
      entity.addRenderable(textarea);
    }
  }

  componentDidMount() {
    this.resizeTextarea();

    if (!isIOS) {
      this.setFocus();
    }
  }

  componentDidUpdate({ entityTracked }: TextInputPropTypes) {
    if (entityTracked !== this.props.entityTracked && !isIOS) {
      this.setFocus();
    }
  }

  componentWillUnmount() {
    const entity = letsee.getEntity(this.props.entity.uri);

    entity.object.children.forEach((child) => {
      entity.object.remove(child);
    });

    entity.removeRenderables();

    this.textareaAR.removeEventListener('input', this.handleChange);

    if (!isIOS) {
      this.textareaAR.removeEventListener('mouseup', this.setSelection);
      this.textareaAR.removeEventListener('keyup', this.setSelection);
      this.textareaAR.removeEventListener('focus', this.handleFocus);
    }
  }

  setFocus() {
    if (this.props.entityTracked) {
      setTimeout(() => {
        this.textareaAR.focus();
      }, 100);
    } else {
      setTimeout(() => {
        this.textarea.focus();
      }, 100);
    }
  }

  setSelection = (e: MouseEvent | KeyboardEvent) => {
    const { selectionStart, selectionEnd, selectionDirection } = e.target;

    this.setState({
      selectionStart,
      selectionEnd,
      selectionDirection,
    });
  };

  textarea: HTMLTextAreaElement;
  textareaAR: HTMLTextAreaElement;
  props: TextInputPropTypes;

  resizeTextarea() {
    const textarea = this.textarea;

    this.setState({
      height: 1,
    }, () => {
      this.setState({
        height: textarea.scrollHeight,
      });
    });
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      value,
    }, () => {
      this.textareaAR.value = value;
      this.resizeTextarea();
    });
  };

  handleFocus = (e: FocusEvent) => {
    const { selectionStart, selectionEnd, selectionDirection } = this.state;
    e.target.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  };

  render() {
    const { value, focus, height } = this.state;

    const {
      entity,
      entityTracked,
      onComplete,
      children,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <TextareaContainer
          visible={!entityTracked}
          focus={!isIOS && focus}
          height={height}
        >
          <StaticTextarea
            innerRef={(textarea) => { this.textarea = textarea; }}
            placeholder="메세지를 입력해주세요"
            value={value}
            onChange={this.handleChange}
            onMouseUp={!isIOS && this.setSelection}
            onKeyUp={!isIOS && this.setSelection}
            onFocus={!isIOS ? (e) => {
              this.handleFocus(e);
              this.setState({ focus: true });
            } : null}
            onBlur={!isIOS ? () => this.setState({ focus: false }) : null}
          />
        </TextareaContainer>

        <NavTopRight>
          <CompleteButton onClick={() => onComplete && onComplete(value.trim())} />
        </NavTopRight>
      </div>
    );
  }
}

export default TextInput;
