// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { enableManager } from '../manager';
import { ImageButton } from './Button';
import { BottomButtonContainer } from './Container';
import { CirclePicker } from 'react-color';

type ColorPickerPropTypes = {
  // onClick?: string => mixed, // eslint-disable-line react/require-default-props
  // children?: any, // eslint-disable-line react/require-default-props
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onSelectedTextColor?: TouchEventHandler, // eslint-disable-line react/require-default-props
  selectedStickerText: string,

};

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  height: 100%;
`;

const ShowColorText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 34px;
  color: white;
  margin-top: 50px;
  font-weight: bold;
  
  ${({textColor})=>
    textColor &&
      `color: ${textColor};`
    }
`;

const MessageText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 16px;
  color: #cccccc;
  margin-top: 42px;
`;

const CirclePickerContainer = styled.div`
  margin-top:55px;
  -webkit-transition: unset !important;
  * {
    animation-duration: 0s !important;
  }

  .circle-picker {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding-left: 14px;
    1px solid white !important;
    
    
    div, span {
      :focus {
        transform: scale( 1.0 );
        outline: none !important;
        outline-offset: none !important;
      }
    }
    
    .activePicker{
       background-image:url("./assets/check.svg") !important;
       background-repeat: no-repeat !important;
       background-size: 40% 40% !important;
       background-position: 53% 50% !important;
    }
  }
`;

class ColorPicker extends Component {

  props: ColorPickerPropTypes;
  drawer: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      colors:[
        "#000000", "#9a340e", "#333304", "#020c80", "#333399", "#333333",
        "#800208", "#fd6720", "#808017", "#0f8012", "#118081", "#0a23fb",
        "#66669a", "#808080", "#fd0d1b", "#fd9a27", "#99cc27", "#339967",
        "#33cccc", "#3366fb", "#800f81", "#999999", "#fd28fc", "#fecc2f",
        "#fffe37", "#29fd2e", "#2cfffe", "#23ccfd", "#9a3366", "#c0c0c0",
        "#fe99cd", "#fecd9a", "#fffe99", "#ccffff", "#99ccfd", "#ffffff",
      ],
      textColor: '#ffffff',
    }
  }

  handleChange = (color, event) => {
    // window.alert(color.hex + "");
    console.log(color.hex);
    console.log(event.target);
    const target = event.target;
    target.classList.add('activePicker');
    this.setState({
      textColor: color.hex,
    })
  };

  componentDidMount() {
    enableManager(false);
    if (typeof window !== 'undefined' && window !== null) {
      window.addEventListener('resize', this.handleWindowResize);
    }
  }

  componentWillUnmount() {
    enableManager(true);

    if (typeof window !== 'undefined' && window !== null) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }

  handleWindowResize = () => {
    this.setState({ height: document.documentElement.clientHeight - 150 });
  };

  render() {
    const { selectedStickerText, onClose, onSelectedTextColor } = this.props;
    const { textColor, colors } = this.state;

    return (
      <Container>
        <ShowColorText textColor={textColor}>{selectedStickerText}</ShowColorText>
        <MessageText>원하시는 칼라를 선택해주세요.</MessageText>
        <CirclePickerContainer>
          <CirclePicker
            onChange={ this.handleChange }
            colors={colors}
          />
        </CirclePickerContainer>

        <BottomButtonContainer
          bottom="5%"
          marginItems="8px"
        >
          <ImageButton
            imageWidth="60px"
            onClick={onClose}
          >
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 3x"/>
          </ImageButton>

          <ImageButton
            imageWidth="60px"
            onClick={onSelectedTextColor(this.state.textColor)}
          >
            <img
              src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png"
              srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png 3x"/>
          </ImageButton>
        </BottomButtonContainer>
      </Container>
    );
  }
}

ColorPicker.propTypes = {
  // onClick: PropTypes.func, // eslint-disable-line react/require-default-props
  onClose: PropTypes.func, // eslint-disable-line react/require-default-props
  onSelectedTextColor: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default ColorPicker;
