// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import Button, { ImageButton } from '../Button';
import Frame from '../Frame';
import {
  MAX_DIAGONAL,
  MIN_DIAGONAL,
} from '../../constants';

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 16px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.3px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const MessagesCount = styled.span`
  vertical-align: middle;
  margin-left: 5px;
  font-family: SFUIDisplay, sans-serif;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.3px;
  color: #000;
  text-shadow: none;
  padding: 0 6px;
  border-radius: 100px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
`;

const ToggleMessageListButton = Button.extend`
  position: absolute;
  top: 25px;
  right: 0;
  padding: 16px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: -0.4px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const ARContainer = styled.div`
  position: relative;
`;

const StyledImageButton = ImageButton.extend`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledImageButtonRight = ImageButton.extend`
  position: absolute;
  right: 0;
  bottom: 109px;
`;

const MessageText = styled.div`
  position: absolute;
  white-space: nowrap;
  left: 50%;
  bottom: ${props => props.height}px;
  transform: translateX(-50%);
  opacity: 0.9;
  font-family: 'Noto Sans KR Black', AppleSDGothicNeo, sans-serif;
  font-size: ${props => props.size * 0.06}px;
  font-weight: 800;
  letter-spacing: ${props => -props.size * 0.06 * 0.5 / 23}px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 ${props => props.size * 0.06 * 12 / 23}px rgba(0, 0, 0, 0.5);
`;

const FrameAR = styled(Frame)`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  > img {
    width: ${props => Math.sqrt(((props.width * props.width) + (props.height * props.height)) / 2) * 0.06}px;
  }
`;

type EntityPropTypes = {
  data: {
    uri: string,
    name: string,
    size: {
      width: number,
      height: number,
      depth: number,
    },
  },
  currentUser: { uid: string } | null,
  myMessagesCount?: number,
  publicMessagesCount?: number,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Entity extends Component {
  static defaultProps = {
    myMessagesCount: 0,
    publicMessagesCount: 0,
  };

  static propTypes = {
    myMessagesCount: PropTypes.number,
    publicMessagesCount: PropTypes.number,
    currentUser: PropTypes.oneOf([null, PropTypes.shape({
      uid: PropTypes.string.isRequired,
    })]).isRequired,
    data: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        depth: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    onNewClick: PropTypes.func, // eslint-disable-line react/require-default-props
  };

  constructor(props: EntityPropTypes) {
    super(props);

    this.state = {
      public: true,
    };

    if (typeof letsee !== 'undefined' && letsee !== null) {
      const container = document.createElement('div');
      this.object = new DOMRenderable(container);
    }
  }

  state: { public: boolean };

  componentDidMount() {
    this.renderAR(this.props);
  }

  componentWillReceiveProps(nextProps: EntityPropTypes) {
    if (nextProps.currentUser === null && this.props.currentUser !== null) {
      this.setState({ public: true });
    }

    this.renderAR(nextProps);
  }

  componentWillUnmount() {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const entity = letsee.getEntity(this.props.data.uri);
      entity.removeRenderable(this.object);
    }
  }

  props: EntityPropTypes;

  renderAR({ data, onNewClick }: EntityPropTypes) {
    if (typeof letsee !== 'undefined' && letsee !== null) {
      const { uri, size: { width, height, depth } } = data;
      const entity = letsee.getEntity(uri);

      if (this.object.parent !== entity.object) {
        entity.addRenderable(this.object);
      }

      let realDiagonal = MAX_DIAGONAL;

      if (typeof width !== 'undefined' && width !== null && typeof height !== 'undefined' && height !== null) {
        realDiagonal = Math.sqrt((width * width) + (height * height));
      }

      const diagonal = clamp(realDiagonal, MIN_DIAGONAL, MAX_DIAGONAL);
      const realToClamped = realDiagonal / diagonal;

      if (realDiagonal !== diagonal) {
        this.object.scale.setScalar(realToClamped);
      }

      if (depth !== null && typeof depth !== 'undefined') {
        this.object.position.setZ(depth / 2);
      }

      const buttonSize = diagonal * 0.33;
      const nearest = Math.ceil(buttonSize / 100) * 100;
      const y = (height / realToClamped) + (diagonal * 0.04);

      render(
        <ARContainer>
          <MessageText
            size={diagonal}
            height={y}
          >
            스티커를 남겨보세요!
          </MessageText>

          <FrameAR
            width={width / realToClamped}
            height={height / realToClamped}
            vertical={0}
            horizontal={0}
            white
          >
            <StyledImageButton
              type="button"
              onClick={onNewClick}
            >
              <img
                src={`https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest},q_auto/v1501870222/assets/btn-add-content_3x.png`}
                srcSet={`
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest * 2},q_auto/v1501870222/assets/btn-add-content_3x.png 2x,
                  https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_${nearest * 3},q_auto/v1501870222/assets/btn-add-content_3x.png 3x
                `}
                alt="스티커를 남겨보세요!"
                height={buttonSize}
              />
            </StyledImageButton>
          </FrameAR>
        </ARContainer>,
        this.object.element,
      );
    }
  }

  render() {
    const { public: isPublic } = this.state;
    const {
      currentUser,
      myMessagesCount,
      publicMessagesCount,
      data,
      onNewClick,
      firebase,
      dispatch,
      children,
      ...other
    } = this.props;

    const messagesCount = (isPublic || currentUser === null ? publicMessagesCount : myMessagesCount) || 0;

    return (
      <div {...other}>
        <Title>
          {data.name}

          <MessagesCount>
            {messagesCount}
          </MessagesCount>
        </Title>

        {currentUser !== null && (
          <ToggleMessageListButton
            type="button"
            onClick={() => this.setState(prevState => ({ public: !prevState.public }))}
          >
            {isPublic ? 'MY' : 'ALL'}
          </ToggleMessageListButton>
        )}

        <StyledImageButtonRight
          type="button"
          onClick={onNewClick}
        >
          <img
            alt="스티커를 남겨보세요!"
            src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_72/v1503047417/assets/btn-create_3x.png"
            srcSet="
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_144/v1503047417/assets/btn-create_3x.png 2x,
              https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,q_auto,w_216/v1503047417/assets/btn-create_3x.png 3x
            "
          />
        </StyledImageButtonRight>
      </div>
    );
  }
}

export default firebaseConnect(
  ({ currentUser }) => (currentUser === null ? [
    { path: 'messagesCount/public', storeAs: 'publicMessagesCount' },
  ] : [
    { path: 'messagesCount/public', storeAs: 'publicMessagesCount' },
    { path: `messagesCount/${currentUser.uid}`, storeAs: 'myMessagesCount' },
  ]),
)(connect(
  ({ firebase: { data: { publicMessagesCount, myMessagesCount } } }) => ({
    publicMessagesCount,
    myMessagesCount,
  }),
)(Entity));
