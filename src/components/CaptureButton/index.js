// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

import captureIcon from './btn-capture.png';
import captureIcon2x from './btn-capture@2x.png';
import captureIcon3x from './btn-capture@3x.png';

const CaptureButton = ({
  className,
  children,
  ...other
}) => (
  <button
    type="button"
    className={classNames(styles.captureBtn, className)}
    {...other}
  >
    <img
      alt="Capture"
      src={captureIcon}
      srcSet={`${captureIcon2x} 2x, ${captureIcon3x} 3x`}
    />
  </button>
);

export default CaptureButton;
