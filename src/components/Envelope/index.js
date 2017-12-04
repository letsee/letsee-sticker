// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ImageButton } from '../Button';
import type { User } from '../../types';

const Container = styled.div`
  font-family: 'Noto Sans KR Black', AppleSDGothicNeo, sans-serif;
  font-weight: 800;
  text-align: center;
  color: #fff;
`;

const From = styled.div`
  opacity: 0.8;
  font-size: ${props => props.size * 0.07}px;
  letter-spacing: ${props => -props.size * 0.07 * 1.2 / 29}px;
  text-shadow: 0 0 ${props => props.size * 0.07 * 12 / 29}px rgba(0, 0, 0, 0.5);
  margin-bottom: ${props => props.size * 0.06}px;
`;

const Open = styled.div`
  opacity: 0.8;
  font-size: ${props => props.size * 0.05}px;
  letter-spacing: ${props => -props.size * 0.05 * 0.8 / 23}px;
  margin-top: ${props => props.size * 0.06}px;
`;

const EnvelopeButton = ImageButton.extend`
  margin: 0 auto;
`;

type EnvelopePropTypes = {
  size: number,
  data: User,
  onClick?: TouchEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

const concatFirstAndLastNames = (firstname: string, lastname: string) => `${firstname} ${lastname}`.trim();

const Envelope = ({
  data: { firstname, lastname },
  size,
  onClick,
  children,
  ...other
}: EnvelopePropTypes) => {
  const imageSize = size * 0.38;
  const nearest = Math.ceil(imageSize / 100) * 100;

  return (
    <Container {...other}>
      <From size={size}>
        <div>
          {concatFirstAndLastNames(firstname, lastname)}님의
        </div>

        <div>
          스티커 메세지
        </div>
      </From>

      <EnvelopeButton onTouchEnd={onClick} size={size}>
        <img
          alt={`${concatFirstAndLastNames(firstname, lastname)}님의 스티커 메세지`}
          width={imageSize}
          src={`https://res.cloudinary.com/df9jsefb9/image/upload/s--Hz_zpxe6--/c_scale,w_${nearest},q_auto/v1502250029/assets/icn-open-messege_3x_emf5fq.png`}
          srcSet={`
            https://res.cloudinary.com/df9jsefb9/image/upload/s--Hz_zpxe6--/c_scale,w_${nearest * 2},q_auto/v1502250029/assets/icn-open-messege_3x_emf5fq.png 2x,
            https://res.cloudinary.com/df9jsefb9/image/upload/s--Hz_zpxe6--/c_scale,w_${nearest * 3},q_auto/v1502250029/assets/icn-open-messege_3x_emf5fq.png 3x
          `}
        />
      </EnvelopeButton>

      <Open size={size}>
        열어 볼까요?
      </Open>
    </Container>
  );
};

Envelope.propTypes = {
  size: PropTypes.number.isRequired,
  data: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default Envelope;
