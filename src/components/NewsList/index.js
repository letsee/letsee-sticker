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
import { enableManager } from '../../manager';

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

const FormWrapper = styled.div`
  position: absolute;
  top: 78px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

const Form = styled.iframe`
  display: block;
  border: 0;
  width: 100%;
  height: 100%;
`;

type NewsListPropTypes = {
  data: {
    [id: string]: {
      timestamp: number,
      description: string,
      image: string,
    },
  },
  onClose?: TouchEventHandler,
};

class NewsList extends Component {
  state = {
    formOpen: false,
  };

  state: {
    formOpen: boolean,
  };

  componentDidMount() {
    enableManager(false);
  }

  componentWillUnmount() {
    enableManager(true);
    this.setState({ formOpen: false });
  }

  props: NewsListPropTypes;

  render() {
    const { data, onClose } = this.props;

    if (!isLoaded(data)) {
      // TODO
      return (
        <h1>LOADING</h1>
      );
    }

    if (!data) {
      // TODO
      return (
        <h1>ERROR</h1>
      );
    }

    if (isEmpty(data)) {
      // TODO
      return (
        <h1>EMPTY</h1>
      );
    }

    const { formOpen } = this.state;

    return (
      <Container>
        <Nav>
          {formOpen ? '인식 대상 등록 요청' : '인식 대상 목록'}

          <StyledCloseButton gray onTouchEnd={onClose} />

          {!formOpen && (
            <NavRight onTouchEnd={() => this.setState({ formOpen: true })}>
              등록 요청
            </NavRight>
          )}
        </Nav>

        {formOpen ? (
          <FormWrapper>
            <Form src={process.env.NEWS_FORM_URL} />
          </FormWrapper>
        ) : (
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
        )}
      </Container>
    );
  }
}

export default firebaseConnect([{
  path: 'news',
  storeAs: 'news',
  queryParams: ['orderByChild=timestamp'],
}])(connect(({ firebase: { data: { news } } }) => ({ data: news }))(NewsList));
