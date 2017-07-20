// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import chunk from 'lodash/chunk';
import 'react-responsive-carousel/lib/styles/main.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import './styles.scss';

const EMOJI_LIST = [
  '❤️', '😜', '😝', '🤡', '😞', '😣', '😖', '😫', '😤', '😡',
  '😵', '😱', '😰', '😭', '😷', '🤒', '🤕', '👿', '💩', '👻',
  '👍', '👊', '🙏', '👓', '😎', '🐶', '🐱', '🐼', '🐯', '🐷',
  '🐽', '😻', '😼', '😽', '🙀', '😿', '🔥', '🌈', '⭐', '✨',
  '🥂', '🍷', '💕', '💯', '♨️', '💤', '💋', '👄', '👅', '🙆',
  '🙇', '👨‍🍳', '🐸', '🍎', '🎮', '🎨', '✌️', '✊', '✋',
];

const settings = {
  showArrows: false,
  showStatus: false,
  showIndicators: true,
  showThumbs: false,
  infiniteLoop: true,
  emulateTouch: true,
};

const Drawer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 67px 0 18px 0;
`;

const Row = styled.div`
  padding: 8px 14.5px;

  &:before, &:after {
    content: " "; // 1
    display: table; // 2
  }

  &:after {
    clear: both;
  }
`;

const Emoji = styled.div`
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  box-sizing: border-box;
  padding: 0 7.5px;
  position: relative;
  min-height: 1px;
  width: 25%;
  font-family: AppleColorEmoji, sans-serif;
  font-size: 60px;
  letter-spacing: 3px;
  color: #fff;
  text-align: center;
  float: left;
  cursor: pointer;
  vertical-align: middle;
`;

const calculatePerPage = () => {
  const { clientHeight } = document.documentElement;

  if (clientHeight < 480) {
    return 8;
  } else if (clientHeight < 540) {
    return 12;
  }

  return 16;
};

class EmojiDrawer extends Component {
  state = {
    perPage: calculatePerPage(),
  };

  state: {
    perPage: number,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  props: {
    onClick?: string => mixed, // eslint-disable-line react/require-default-props
    onClose?: MouseEventHandler, // eslint-disable-line react/require-default-props
  };

  handleWindowResize = () => {
    this.setState({ perPage: calculatePerPage() });
  };

  handleWindowClick = (e: MouseEvent) => {
    let target = e.target;

    while (target !== document.body) {
      if (target === this.drawer) {
        return;
      }

      target = target.parentNode;
    }

    this.props.onClose && this.props.onClose(e);
  };

  drawer: HTMLDivElement;

  render() {
    const { perPage } = this.state;
    const { onClose, onClick, children, ...other } = this.props;

    return (
      <Drawer
        innerRef={(drawer) => { this.drawer = drawer; }}
        {...other}
      >
        <Carousel {...settings}>
          {chunk(EMOJI_LIST, perPage).map((page, i) => (
            <div key={i}>
              {chunk(page, 4).map((row, j) => (
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
            </div>
          ))}
        </Carousel>
      </Drawer>
    );
  }
}

export default EmojiDrawer;
