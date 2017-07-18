// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

import trashIcon from './btn-trash.png';
import trashIcon2x from './btn-trash@2x.png';
import trashIcon3x from './btn-trash@3x.png';

const TrashButton = ({
  className,
  children,
  ...other
}) => (
  <button
    type="button"
    className={classNames(styles.trashBtn, className)}
    {...other}
  >
    <img
      alt="Next"
      src={trashIcon}
      srcSet={`${trashIcon2x} 2x, ${trashIcon3x} 3x`}
    />
  </button>
);

export default TrashButton;
