// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import keys from 'lodash.keys';
import sortBy from 'lodash.sortby';
import NewsItem from './NewsItem';
import Button from '../Button';
import CloseButton from '../CloseButton';
import Spinner from '../Spinner';
import { enableManager } from '../../manager';
import type { News } from '../../types';

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
  margin: 0;
  padding: 0;
  list-style: none;
  min-height: 101%;

  > li {
    padding: 0 5px;
  }
`;

const ListSpinner = styled(Spinner)`
  margin: 26px auto;
`;

const BodyContainer = styled.div`
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
  font-family: SFUIDisplay, sans-serif;
  font-size: 18px;
  line-height: 1.11;
  color: #00b1c7;
  text-decoration: none;
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
  loading: boolean,
  empty: boolean,
  error: boolean,
  hasNextPage: boolean,
  data: { [id: string]: News },
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
};

type NewsListState = {
  requestOpen: boolean,
};

class NewsList extends Component<NewsListPropTypes, NewsListState> {
  state = {
    requestOpen: false,
  };

  componentDidMount() {
    enableManager(false);
  }

  componentWillUnmount() {
    enableManager(true);
    this.setState({ requestOpen: false });
  }

  props: NewsListPropTypes;
  listContainer: HTMLDivElement;

  renderResult() {
    const { requestOpen } = this.state;

    if (requestOpen) {
      return (
        <BodyContainer>
          <Request>
            <div>
              인식을 원하는 대상이 있다면 다음의 내용을 아래 이메일로 보내주세요. 빠르게 등록해 드리겠습니다!
            </div>

            <div style={{ marginTop: '16px' }}>
              <Contact href="mailto:contact@letsee.io">
                contact@letsee.io
              </Contact>
            </div>

            <RequestInstruction>
              <div>1. 인식 대상의 여백없는 정면 이미지</div>
              <div>2. 인식 대상의 이름 (예: 빼빼로, 삼성역 EXO 광고)</div>

              <RequestImageExample>
                <RequestImageExampleImage
                  src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,f_auto,q_auto,w_145/v1501870826/assets/img-sample_3x.png"
                  srcSet="
                    https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,f_auto,q_auto,w_290/v1501870826/assets/img-sample_3x.png 2x,
                    https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,f_auto,q_auto,w_435/v1501870826/assets/img-sample_3x.png 3x
                  "
                  alt="인식용 이미지 예시"
                />

                <div>*인식용 이미지 예시</div>
              </RequestImageExample>
            </RequestInstruction>
          </Request>
        </BodyContainer>
      );
    }

    if (this.props.loading && this.props.empty) {
      return (
        <ResultContainer>
          <Spinner gray />
        </ResultContainer>
      );
    }

    if (this.props.error && this.props.empty) {
      return (
        <ResultContainer>
          <ResultMessageImage
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1501870815/assets/icn-entity-error_3x.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_120,q_auto/v1501870815/assets/icn-entity-error_3x.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_180,q_auto/v1501870815/assets/icn-entity-error_3x.png 3x
            "
            alt="로딩에 실패했습니다"
          />

          <ResultMessageText>로딩에 실패했습니다</ResultMessageText>
        </ResultContainer>
      );
    }

    if (this.props.empty) {
      return (
        <ResultContainer>
          <ResultMessageImage
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1501870821/assets/icn-noentity_3x.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_120,q_auto/v1501870821/assets/icn-noentity_3x.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_180,q_auto/v1501870821/assets/icn-noentity_3x.png 3x
            "
            alt="목록이 없습니다"
          />

          <ResultMessageText>목록이 없습니다</ResultMessageText>
        </ResultContainer>
      );
    }

    const { data, loading, onWaypointEnter, hasNextPage } = this.props;

    return (
      <BodyContainer
        innerRef={(container) => { this.listContainer = container; }}
      >
        <List>
          {sortBy(keys(data), id => -data[id].timestamp).map((id: string) => {
            const item = data[id];

            return (
              <li key={id}>
                <NewsItem data={item} />
              </li>
            );
          })}

          {loading && (
            <li>
              <ListSpinner gray />
            </li>
          )}

          {!loading && hasNextPage && (
            <li>
              <Waypoint
                onEnter={onWaypointEnter}
                fireOnRapidScroll
                bottomOffset="-400px"
                scrollableAncestor={this.listContainer}
              />
            </li>
          )}
        </List>
      </BodyContainer>
    );
  }

  render() {
    const { onClose } = this.props;
    const { requestOpen } = this.state;

    return (
      <Container>
        <Nav>
          {requestOpen ? '인식 대상 등록 요청' : '인식 대상 목록'}

          <StyledCloseButton color="gray" onClick={onClose} />

          {!requestOpen && (
            <NavRight onClick={() => this.setState({ requestOpen: true })}>
              등록 요청
            </NavRight>
          )}
        </Nav>

        {this.renderResult()}
      </Container>
    );
  }
}

export default NewsList;
