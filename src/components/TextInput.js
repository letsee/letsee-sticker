// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import { enableManager } from '../manager';

const InputButton = Button.extend`
  position: absolute;
  top: 25px;
  right: 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: 0.4px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  padding: 17px 16.5px
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
  width: 100%;
  height: 100%;

  &::placeholder {
    opacity: 0.5;
    color: #fff;
  }
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
  children?: any, // eslint-disable-line react/require-default-props
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
    enableManager(false);
    this.resizeTextarea();

    setTimeout(() => {
      this.textarea.focus();
    }, 200);
  }

  componentWillUnmount() {
    enableManager(true);
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
          focus={focus}
          height={height}
        >
          <Textarea
            innerRef={(textarea) => { this.textarea = textarea; }}
            placeholder="메세지 입력"
            value={value}
            onChange={this.handleChange}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
          />
        </TextareaContainer>

        <InputButton onClick={() => onComplete && onComplete(value.trim())}>
          입력
        </InputButton>
      </div>
    );
  }
}

TextInput.propTypes = {
  entity: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    size: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  entityTracked: PropTypes.bool.isRequired,
  onComplete: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default TextInput;
