// @flow
import React from 'react';
import styled from 'styled-components';
import { ImageButton } from '../Button';

import envelopeIcon from './icn-open-messege.png';
import envelopeIcon2x from './icn-open-messege@2x.png';
import envelopeIcon3x from './icn-open-messege@3x.png';

const Container = styled.div`
  opacity: 0.8;
  font-family: AppleSDGothicNeo, sans-serif;
  font-weight: 800;
  text-align: center;
  color: #fff;
`;

const From = styled.div`
  font-size: 29px;
  letter-spacing: -1.2px;
  text-shadow: 0 0 12px rgba(#000, 0.5);
  margin-bottom: 23px;
`;

const Open = styled.div`
  font-size: 23px;
  letter-spacing: -0.8px;
  margin-top: 27px;
`;

const EnvelopeButton = ImageButton.extend`
  margin: 0 auto;
`;

type EnvelopePropTypes = {
  data: { firstname: string, lastname: string },
  onClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

const concatFirstAndLastNames = (firstname: string, lastname: string) => `${firstname} ${lastname}`.trim();

const Envelope = ({
  data: { firstname, lastname },
  onClick,
  children,
  ...other
}: EnvelopePropTypes) => (
  <Container {...other}>
    <From>
      <div>
        {concatFirstAndLastNames(firstname, lastname)}님의
      </div>

      <div>
        스티커 메세지
      </div>
    </From>

    <EnvelopeButton onClick={onClick}>
      <img
        alt={`${concatFirstAndLastNames(firstname, lastname)}님의 스티커 메세지`}
        src={envelopeIcon}
        srcSet={`${envelopeIcon2x} 2x, ${envelopeIcon3x} 3x`}
      />
    </EnvelopeButton>

    <Open>
      열어 볼까요?
    </Open>
  </Container>
);

export default Envelope;
