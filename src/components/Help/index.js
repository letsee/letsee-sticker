// @flow
import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/main.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import CloseButton from '../CloseButton';

import detectFrontImage from './icn-detect-help-1.png';
import detectFrontImage2x from './icn-detect-help-1@2x.png';
import detectFrontImage3x from './icn-detect-help-1@3x.png';

import registerImage from './icn-detect-help-2.png';
import registerImage2x from './icn-detect-help-2@2x.png';
import registerImage3x from './icn-detect-help-2@3x.png';

const settings = {
  showArrows: false,
  showStatus: false,
  showIndicators: true,
  showThumbs: false,
  infiniteLoop: false,
  emulateTouch: true,
};

const StyledCarousel = styled(Carousel)`
  .carousel {
    position: static;
    overflow: visible;

    .slider-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);

      .slide {
        background: transparent;

        img {
          width: auto;
          display: block;
        }
      }
    }

    .control-dots {
      position: absolute;
      top: 55px;
      bottom: auto;
      margin: 0;

      .dot {
        opacity: 1;
        background: #d8d8d8;
        box-shadow: none;

        &.selected {
          background: #00b1c7;
        }
      }
    }
  }
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
  width: 100%;
  height: 100%;
`;

const Page = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  color: #fff;
  user-select: none;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto 48px auto;
  width: auto;
`;

const Title = styled.div`
  font-size: 22px;
  opacity: 0.8;
  font-weight: bold;
  letter-spacing: -0.9px;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
`;

const Body = styled.div`
  opacity: 0.8;
  font-size: 18px;
  margin-top: 10px;
`;

const Contact = styled.div`
  opacity: 0.8;
  font-size: 14px;
  margin-top: 20px;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  bottom: 19px;
  left: 50%;
  transform: translateX(-50%);
`;

const Help = ({
  onCloseClick,
  children,
  ...other
}) => (
  <Container {...other}>
    <StyledCarousel {...settings}>
      <Page>
        <Image
          src={detectFrontImage}
          srcSet={`${detectFrontImage2x} 2x, ${detectFrontImage3x} 3x`}
          alt="인식 대상의 정면을 비추세요"
        />

        <div>
          <Title>
            인식 대상의 정면을 비추세요
          </Title>

          <Body>
            <div>
              증강현실 콘텐츠를 불러올 대상이 정면을
            </div>

            <div>
              화면 가득히 비추세요.
            </div>
          </Body>
        </div>
      </Page>

      <Page>
        <Image
          src={registerImage}
          srcSet={`${registerImage2x} 2x, ${registerImage3x} 3x`}
          alt="인식이 되지 않나요?"
        />

        <div>
          <Title>
            인식이 되지 않나요?
          </Title>

          <Body>
            <div>
              3~4초 이상 비춰도 인식이 안되면
            </div>

            <div>
              렛시에 등록되지 않은 대상입니다.
            </div>
          </Body>

          <Contact>
            <div>
              등록 문의
            </div>

            <div>
              contact@letsee.io
            </div>
          </Contact>
        </div>
      </Page>
    </StyledCarousel>

    <StyledCloseButton onTouchEnd={onCloseClick} />
  </Container>
);

export default Help;
