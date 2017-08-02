// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CompleteButton from './CompleteButton';

const isIOS = typeof window !== 'undefined' && window !== null && /iPad|iPhone|iPod/.test(window.navigator.userAgent);

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

const TextareaContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 81px;
  bottom: ${props => (props.focus ? '50%' : '0')};
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
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
  font-family: 'Noto Sans KR Black', AppleSDGothicNeo, sans-serif;
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
    };
  }

  state: {
    focus: boolean,
    value: string,
    height: number,
  };

  componentDidMount() {
    this.resizeTextarea();

    if (!isIOS) {
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      this.textarea.focus();
    }, 100);
  }

  textarea: HTMLTextAreaElement;
  props: TextInputPropTypes;

  resizeTextarea() {
    const textarea = this.textarea;

    this.setState({ height: 1 }, () => {
      this.setState({ height: textarea.scrollHeight });
    });
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      value,
    }, () => {
      this.resizeTextarea();
    });
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
          focus={!isIOS && focus}
          height={height}
        >
          <StaticTextarea
            innerRef={(textarea) => { this.textarea = textarea; }}
            placeholder="메세지 입력"
            value={value}
            onChange={this.handleChange}
            onFocus={!isIOS ? () => {
              this.setState({ focus: true });
            } : null}
            onBlur={!isIOS ? () => this.setState({ focus: false }) : null}
          />
        </TextareaContainer>

        <NavTopRight>
          <CompleteButton onTouchEnd={() => onComplete && onComplete(value.trim())} />
        </NavTopRight>
      </div>
    );
  }
}

export default TextInput;
