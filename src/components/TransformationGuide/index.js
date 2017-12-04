// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import chunk from 'lodash.chunk';
import CloseButton from '../CloseButton';

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
    src: 'https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_60/v1501869835/assets/icn-gesture-1_3x.png',
    srcSet: `
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_120/v1501869835/assets/icn-gesture-1_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_180/v1501869835/assets/icn-gesture-1_3x.png 3x
    `,
  },
}, {
  name: '깊이 이동',
  image: {
    src: 'https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_60/v1501869835/assets/icn-gesture-2_3x.png',
    srcSet: `
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_120/v1501869835/assets/icn-gesture-2_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_180/v1501869835/assets/icn-gesture-2_3x.png 3x
    `,
  },
}, {
  name: '회전',
  image: {
    src: 'https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_60/v1501869835/assets/icn-gesture-3_3x.png',
    srcSet: `
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_120/v1501869835/assets/icn-gesture-3_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_180/v1501869835/assets/icn-gesture-3_3x.png 3x
    `,
  },
}, {
  name: '3D 회전',
  image: {
    src: 'https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_60/v1501869835/assets/icn-gesture-4_3x.png',
    srcSet: `
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_120/v1501869835/assets/icn-gesture-4_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_180/v1501869835/assets/icn-gesture-4_3x.png 3x
    `,
  },
}, {
  name: '확대/축소',
  image: {
    src: 'https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_60/v1501869835/assets/icn-gesture-5_3x.png',
    srcSet: `
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_120/v1501869835/assets/icn-gesture-5_3x.png 2x,
      https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,h_180/v1501869835/assets/icn-gesture-5_3x.png 3x
    `,
  },
}];

const calculatePerRow = () => (typeof window !== 'undefined' && window !== null && document.documentElement.clientHeight >= MIN_HEIGHT ? 2 : 3);

class TransformationGuide extends Component {
  state = {
    perRow: calculatePerRow(),
  };

  state: {
    perRow: number,
  };

  componentDidMount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.addEventListener('resize', this.handleWindowResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }

  props: {
    onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
    children?: any, // eslint-disable-line react/require-default-props
  };

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

        <StyledCloseButton onTouchEnd={onClose} />
      </Container>
    );
  }
}

TransformationGuide.propTypes = {
  onClose: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default TransformationGuide;
