// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import Button from '../Button';

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
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.5px;
  padding-top: 24px;
`;

const Subtitle = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  margin-top: 7px;
  font-size: 13px;
  letter-spacing: -0.5px;
  color: rgba(0, 0, 0, 0.7);
`;

const Actions = styled.div`
  margin-top: 19px;
  text-align: center;
`;

const Action = Button.extend`
  display: inline-block;

  & + & {
    margin-left: 20px;
  }
`;

const ActionImage = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 7px;
`;

const ActionText = styled.div`
  text-align: center;
  font-size: 11px;
  color: #000;
`;

const StyledCloseButton = styled(CloseButton)`
  margin: 8px auto 0 auto;
`;

type ShareModalPropTypes = {
  onCaptureClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onKakaoLinkClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class ShareModal extends Component {
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

  props: ShareModalPropTypes;
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
    const {
      onClose,
      onCaptureClick,
      onKakaoLinkClick,
      children,
      ...other
    } = this.props;

    return (
      <Container {...other}>
        <Body innerRef={(body) => { this.body = body; }}>
          <Title>이 스티커를 친구와 공유하기</Title>
          <Subtitle>화면 캡쳐 또는 카카오톡 링크로 공유 할 수 있습니다</Subtitle>

          <Actions>
            <Action
              type="button"
              onClick={onCaptureClick}
            >
              <ActionImage
                src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503282193/assets/btn-screen-share_3x.png"
                srcSet="
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503282193/assets/btn-screen-share_3x.png 2x,
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503282193/assets/btn-screen-share_3x.png 3x
                "
                alt="화면 캡쳐"
              />

              <ActionText>화면 캡쳐</ActionText>
            </Action>

            <Action
              type="button"
              onClick={onCaptureClick}
            >
              <ActionImage
                src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1503282193/assets/btn-link-share_3x.png"
                srcSet="
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1503282193/assets/btn-link-share_3x.png 2x,
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1503282193/assets/btn-link-share_3x.png 3x
                "
                alt="카카오톡 링크"
              />

              <ActionText>카카오톡 링크</ActionText>
            </Action>
          </Actions>

          <StyledCloseButton color="black" onClick={onClose} />
        </Body>
      </Container>
    );
  }
}

ShareModal.propTypes = {
  onCaptureClick: PropTypes.func, // eslint-disable-line react/require-default-props
  onClose: PropTypes.func, // eslint-disable-line react/require-default-props
  onKakaoLinkClick: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default ShareModal;
