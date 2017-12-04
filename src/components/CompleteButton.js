// @flow
import React from 'react';
import Button from './Button';

const TextButton = Button.extend`
  box-sizing: border-box;
  padding: 17px 16.5px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: 0.4px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};

  &:disabled {
    opacity: 0.4;
  }
`;

type CompleteButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const CompleteButton = ({ children,  ...other }: CompleteButtonProps) => (
  <TextButton
    type="button"
    {...other}
  >
    완료
  </TextButton>
);

export default CompleteButton;
