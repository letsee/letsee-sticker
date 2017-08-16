// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import BackButton from '../BackButton';
import CompleteButton from '../CompleteButton';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
`;

const Nav = styled.div`
  position: relative;
`;

const NavLeft = styled.div`
  position: absolute;
  left: 0;
  top: 25px;
`;

const NavRight = styled.div`
  position: absolute;
  right: 0;
  top: 25px;
`;

const Body = styled.div`
  position: absolute;
  left: 44px;
  right: 44px;
  top: 50%;
  transform: translateY(-50%);
`;

const Action = styled.div`
  max-width: 287px;
  width: 100%;
  margin: 0 auto;

  & + & {
    margin-top: 49px;
  }
`;

const Message = styled.div`
  user-select: none;
  font-family: AppleSDGothicNeo, sans-serif;
  color: #fff;
  font-size: 15px;
  opacity: 0.7;
`;

const StyledButton = Button.extend`
  width: 100%;
  margin-top: 8px;
  padding: 11px 10px;
  border-radius: 6px;
  border-style: solid;
  border-width: 0.5px;
  border-color: transparent;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const KakaoButton = StyledButton.extend`
  border-color: #f9e03d;
  color: #f9e03d;
`;

const CaptureButton = StyledButton.extend`
  border-color: #00c0d8;
  color: #00b1c7;
`;

const ButtonImage = styled.img`
  object-fit: contain;
  vertical-align: middle;
  margin-right: 16px;
`;

const ButtonText = styled.span`
  vertical-align: middle;
`;

type ShareModalPropTypes = {
  onCaptureClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onBack?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onComplete?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onKakaoLinkClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

const ShareModal = ({
  onCaptureClick,
  onBack,
  onComplete,
  onKakaoLinkClick,
  children,
  ...other
}: ShareModalPropTypes) => (
  <Container {...other}>
    <Nav>
      <NavLeft>
        <BackButton onTouchEnd={onBack} />
      </NavLeft>

      <NavRight>
        <CompleteButton onTouchEnd={onComplete} />
      </NavRight>
    </Nav>

    <Body>
      <Action>
        <Message>
          스티커 메세지를 친구가 볼 수 있게 카카오톡으로 스티커 링크를 보내세요!
        </Message>

        <KakaoButton
          type="button"
          onTouchEnd={onKakaoLinkClick}
        >
          <ButtonImage
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_32,q_auto/v1501870260/assets/icn-kakao_3x.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_64,q_auto/v1501870260/assets/icn-kakao_3x.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_96,q_auto/v1501870260/assets/icn-kakao_3x.png 3x
            "
            alt="카카오톡으로 링크 보내기"
          />

          <ButtonText>카카오톡으로 링크 보내기</ButtonText>
        </KakaoButton>
      </Action>

      <Action>
        <Message>
          비디오 또는 사진을 캡쳐해 SNS에 공유하세요!
        </Message>

        <CaptureButton
          type="button"
          onTouchEnd={onCaptureClick}
        >
          <ButtonImage
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_32,q_auto/v1501870262/assets/btn-capture_3x.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_64,q_auto/v1501870262/assets/btn-capture_3x.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_96,q_auto/v1501870262/assets/btn-capture_3x.png 3x
            "
            alt="영상을 캡쳐해 공유하기"
          />

          <ButtonText>영상을 캡쳐해 공유하기</ButtonText>
        </CaptureButton>
      </Action>
    </Body>
  </Container>
);

ShareModal.propTypes = {
  onCaptureClick: PropTypes.func, // eslint-disable-line react/require-default-props
  onBack: PropTypes.func, // eslint-disable-line react/require-default-props
  onComplete: PropTypes.func, // eslint-disable-line react/require-default-props
  onKakaoLinkClick: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default ShareModal;
