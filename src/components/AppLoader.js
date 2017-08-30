// @flow
import React from 'react';
import styled from 'styled-components';
import TargetGuide from './TargetGuide';
import HomeButton from './HomeButton';
import NewsButton from './NewsButton';
import HelpButton from './HelpButton';

const TrackMessage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;

const TrackMessageImage = styled.img`
  display: block;
  margin: 0 auto 16px auto;
  opacity: 0.5;
`;

const TrackMessageText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: #fff;
`;

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  user-select: none;
  padding: 17px 0;
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const StyledHomeButton = styled(HomeButton)`
  position: absolute;
  top: 25px;
  left: 0;
`;

const StyledNewsButton = styled(NewsButton)`
  position: absolute;
  top: 25px;
  right: 0;
`;

const StyledHelpButton = styled(HelpButton)`
  display: inline-block;
  margin-left: 3px;
  vertical-align: middle;
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
    {!loadingEntity && (
      <Title>대상 인식하기</Title>
    )}

    {!loadingEntity && (
      <TargetGuide>
        <TrackMessage>
          <TrackMessageImage
            alt="인식 대상의 정면을 비춰주세요"
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_100,q_auto/v1501834819/assets/icon_sticker.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_200,q_auto/v1501834819/assets/icon_sticker.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_300,q_auto/v1501834819/assets/icon_sticker.png 3x
            "
          />

          <TrackMessageText>
            인식 대상의 정면을 비춰주세요

            <StyledHelpButton onTouchEnd={onHelpClick} />
          </TrackMessageText>
        </TrackMessage>
      </TargetGuide>
    )}

    <StyledHomeButton />

    <StyledNewsButton onTouchEnd={onNewsClick} />
  </div>
);

export default AppLoader;
