// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const ButtonImage = styled.img`
  display: block;
  margin: 0 auto;
`;

const ButtonText = styled.div`
  text-align: center;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
`;

const ShareButton = ({
  children,
  ...other
}) => (
  <Button
    type="button"
    {...other}
  >
    <ButtonImage
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_42,q_auto/v1502964281/assets/btn-share_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_84,q_auto/v1502964281/assets/btn-share_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_126,q_auto/v1502964281/assets/btn-share_3x.png 3x
      "
      alt="공유"
    />

    <ButtonText>공유</ButtonText>
  </Button>
);

export default ShareButton;
