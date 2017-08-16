// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/main.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import CloseButton from '../CloseButton';

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

      @media (max-height: 567px) {
        top: 45px;
      }

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

  @media (max-height: 567px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Image = styled.img`
  display: block;
  margin: 0 auto 48px auto;
  width: auto;

  @media (max-height: 567px) {
    flex-shrink: 0;
    margin: 0 40px 0 0;
  }
`;

const Text = styled.div`
  @media (max-height: 567px) {
    width: 100%;
    max-width: 319px;
    flex-grow: 1;
  }
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

type HelpPropTypes = {
  onCloseClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
};

const Help = ({
  onCloseClick,
  children,
  ...other
}: HelpPropTypes) => (
  <Container {...other}>
    <StyledCarousel {...settings}>
      <Page>
        <Image
          src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_90/v1501835747/assets/icn-detect-help-1_3x.png"
          srcSet="
            https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_180/v1501835747/assets/icn-detect-help-1_3x.png 2x,
            https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_270/v1501835747/assets/icn-detect-help-1_3x.png 3x
          "
          alt="인식 대상의 정면을 비추세요"
        />

        <Text>
          <Title>
            인식 대상의 정면을 비추세요
          </Title>

          <Body>
            <div>
              증강현실 콘텐츠를 불러올 대상의 정면을
            </div>

            <div>
              화면 가득히 비추세요.
            </div>
          </Body>
        </Text>
      </Page>

      <Page>
        <Image
          src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_90/v1501835802/assets/icn-detect-help-2_3x.png"
          srcSet="
            https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_180/v1501835802/assets/icn-detect-help-2_3x.png 2x,
            https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_270/v1501835802/assets/icn-detect-help-2_3x.png 3x
          "
          alt="인식이 되지 않나요?"
        />

        <Text>
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
        </Text>
      </Page>
    </StyledCarousel>

    <StyledCloseButton onTouchEnd={onCloseClick} />
  </Container>
);

Help.propTypes = {
  onCloseClick: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default Help;
