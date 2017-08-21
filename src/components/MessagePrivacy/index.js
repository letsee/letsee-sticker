// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import Button, { ImageButton } from '../Button';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Body = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.4);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  color: #000;
  font-size: 16px;
  letter-spacing: -0.5px;
  padding-top: 24px;
`;

const PrivacyRadio = Button.extend`
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: ${props => (props.checked ? '#000' : 'rgba(0, 0, 0, 0.4)')};
  margin: 11px auto 0 auto;
  vertical-align: middle;
`;

const PrivacyRadioImage = styled.img`
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
`;

const SubmitButton = Button.extend`
  margin: 17px auto 0 auto;
  border-radius: 31px;
  background-color: #00b1c7;
  padding: 12px 23.5px 9px 25.5px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: 0.4px;
  text-align: center;
  color: #fff;
`;

const StyledCloseButton = styled(CloseButton)`
  margin: 25px auto 0 auto;
`;

type MessagePrivacyPropTypes = {
  entity: {
    name: string,
  },
  onSubmit?: boolean => mixed, // eslint-disable-line react/require-default-props
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class MessagePrivacy extends Component {
  static propTypes = {
    entity: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func, // eslint-disable-line react/require-default-props
    onClose: PropTypes.func, // eslint-disable-line react/require-default-props
  };

  state = {
    public: true,
  };

  state: {
    public: boolean,
  };

  componentDidMount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.addEventListener('touchend', this.handleWindowClick);
    }
  }

  commponentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.removeEventListener('touchend', this.handleWindowClick);
    }
  }

  props: MessagePrivacyPropTypes;
  body: HTMLDivElement;

  handleWindowClick = (e: TouchEvent) => {
    let target = e.target;

    while (target !== document.body) {
      if (target === this.body || target === null) {
        return;
      }

      target = target.parentNode;
    }

    if (this.props.onClose) {
      this.props.onClose(e);
    }
  };

  render() {
    const { public: pub } = this.state;
    const {
      entity,
      onClose,
      onSubmit,
      children,
      ...other
    } = this.props;

    return (
      <Container {...other}>
        <Body innerRef={(body) => { this.body = body; }}>
          <Title>
            <div>멋진 스티커군요!</div>
            <div>이 스티커를 {entity.name}에 남길까요?</div>
          </Title>

          <PrivacyRadio
            type="button"
            checked={pub}
            onClick={() => {
              this.setState(prevState => ({ public: !prevState.public }));
            }}
          >
            {pub ? (
              <PrivacyRadioImage
                alt="전체 공개"
                src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1503285514/assets/check-all_3x.png"
                srcSet="
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1503285514/assets/check-all_3x.png 2x,
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1503285514/assets/check-all_3x.png 3x
                "
              />
            ) : (
              <PrivacyRadioImage
                alt="전체 공개"
                src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1503285514/assets/check-noall_3x.png"
                srcSet="
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1503285514/assets/check-noall_3x.png 2x,
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1503285514/assets/check-noall_3x.png 3x
                "
              />
            )}

            전체 공개
          </PrivacyRadio>

          <SubmitButton
            type="button"
            onClick={() => onSubmit && onSubmit(this.state.public)}
          >
            남기기
          </SubmitButton>

          <StyledCloseButton
            color="black"
            onClick={onClose}
          />
        </Body>
      </Container>
    );
  }
}

export default MessagePrivacy;
