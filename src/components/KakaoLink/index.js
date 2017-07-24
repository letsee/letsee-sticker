// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import CloseButton from '../CloseButton';
import CompleteButton from '../CompleteButton';

import kakaoLogo from './icn-kakao.png';
import kakaoLogo2x from './icn-kakao@2x.png';
import kakaoLogo3x from './icn-kakao@3x.png';

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
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Message = styled.div`
  user-select: none;
  font-family: AppleSDGothicNeo, sans-serif;
  line-height: 1.44;
  text-align: center;
  color: #fff;
  font-size: 18px;
`;

const KakaoButton = Button.extend`
  margin: 18px auto 0 auto;
  padding: 11px 23px 11px 10px;
  border-radius: 6px;
  border: solid 0.5px #f9e03d;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #f9e03d;
`;

const KakaoButtonImage = styled.img`
  object-fit: contain;
  vertical-align: middle;
  margin-right: 21px;
`;

const KakaoButtonText = styled.span`
  vertical-align: middle;
`;

const KakaoLink = ({
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
      <Message>
        <div>
          스티커를 확인할 수 있게
        </div>

        <div>
          카카오특 친구에게 렛시 링크를 보내세요!
        </div>
      </Message>

      <KakaoButton
        type="button"
        onClick={onKakaoLinkClick}
      >
        <KakaoButtonImage
          src={kakaoLogo}
          srcSet={`${kakaoLogo2x} 2x, ${kakaoLogo3x} 3x`}
          alt="카카오톡으로 링크 보내기"
        />

        <KakaoButtonText>카카오톡으로 링크 보내기</KakaoButtonText>
      </KakaoButton>
    </Body>
  </Container>
);

export default KakaoLink;
