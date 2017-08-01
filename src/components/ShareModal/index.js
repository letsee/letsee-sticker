// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import CloseButton from '../CloseButton';
import CompleteButton from '../CompleteButton';

import kakaoLogo from './icn-kakao.png';
import kakaoLogo2x from './icn-kakao@2x.png';
import kakaoLogo3x from './icn-kakao@3x.png';

import captureLogo from './btn-capture.png';
import captureLogo2x from './btn-capture@2x.png';
import captureLogo3x from './btn-capture@3x.png';

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

const KakaoLink = ({
  onCaptureClick,
  onClose,
  onComplete,
  onKakaoLinkClick,
  children,
  ...other
}) => (
  <Container {...other}>
    <Nav>
      <NavLeft>
        <CloseButton onClick={onClose} />
      </NavLeft>

      <NavRight>
        <CompleteButton onClick={onComplete} />
      </NavRight>
    </Nav>

    <Body>
      <Action>
        <Message>
          스티커 메세지를 친구가 볼 수 있게 카카오톡으로 스티커 링크를 보내세요!
        </Message>

        <KakaoButton
          type="button"
          onClick={onKakaoLinkClick}
        >
          <ButtonImage
            src={kakaoLogo}
            srcSet={`${kakaoLogo2x} 2x, ${kakaoLogo3x} 3x`}
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
          onClick={onCaptureClick}
        >
          <ButtonImage
            src={captureLogo}
            srcSet={`${captureLogo2x} 2x, ${captureLogo3x} 3x`}
            alt="영상을 캡쳐해 공유하기"
          />

          <ButtonText>영상을 캡쳐해 공유하기</ButtonText>
        </CaptureButton>
      </Action>
    </Body>
  </Container>
);

export default KakaoLink;
