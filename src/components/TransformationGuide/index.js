// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import chunk from 'lodash/chunk';
import CloseButton from '../CloseButton';

import translate from './icn-gesture-1.png';
import translate2x from './icn-gesture-1@2x.png';
import translate3x from './icn-gesture-1@3x.png';

import translateZ from './icn-gesture-2.png';
import translateZ2x from './icn-gesture-2@2x.png';
import translateZ3x from './icn-gesture-2@3x.png';

import rotateZ from './icn-gesture-3.png';
import rotateZ2x from './icn-gesture-3@2x.png';
import rotateZ3x from './icn-gesture-3@3x.png';

import rotate from './icn-gesture-4.png';
import rotate2x from './icn-gesture-4@2x.png';
import rotate3x from './icn-gesture-4@3x.png';

import scale from './icn-gesture-5.png';
import scale2x from './icn-gesture-5@2x.png';
import scale3x from './icn-gesture-5@3x.png';

const MIN_HEIGHT = 568;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const NavTopCenter = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  user-select: none;
  padding: 17px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  letter-spacing: 0.4px;
  color: #fff;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  font-size: 18px;
  text-align: center;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  left: 50%;
  bottom: 19px;
  transform: translateX(-50%);
`;

const Gestures = styled.div`
  position: absolute;
  left: 22px;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
`;

const GestureGroup = styled.div`
  margin: 0 -6px;
  padding: 5px 0;

  &:before, &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }

  @media (min-height: ${MIN_HEIGHT}px) {
    padding: 15px 0;
  }
`;

const Gesture = styled.div`
  box-sizing: border-box;

  &:before, &:after {
    box-sizing: border-box;
  }

  position: relative;
  min-height: 1px;
  float: left;
  padding: 0 6px;
  width: ${props => props.width};
`;

const GestureName = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.4px;
  color: #fff;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const GestureImage = styled.img`
  display: block;
  margin: 10px auto 0 auto;
`;

const gestures = [{
  name: '가로/세로 이동',
  image: {
    src: translate,
    srcSet: `${translate2x} 2x, ${translate3x} 3x`,
  },
}, {
  name: '깊이 이동',
  image: {
    src: translateZ,
    srcSet: `${translateZ2x} 2x, ${translateZ3x} 3x`,
  },
}, {
  name: '회전',
  image: {
    src: rotateZ,
    srcSet: `${rotateZ2x} 2x, ${rotateZ3x} 3x`,
  },
}, {
  name: '3D 회전',
  image: {
    src: rotate,
    srcSet: `${rotate2x} 2x, ${rotate3x} 3x`,
  },
}, {
  name: '확대/축소',
  image: {
    src: scale,
    srcSet: `${scale2x} 2x, ${scale3x} 3x`,
  },
}];

const calculatePerRow = () => (document.documentElement.clientHeight < MIN_HEIGHT ? 3 : 2);

class TransformationGuide extends Component {
  state = {
    perRow: calculatePerRow(),
  };

  state: {
    perRow: number,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({ perRow: calculatePerRow() });
  };

  render() {
    const { perRow } = this.state;

    const {
      onClose,
      children,
      ...other
    } = this.props;

    return (
      <Container {...other}>
        {perRow < 3 && (
          <NavTopCenter>
            위치/크기 조정 TIP
          </NavTopCenter>
        )}

        <Gestures>
          {chunk(gestures, perRow).map((group, i) => (
            <GestureGroup key={i}>
              {group.map((gesture, j) => (
                <Gesture key={j} width={`${100 / group.length}%`}>
                  <GestureName>{gesture.name}</GestureName>
                  <GestureImage
                    src={gesture.image.src}
                    srcSet={gesture.image.srcSet}
                    alt={gesture.name}
                  />
                </Gesture>
              ))}
            </GestureGroup>
          ))}
        </Gestures>

        <StyledCloseButton onClick={onClose} />
      </Container>
    );
  }
}

export default TransformationGuide;
