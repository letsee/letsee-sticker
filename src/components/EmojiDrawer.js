// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import chunk from 'lodash/chunk';
import { getNEmojis, emojiListLength } from '../emojiList';
import { enableManager } from '../manager';
import { ImageButton } from './Button';

const PER_PAGE = 200;

const Drawer = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  // bottom: 0;
  height: ${props => props.height}px;
  background-color: rgba(0, 0, 0, 0.7);
  // border-top-left-radius: 10px;
  // border-top-right-radius: 10px;
  padding-top: 20px;
  // margin-top: 30px;
  height: 100%;
  
`;

const Page = styled.div`
  width: 100%;
  height: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 0 5px;
  box-sizing: border-box;
`;

const Row = styled.div`
  padding: 6px 0;

  &:before, &:after {
    content: " "; // 1
    display: table; // 2
  }

  &:after {
    clear: both;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const Emoji = styled.div`
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  box-sizing: border-box;
  padding: 0 5px;
  position: relative;
  min-height: 1px;
  width: 20%;
  font-family: AppleColorEmoji, sans-serif;
  font-size: 46px;
  letter-spacing: 3px;
  color: #fff;
  text-align: center;
  float: left;
  cursor: pointer;
  vertical-align: middle;
`;

import { BottomButtonContainer } from './Container';

type EmojiDrawerPropTypes = {
  onClick?: string => mixed, // eslint-disable-line react/require-default-props
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class EmojiDrawer extends Component {
  state = {
    page: 1,
    height: document.documentElement.clientHeight - 150,
  };

  state: {
    page: number,
    height: number,
  };

  componentDidMount() {
    enableManager(false);

    if (typeof window !== 'undefined' && window !== null) {
      // window.addEventListener('touchend', this.handleWindowClick);
      window.addEventListener('resize', this.handleWindowResize);
    }
  }

  componentWillUnmount() {
    enableManager(true);

    if (typeof window !== 'undefined' && window !== null) {
      // window.removeEventListener('touchend', this.handleWindowClick);
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }

  props: EmojiDrawerPropTypes;

  handleWindowResize = () => {
    this.setState({ height: document.documentElement.clientHeight - 150 });
  };

  // X버튼이 없었을 때 EmojiDrawer를 화면에서 지우는 부분 삭제
  // handleWindowClick = (e: TouchEvent) => {
  //   let target = e.target;
  //
  //   while (target !== document.body) {
  //     if (target === this.drawer || target === null) {
  //       return;
  //     }
  //
  //     target = target.parentNode;
  //   }
  //
  //   if (this.props.onClose) {
  //     this.props.onClose(e);
  //   }
  // };

  drawer: HTMLDivElement;

  render() {
    const { height, page } = this.state;
    const { onClose, onClick, children, ...other } = this.props;
    const emojis = getNEmojis(Math.min(PER_PAGE * page, emojiListLength));
    const chunkedEmojis = chunk(emojis, 5);

    return (
      <Drawer
        innerRef={(drawer) => { this.drawer = drawer; }}
        height={height + 30}
        {...other}
      >
        <Page>
          {chunkedEmojis.map((row, j) => (
            <Row key={j}>
              {row.map(emoji => (
                <Emoji
                  key={emoji}
                  onClick={() => onClick && onClick(emoji)}
                >
                  {emoji}
                </Emoji>
              ))}
            </Row>
          ))}

          {emojis.length < emojiListLength && (
            <Waypoint
              key={emojis[emojis.length - 1]}
              fireOnRapidScroll
              topOffset={300}
              onEnter={() => {
                this.setState(prevState => ({
                  page: prevState.page + 1,
                }));
              }}
            />
          )}
        </Page>
        <BottomButtonContainer bottom="5%">
          <ImageButton
            imageWidth="60px"
            onClick={() => {
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          >
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 3x" />
          </ImageButton>
        </BottomButtonContainer>
      </Drawer>
    );
  }
}

EmojiDrawer.propTypes = {
  onClick: PropTypes.func, // eslint-disable-line react/require-default-props
  onClose: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default EmojiDrawer;
