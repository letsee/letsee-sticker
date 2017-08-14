// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import chunk from 'lodash/chunk';
import { getNEmojis, emojiListLength } from '../emojiList';
import { enableManager } from '../manager';

const PER_PAGE = 200;

const Drawer = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${props => props.height}px;
  background-color: rgba(0, 0, 0, 0.7);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 30px;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
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

type EmojiDrawerPropTypes = {
  onClick?: string => mixed, // eslint-disable-line react/require-default-props
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
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

    // TODO choose between click and touch?
    // window.addEventListener('click', this.handleWindowClick);
    window.addEventListener('touchend', this.handleWindowClick);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    enableManager(true);

    // TODO choose between click and touch?
    // window.removeEventListener('click', this.handleWindowClick);
    window.removeEventListener('touchend', this.handleWindowClick);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  props: EmojiDrawerPropTypes;

  handleWindowResize = () => {
    this.setState({ height: document.documentElement.clientHeight - 150 });
  };

  handleWindowClick = (e: TouchEvent) => {
    let target = e.target;

    while (target !== document.body) {
      if (target === this.drawer || target === null) {
        return;
      }

      target = target.parentNode;
    }

    this.props.onClose && this.props.onClose(e);
  };

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
      </Drawer>
    );
  }
}

export default EmojiDrawer;
