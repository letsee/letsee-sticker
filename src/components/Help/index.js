// @flow
// 맨처음 유저에게 가이드를 보여주는 캐서셀이 있는 화면에 대한 컴포넌
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/main.css';
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
      // top: 50%;
      // transform: translateY(-50%);
      height: 100%;
      
      .slider {
        height:100%
      }
      
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
      display: flex;
      position: absolute;
      top: 0;
      padding-inline-start: 0;

      @media (max-height: 567px) {
        top: 0px;
      }

      .dot {
        opacity: 1;
        box-shadow: none;
        border-radius: 0;
        border: solid 1px #00b1c7;
        width:100%;
        margin:0;
        // background: #00b1c7;
        background-color: transparent;

        &.selected {
          background: #00b1c7;
        }
      }
    }
  }
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  position: relative;
  width: 100%;
  height: 100%;
`;

const Page = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  color: #fff;
  user-select: none;
 
  
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  
  
  @media (max-height: 567px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
`;

const SkipButton = styled.button`
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 22px;
  font-style: bold;
  text-align: center;
  color: white;
  background-color: transparent !important;
  background-image: none !important;
  border: 0;
  outline: 0;
`;

const NextTutorialButton = styled.button`
  height: 44px;
  font-size: 18px;
  position: absolute;
  bottom: 0;
  background-color: #372B84 !important;
  border: 1px solid #372B84;
  color: white;
  text-align: center;
  border-radius: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 22px;
  outline: 0;
  
  
  font {
    font-size: 14px;tr
  }
  
  ${({bottom})=>
    bottom &&
      `bottom: ${bottom}`
  }
`
;
const Image = styled.img`
  display: block;
  margin: 0 auto 48px auto;
  width: auto;

  @media (max-height: 567px) {
    flex-shrink: 0;
    margin: 0 40px 0 0;
  }
`;

const AbsoluteImage = styled.img`
  position: absolute;
  display: block;
  width: auto;
  
  ${({top})=>
    top &&
      `top: ${top};`
  }
  
  ${({bottom})=>
    bottom &&
      `bottom: ${bottom};`
  }
  
  ${({left})=>
    left &&
      `left: ${left};`
  }
  
  ${({right})=>
    right &&
      `right: ${right};`
  }
  
  ${({translateX})=>
    translateX &&
      `transform: translateX(${translateX})`
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
  line-height: 1.5;
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
  children?: any, // eslint-disable-line react/require-default-props
};

let onPrevHandler, onNextHandler;

const onNext = () => {
  onNextHandler()
}

const Help = ({
  onCloseClick,
  children,
  ...other
}: HelpPropTypes) => (
  <Container {...other}>
    <StyledCarousel
      showArrows={true}
      renderArrowPrev={(prevHandler, hasNext, label) => {
        onPrevHandler = prevHandler
      }}
      renderArrowNext={(nextHandler, hasNext, label) => {
        onNextHandler = nextHandler
      }}

      {...settings}
    >
      {/*튜토리얼 1*/}
      <Page>
        <Image
          src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-1-gif_3x.gif"
          srcSet="
            https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-1-gif_3x.gif 2x,
            https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-1-gif_3x.gif 3x
          "
          alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <Text>
          <Body>
            <div>
              원활한 AR 사용을 위해
            </div>

            <div>
              <font color="#00b1c7">주변을 밝게 해주세요.</font>
            </div>
          </Body>
        </Text>

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>

        <NextTutorialButton bottom= "100px" onTouchEnd={onNext}>
          <font>1 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>

      </Page>
      {/*튜토리얼 2*/}
      <Page>
        <Image
          src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-2-gif_3x.gif"
          srcSet="
            https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-2-gif_3x.gif 2x,
            https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-2-gif_3x.gif 3x
          "
          alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <Text>
          <Body>
            <div> 휴대폰 움직여 </div>
            <div><font color="#00b1c7">인식할 대상의 정면</font>을</div>
            <div> 화면 가득히 비춰주세요. </div>
          </Body>
        </Text>

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>

        <NextTutorialButton bottom= "100px" onTouchEnd={onNext}>
          <font>2 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>
      </Page>
      {/*튜토리얼 3*/}
      <Page>
        <Image
          src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-3-gif_3x.gif"
          srcSet="
            https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-3-gif_3x.gif 2x,
            https://res.cloudinary.com/dkmjrt932/image/upload/v1590129895/assets/tutorial-pic-3-gif_3x.gif 3x
          "
          alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <Text>
          <Body>
            <div> 대상인식이 잘 안될 경우 </div>
            <div><font color="#00b1c7"> 대상과 약간의 거리를 두고</font> 비춰주시면 </div>
            <div> 보다 수월하게 인식이 됩니다. </div>
          </Body>
        </Text>

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>

        <NextTutorialButton bottom= "100px" onTouchEnd={onNext}>
          <font>3 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>
      </Page>

      {/*튜토리얼 4*/}
      <Page>
        <AbsoluteImage top="25px" right="5px"
          src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589616698/assets/ui-tutorials-1_3x.png"
          srcSet="
            https://res.cloudinary.com/dkmjrt932/image/upload/v1589609849/assets/ui-tutorials-1_3x.png 2x,
            https://res.cloudinary.com/dkmjrt932/image/upload/v1589609849/assets/ui-tutorials-1_3x.png 3x
          "
          alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>

        <NextTutorialButton bottom= "100px" onTouchEnd={onNext}>
          <font>4 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>
      </Page>

      {/*튜토리얼 5*/}
      <Page>
        <NextTutorialButton bottom= "200px" onTouchEnd={onNext}>
          <font>5 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>

        <AbsoluteImage bottom="50px"
                       left="50%"
                       translateX="-50%"
                       src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589942809/assets/ui-tutorials-2_3x.png"
                       srcSet="
                       https://res.cloudinary.com/dkmjrt932/image/upload/v1589942809/assets/ui-tutorials-2_3x.png 2x,
                       https://res.cloudinary.com/dkmjrt932/image/upload/v1589942809/assets/ui-tutorials-2_3x.png 3x
                       "
                       alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>
      </Page>

      {/*튜토리얼 6*/}
      <Page>

        <NextTutorialButton bottom= "200px" onTouchEnd={onNext}>
          <font>6 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>

        <AbsoluteImage bottom="50px"
                       left="50%"
                       translateX="-50%"
                       src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589616698/assets/ui-tutorials-3_3x.png"
                       srcSet="
                            https://res.cloudinary.com/dkmjrt932/image/upload/v1589609849/assets/ui-tutorials-3_3x.png 2x,
                            https://res.cloudinary.com/dkmjrt932/image/upload/v1589609849/assets/ui-tutorials-3_3x.png 3x
                        "
                       alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>
      </Page>

      {/*튜토리얼 7*/}
      <Page>

        <NextTutorialButton bottom= "200px" onTouchEnd={onNext}>
          <font>7 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>

        <AbsoluteImage bottom="50px"
                       left="50%"
                       translateX="-50%"
                       src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589942809/assets/ui-tutorials-4_3x.png"
                       srcSet="
                            https://res.cloudinary.com/dkmjrt932/image/upload/v1589942809/assets/ui-tutorials-4_3x.png 2x,
                            https://res.cloudinary.com/dkmjrt932/image/upload/v1589942809/assets/ui-tutorials-4_3x.png 3x
                        "
                       alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>
      </Page>

      {/*튜토리얼 8*/}
      <Page>

        <NextTutorialButton bottom= "100px" onTouchEnd={onNext}>
          <font>8 / 9</font>&nbsp; 계속보기
        </NextTutorialButton>

        <AbsoluteImage bottom="200px"
                       right="20px"
                       src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589616698/assets/ui-tutorials-5_3x.png"
                       srcSet="
                            https://res.cloudinary.com/dkmjrt932/image/upload/v1589609849/assets/ui-tutorials-5_3x.png 2x,
                            https://res.cloudinary.com/dkmjrt932/image/upload/v1589609849/assets/ui-tutorials-5_3x.png 3x
                        "
                       alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>
      </Page>

      {/*튜토리얼 9*/}
      <Page>

        <NextTutorialButton bottom= "60px" onTouchEnd={onCloseClick}>
          <font>9 / 9</font>&nbsp; 스티커 만들기
        </NextTutorialButton>

        <Image
           src="https://res.cloudinary.com/dkmjrt932/image/upload/v1590129897/assets/ui-tutorials-6-gif_3x.gif"
           srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1590129897/assets/ui-tutorials-6-gif_3x.gif 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1590129897/assets/ui-tutorials-6-gif_3x.gif 3x
            "
           alt="원활한 AR 사용을 위해 주변을 밝게 해주세요."
        />

        <Text>
          <Body>
            <div> 다양한 손가락의 제스쳐로 </div>
            <div> 스티커의 <font color="#00b1c7">위치이동,크기조절,회전</font>이 </div>
            <div> 가능합니다. </div>
          </Body>
        </Text>

        <SkipButton onTouchEnd={onCloseClick} >Skip</SkipButton>
      </Page>

    </StyledCarousel>
  </Container>
);

Help.propTypes = {
  onCloseClick: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default Help;
