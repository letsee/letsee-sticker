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
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
`;

const TipButton = ({
  children, // eslint-disable-line react/prop-types
  ...other
}) => (
  <Button
    type="button"
    {...other}
  >
    <ButtonImage
      alt="팁"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_42,q_auto/v1503280701/assets/btn-tip-star_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_84,q_auto/v1503280701/assets/btn-tip-star_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_126,q_auto/v1503280701/assets/btn-tip-star_3x.png 3x
      "
    />

    <ButtonText>팁</ButtonText>
  </Button>
);

export default TipButton;
