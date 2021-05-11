// @flow
import React from 'react';
import styled from 'styled-components';
// import TargetGuide from './TargetGuide';
import HomeButton from './HomeButton';
import NewsButton from './NewsButton';
import HelpButton from './HelpButton';
import TransformationGuide from "./TransformationGuide";
import {closeTransformationGuide} from "../actions";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// 아이폰에서 겹침현상으로 인해 미디어쿼리 사용하여 반응형으로 위치조정 원래  top : 25px 이었음.
const TopTitleImage = styled.img`
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  @media (max-height: 670px) {
    top:2%;
  }
  @media (min-height: 671px) {
    top:3%;
  }
`;

const TargetGuide = styled.div`
  width: 80%;
  height: 68vh;
  margin: 0 10%;
  border: 2px solid #34A5AF;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TargetGuideText = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 1.4;
  color: white;
`;

const CopyrightText = styled.p`
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  bottom: 2%;
`;

const Bg = styled.div`
        width:100%;
        height:100%;
        position: fixed;
        left:0;
        top:0;
        background-color:#FD4D1E;
        opacity:.3;
`;

type AppLoaderPropTypes = {
  loadingEntity: boolean,
  onHelpClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onNewsClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};



const AppLoader = ({
  loadingEntity,
  onHelpClick,
  onNewsClick,
  children,
  currentEntity,
  ...other
}: AppLoaderPropTypes) => (
  <Container {...other}>
    {/*{!loadingEntity && (
        <Title>대상 인식하기</Title>
      )}*/}
      {currentEntity != null && (<Bg></Bg>)}

    <TopTitleImage
      src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/detect-title_3x.png"
      srcSet="
            https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/detect-title_3x.png 2x,
            https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/detect-title_3x.png 3x
          "
    />
    <TargetGuide>
      <TargetGuideText>
        휴대폰을 움직여 <br/>
        인식할 대상의 <br/>
        정면을 비춰주세요.<br/>
      </TargetGuideText>
    </TargetGuide>
    <CopyrightText>Copyright (c) Letsee, Inc</CopyrightText>
  </Container>
);

export default AppLoader;
