// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

import nextIcon from './btn-next.png';
import nextIcon2x from './btn-next@2x.png';
import nextIcon3x from './btn-next@3x.png';

const NextButton = ({
  className,
  children,
  ...other
}) => (
  <button
    type="button"
    className={classNames(styles.nextBtn, className)}
    {...other}
  >
    <img
      alt="Next"
      src={nextIcon}
      srcSet={`${nextIcon2x} 2x, ${nextIcon3x} 3x`}
    />
  </button>
);

export default NextButton;
