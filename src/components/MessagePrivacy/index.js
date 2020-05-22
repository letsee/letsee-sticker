// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import CloseButton from '../CloseButton';
// import Spinner from '../Spinner';
// import Button from '../Button';
import { BottomButtonContainer } from '../Container';
import { ImageButton } from '../Button';


const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: rgba(0, 0, 0, 0.5);
`;

const Body = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.4);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-bottom: 110px;
`;

const Message = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  color: #000;
  font-size: 18px;
  letter-spacing: -0.5px;
  padding-top: 24px;
  color: white;
`;

const Title = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  text-align: center;
  color: #000;
  font-size: 22px;
  padding-top: 40px;
  font-weight: bold;
  color: white;
`;

// const PrivacyRadio = Button.extend`
//   font-family: AppleSDGothicNeo, sans-serif;
//   font-size: 15px;
//   font-weight: bold;
//   text-align: center;
//   color: ${props => (props.checked ? '#000' : 'rgba(0, 0, 0, 0.4)')};
//   margin: 11px auto 0 auto;
//   vertical-align: middle;
// `;
//
// const PrivacyRadioImage = styled.img`
//   display: inline-block;
//   margin-right: 5px;
//   vertical-align: middle;
// `;
//
// const SubmitButton = Button.extend`
//   position: relative;
//   margin: 17px auto 0 auto;
//   border-radius: 31px;
//   background-color: #00b1c7;
//   padding: 12px 23.5px 9px 25.5px;
//   font-family: AppleSDGothicNeo, sans-serif;
//   font-size: 19px;
//   font-weight: bold;
//   letter-spacing: 0.4px;
//   text-align: center;
//   color: #fff;
// `;
//
// const StyledCloseButton = styled(CloseButton)`
//   margin: 25px auto 0 auto;
// `;
//
// const SpinnerContainer = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

type MessagePrivacyPropTypes = {
  error: boolean,
  submitting: boolean,
  public: boolean,
  entity: {
    name: string,
  },
  onPublicChange?: boolean => mixed, // eslint-disable-line react/require-default-props
  onClose?: TouchEventHandler, // eslint-disable-line react/require-default-props
  onSubmit?: MouseEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class MessagePrivacy extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    entity: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    onPublicChange: PropTypes.func, // eslint-disable-line react/require-default-props
    onClose: PropTypes.func, // eslint-disable-line react/require-default-props
    onSubmit: PropTypes.func, // eslint-disable-line react/require-default-props
  };

  componentDidMount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.addEventListener('touchend', this.handleWindowClick);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.removeEventListener('touchend', this.handleWindowClick);
    }
  }

  props: MessagePrivacyPropTypes;
  body: HTMLDivElement;

  handleWindowClick = (e: TouchEvent) => {
    if (!this.props.submitting) {
      let target = e.target;

      while (target !== document.body) {
        if (target === this.body || target === null) {
          return;
        }

        target = target.parentNode;
      }

      if (this.props.onClose) {
        this.props.onClose(e);
      }
    }
  };

  render() {
    const {
      public: isPublic,
      submitting,
      error,
      onPublicChange,
      entity,
      onClose,
      onSubmit,
      children,
      ...other
    } = this.props;

    return (
      <Container {...other}>
        <Body innerRef={(body) => { this.body = body; }}>
          
          <Title> 스티커 남기기 </Title>
          
          {error ? (
            <Message>
              <div>문제가 발생했어요.</div>
              <div>다시 시도할까요?</div>
            </Message>
          ) : (
            <Message>
              <div>멋진 스티커군요!</div>
              <div>이 스티커를 전체보기에 남길까요?</div>
            </Message>
          )}
  
          <BottomButtonContainer
            bottom="5%"
            marginItems="8px"
          >
            <ImageButton
              imageWidth="60px"
              onClick={submitting ? null : onClose}
            >
              <img
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 3x" />
            </ImageButton>
    
            <ImageButton
              imageWidth="60px"
              onClick={submitting ? null : onSubmit}
            >
              <img
                src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png"
                srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png 3x" />
            </ImageButton>
          </BottomButtonContainer>
          
          
          {/*기존 전체공개 Radia 버튼 및 하단 버튼 제거*/}
          {/*<PrivacyRadio*/}
          {/*  type="button"*/}
          {/*  checked={isPublic}*/}
          {/*  onClick={() => onPublicChange && onPublicChange(!this.props.public)}*/}
          {/*>*/}
          {/*  {isPublic ? (*/}
          {/*    <PrivacyRadioImage*/}
          {/*      alt="전체 공개"*/}
          {/*      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1503285514/assets/check-all_3x.png"*/}
          {/*      srcSet="*/}
          {/*        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1503285514/assets/check-all_3x.png 2x,*/}
          {/*        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1503285514/assets/check-all_3x.png 3x*/}
          {/*      "*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    <PrivacyRadioImage*/}
          {/*      alt="전체 공개"*/}
          {/*      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_20,q_auto/v1503285514/assets/check-noall_3x.png"*/}
          {/*      srcSet="*/}
          {/*        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_40,q_auto/v1503285514/assets/check-noall_3x.png 2x,*/}
          {/*        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_60,q_auto/v1503285514/assets/check-noall_3x.png 3x*/}
          {/*      "*/}
          {/*    />*/}
          {/*  )}*/}
          
          {/*  전체 공개*/}
          {/*</PrivacyRadio>*/}
          
          {/*<SubmitButton*/}
          {/*  type="button"*/}
          {/*  onClick={submitting ? null : onSubmit}*/}
          {/*>*/}
          {/*  <span style={{ visibility: submitting ? 'hidden' : 'visible' }}>남기기</span>*/}
          
          {/*  {submitting && (*/}
          {/*    <SpinnerContainer>*/}
          {/*      <Spinner />*/}
          {/*    </SpinnerContainer>*/}
          {/*  )}*/}
          {/*</SubmitButton>*/}
          
          {/*<StyledCloseButton*/}
          {/*  color="black"*/}
          {/*  onClick={submitting ? null : onClose}*/}
          {/*/>*/}
        </Body>
      </Container>
    );
  }
}

export default MessagePrivacy;
