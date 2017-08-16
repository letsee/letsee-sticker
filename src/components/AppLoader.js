// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import styled from 'styled-components';
import values from 'lodash/values';
import Frame from './Frame';
import HelpButton from './HelpButton';
import { Banner } from './NewsList/NewsItem';

const Text = styled.div`
  user-select: none;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: AppleSDGothicNeo, sans-serif;
  opacity: 0.8;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.8px;
  color: #fff;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
`;

const StyledHelpButton = styled(HelpButton)`
  position: absolute;
  top: 25px;
  right: 0;
`;

type AppLoaderPropTypes = {
  data?: { // eslint-disable-line react/require-default-props
    [key: string]: {
      image: string,
      description: string,
      timestamp: number,
    },
  },
  onHelpClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onBannerClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

const AppLoader = ({
  firebase,
  dispatch,
  data,
  onHelpClick,
  onBannerClick,
  children,
  ...other
}: AppLoaderPropTypes) => (
  <div {...other}>
    <Frame>
      <Text>
        <div>스티커 메세지를 남길</div>
        <div>대상을 비춰주세요</div>
      </Text>
    </Frame>

    <StyledHelpButton onTouchEnd={onHelpClick} />

    {isLoaded(data) && !isEmpty(data) && data && (
      <Banner
        data={values(data)[0]}
        onTouchEnd={onBannerClick}
      />
    )}
  </div>
);

export default firebaseConnect([{
  path: 'news',
  storeAs: 'banner',
  queryParams: ['orderByChild=timestamp', 'limitToLast=1'],
}])(connect(({ firebase: { data: { banner } } }) => ({ data: banner }))(AppLoader));
