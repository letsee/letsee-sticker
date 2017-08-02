// @flow
import React from 'react';
import Button from './Button';

const TextButton = Button.extend`
  padding: 17px 12px;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.4px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
`;

const CompleteButton = ({
  children,
  ...other
}) => (
  <TextButton
    type="button"
    {...other}
  >
    완료
  </TextButton>
);

export default CompleteButton;
