// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import NewsItem from './NewsItem';
import Button from '../Button';
import CloseButton from '../CloseButton';
import Spinner from '../Spinner';
import { enableManager } from '../../manager';

import errorImage from './icn-entity-error.png';
import errorImage2x from './icn-entity-error@2x.png';
import errorImage3x from './icn-entity-error@3x.png';

import emptyImage from './icn-noentity.png';
import emptyImage2x from './icn-noentity@2x.png';
import emptyImage3x from './icn-noentity@3x.png';

import exampleImage from './img-sample.jpg';
import exampleImage2x from './img-sample@2x.jpg';
import exampleImage3x from './img-sample@3x.jpg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
`;

const Nav = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 42px 0 16px 0;
  box-shadow: inset 0 -1px 0 0 #e9e9e9;
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 18px;
  letter-spacing: -0.8px;
  color: #000;
  background-color: #fff;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  left: 0;
  top: 25px;
`;

const NavRight = Button.extend`
  position: absolute;
  padding: 19px 17px 15px 17px;
  right: 0;
  top: 25px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: -0.8px;
  text-align: center;
  color: #00b1c7;
`;

const ResultContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ResultMessageImage = styled.img`
  display: block;
  margin: 0 auto 12px auto;
  object-fit: contain;
`;

const ResultMessageText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 15px;
  letter-spacing: -0.2px;
  color: #8d8d8d;
`;

const List = styled.ul`
  position: absolute;
  top: 78px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  > li {
    padding: 0 5px;
  }
`;

const RequestContainer = styled.div`
  position: absolute;
  top: 78px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

const Request = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 16px;
  line-height: 1.25;
  color: #000;
  padding: 30px 20px;
  min-height: 101%;
`;

const Contact = styled.a`
  display: block;
  font-family: SFUIDisplay, sans-serif;
  font-size: 18px;
  line-height: 1.11;
  color: #00b1c7;
  margin-top: 16px;
  text-decoration: none;

  &:hover, &:active {
    text-decoration: underline;
  }
`;

const RequestInstruction = styled.div`
  margin-top: 23px;
  box-shadow: inset 0 1px 0 0 #e9e9e9;
  padding-top: 17px;
  font-size: 15px;
  line-height: 1.33;
`;

const RequestImageExample = styled.div`
  margin-top: 25px;
  text-align: center;
  font-size: 13px;
  line-height: 1.54;
  color: #9b9b9b;
`;

const RequestImageExampleImage = styled.img`
  display: block;
  margin: 0 auto 19px auto;
`;

type NewsListPropTypes = {
  data: {
    [id: string]: {
      timestamp: number,
      description: string,
      image: string,
    },
  },
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
};

class NewsList extends Component {
  state = {
    requestOpen: false,
  };

  state: {
    requestOpen: boolean,
  };

  componentDidMount() {
    enableManager(false);
  }

  componentWillUnmount() {
    enableManager(true);
    this.setState({ requestOpen: false });
  }

  props: NewsListPropTypes;

  renderResult() {
    const { requestOpen } = this.state;

    if (requestOpen) {
      return (
        <RequestContainer>
          <Request>
            <div>인식을 원하는 대상이 있다면 다음이 내용을 아래 이메일로 보내주세요. 빠르게 등록해 드리겠습니다!</div>

            <Contact href="mailto:contact@letsee.io">contact@letsee.io</Contact>

            <RequestInstruction>
              <div>1. 인식 대상의 여백없는 정면 이미지</div>
              <div>2. 인식 대상의 이름 (예: 빼빼로, 삼성역 EXO 광고)</div>

              <RequestImageExample>
                <RequestImageExampleImage
                  src={exampleImage}
                  srcSet={`${exampleImage2x} 2x, ${exampleImage3x} 3x`}
                  alt="인식용 이미지 예시"
                />

                <div>*인식용 이미지 예시</div>
              </RequestImageExample>
            </RequestInstruction>
          </Request>
        </RequestContainer>
      );
    }

    const { data } = this.props;

    if (!isLoaded(data)) {
      return (
        <ResultContainer>
          <Spinner gray />
        </ResultContainer>
      );
    }

    if (isEmpty(data)) {
      return (
        <ResultContainer>
          <ResultMessageImage
            src={emptyImage}
            srcSet={`${emptyImage2x} 2x, ${emptyImage3x} 3x`}
            alt="목록이 없습니다"
          />

          <ResultMessageText>목록이 없습니다</ResultMessageText>
        </ResultContainer>
      );
    }

    if (!data) {
      return (
        <ResultContainer>
          <ResultMessageImage
            src={errorImage}
            srcSet={`${errorImage2x} 2x, ${errorImage3x} 3x`}
            alt="로딩에 실패했습니다"
          />

          <ResultMessageText>로딩에 실패했습니다</ResultMessageText>
        </ResultContainer>
      );
    }

    return (
      <List>
        {sortBy(keys(data), id => -data[id].timestamp).map((id: string) => {
          const item = data[id];

          return (
            <li key={id}>
              <NewsItem data={item} />
            </li>
          );
        })}
      </List>
    );
  }

  render() {
    const { onClose } = this.props;
    const { requestOpen } = this.state;

    return (
      <Container>
        <Nav>
          {requestOpen ? '인식 대상 등록 요청' : '인식 대상 목록'}

          <StyledCloseButton gray onTouchEnd={onClose} />

          {!requestOpen && (
            <NavRight onTouchEnd={() => this.setState({ requestOpen: true })}>
              등록 요청
            </NavRight>
          )}
        </Nav>

        {this.renderResult()}
      </Container>
    );
  }
}

export default firebaseConnect([{
  path: 'news',
  storeAs: 'news',
  queryParams: ['orderByChild=timestamp'],
}])(connect(({ firebase: { data: { news } } }) => ({ data: news }))(NewsList));
