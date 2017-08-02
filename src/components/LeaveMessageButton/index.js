// @flow
import React from 'react';
import { ImageButton } from '../Button';

import leaveMessageIcon from './btn-gocreate.png';
import leaveMessageIcon2x from './btn-gocreate@2x.png';
import leaveMessageIcon3x from './btn-gocreate@3x.png';

const LeaveMessageButton = ({
  children,
  ...other
}) => (
  <ImageButton
    type="button"
    {...other}
  >
    <img
      alt="스티커 남기기"
      src={leaveMessageIcon}
      srcSet={`${leaveMessageIcon2x} 2x, ${leaveMessageIcon3x} 3x`}
    />
  </ImageButton>
);

export default LeaveMessageButton;
