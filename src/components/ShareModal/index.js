// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import Button, { ImageButton } from '../Button';
import { BottomButtonContainer } from '../Container';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

// const Body = styled.div`
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(255, 255, 255, 0.9);
//   box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.4);
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
// `;

const Title = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.5px;
  padding-top: 24px;
`;

const Subtitle = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  letter-spacing: -0.5px;
  color: #cccccc;
  margin-bottom: 40px;
`;

const Actions = styled.div`
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
  margin-bottom: 5px;
`;

const ActionText = styled.div`
  text-align: center;
  font-size: 12px;
  color: white;
`;

const StyledCloseButton = styled(CloseButton)`
  margin: 8px auto 0 auto;
`;

const Divider = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 0;
  opacity: 0.44;
  border: solid 1px #707070;
  margin-top: 21px;
  margin-bottom: 21px;
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

  componentWillUnmount() {
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
      <Container {...other} innerRef={(body) => { this.body = body; }}>>
        {/*<Body innerRef={(body) => { this.body = body; }}>*/}
        <Title>스티커 공유하기</Title>
        <Subtitle>
          화면 캡쳐 또는 SNS로 <br/>
          카카오톡 링크로 공유 할 수 있습니다
        </Subtitle>
  
        <Actions>
          <Action
            type="button"
            onClick={onCaptureClick}
          >
            <ActionImage
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-capture_3x.png"
              srcSet="
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-capture_3x.png 2x,
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-capture_3x.png 3x
                "
              alt="화면 캡쳐"
            />
      
            <ActionText>화면 캡쳐</ActionText>
          </Action>
        </Actions>
        
        <Divider/>
        
        <Actions>
          <Action
            type="button"
            onClick={onKakaoLinkClick}
          >
            <ActionImage
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-kakao_3x.png"
              srcSet="
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-kakao_3x.png 2x,
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-kakao_3x.png 3x
                "
              alt="카카오톡"
            />
    
            <ActionText>카카오톡</ActionText>
          </Action>
  
          <Action
            type="button"
            onClick={onKakaoLinkClick}
          >
            <ActionImage
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-insta_3x.png"
              srcSet="
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-insta_3x.png 2x,
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-insta_3x.png 3x
                "
              alt="인스타그램"
            />
    
            <ActionText>인스타그램</ActionText>
          </Action>
  
          <Action
            type="button"
            onClick={onKakaoLinkClick}
          >
            <ActionImage
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-twitter_3x.png"
              srcSet="
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-twitter_3x.png 2x,
                  https://res.cloudinary.com/dkmjrt932/image/upload/v1590141165/assets/ico-twitter_3x.png 3x
                "
              alt="트위터"
            />
    
            <ActionText>트위터</ActionText>
          </Action>
        </Actions>
  
        <BottomButtonContainer bottom="25px">
          <ImageButton
            imageWidth="60px"
            onClick={onClose}
          >
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 3x" />
          </ImageButton>
        </BottomButtonContainer>
  
        {/*<StyledCloseButton color="black" onClick={onClose} />*/}
        {/*</Body>*/}
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
