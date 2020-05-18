// @flow
import React from 'react';
import styled from 'styled-components';
// import TargetGuide from './TargetGuide';
import HomeButton from './HomeButton';
import NewsButton from './NewsButton';
import HelpButton from './HelpButton';

const TopTitleImage = styled.img`
  display: block;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

const TargetGuide = styled.div`
  width: 80%;
  height: 70vh;
  margin: 15vh 10%;
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
`;

const CopyrightText = styled.p`
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  bottom: 20px;
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
  ...other
}: AppLoaderPropTypes) => (
  <div {...other}>
    {/*{!loadingEntity && (*/}
    {/*  <Title>대상 인식하기</Title>*/}
    {/*)}*/}
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
    
  </div>
);

export default AppLoader;
