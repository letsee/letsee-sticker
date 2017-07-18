// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

import closeIcon from './btn-close.png';
import closeIcon2x from './btn-close@2x.png';
import closeIcon3x from './btn-close@3x.png';

const CaptureButton = ({
  className,
  children,
  ...other
}) => (
  <button
    type="button"
    className={classNames(styles.closeBtn, className)}
    {...other}
  >
    <img
      alt="Capture"
      src={closeIcon}
      srcSet={`${closeIcon2x} 2x, ${closeIcon3x} 3x`}
    />
  </button>
);

export default CaptureButton;
