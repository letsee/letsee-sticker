// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

const CompleteButton = ({
  className,
  children,
  ...other
}) => (
  <button
    type="button"
    className={classNames(styles.completeBtn, className)}
    {...other}
  >
    완료
  </button>
);

export default CompleteButton;
