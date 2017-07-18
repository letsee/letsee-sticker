// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

import leftTop from './frame-b-lt.png';
import leftTop2x from './frame-b-lt@2x.png';
import leftTop3x from './frame-b-lt@3x.png';

import rightTop from './frame-b-rt.png';
import rightTop2x from './frame-b-rt@2x.png';
import rightTop3x from './frame-b-rt@3x.png';

import leftBottom from './frame-b-lb.png';
import leftBottom2x from './frame-b-lb@2x.png';
import leftBottom3x from './frame-b-lb@3x.png';

import rightBottom from './frame-b-rb.png';
import rightBottom2x from './frame-b-rb@2x.png';
import rightBottom3x from './frame-b-rb@3x.png';

type PropTypes = {
  className?: string, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

const AppLoader = ({ children, className, ...other }: PropTypes) => (
  <div className={classNames('container', styles.appLoader, className)} {...other}>
    <div className={styles.wrapper}>
      <img
        className={classNames(styles.frame, styles.leftTop)}
        src={leftTop}
        srcSet={`${leftTop2x} 2x, ${leftTop3x} 3x`}
        alt="스티커 메세지를 남길 제품을 비춰주세요"
      />

      <img
        className={classNames(styles.frame, styles.rightTop)}
        src={rightTop}
        srcSet={`${rightTop2x} 2x, ${rightTop3x} 3x`}
        alt="스티커 메세지를 남길 제품을 비춰주세요"
      />

      <img
        className={classNames(styles.frame, styles.leftBottom)}
        src={leftBottom}
        srcSet={`${leftBottom2x} 2x, ${leftBottom3x} 3x`}
        alt="스티커 메세지를 남길 제품을 비춰주세요"
      />

      <img
        className={classNames(styles.frame, styles.rightBottom)}
        src={rightBottom}
        srcSet={`${rightBottom2x} 2x, ${rightBottom3x} 3x`}
        alt="스티커 메세지를 남길 제품을 비춰주세요"
      />
    </div>

    <div className={styles.text}>
      <div>스티커 메세지를 남길</div>
      <div>제품을 비춰주세요</div>
    </div>
  </div>
);

export default AppLoader;
