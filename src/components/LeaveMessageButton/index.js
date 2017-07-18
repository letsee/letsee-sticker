// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

import leaveMessageIcon from './btn-gocreate.png';
import leaveMessageIcon2x from './btn-gocreate@2x.png';
import leaveMessageIcon3x from './btn-gocreate@3x.png';

const LeaveMessageButton = ({
  className,
  children,
  ...other
}) => (
  <button
    type="button"
    className={classNames(styles.leaveMessageBtn, className)}
    {...other}
  >
    <img
      alt="스티커 남기기"
      src={leaveMessageIcon}
      srcSet={`${leaveMessageIcon2x} 2x, ${leaveMessageIcon3x} 3x`}
    />
  </button>
);

export default LeaveMessageButton;
