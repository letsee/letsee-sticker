// @flow
import React from 'react';
import classNames from 'classnames';
import CloseButton from '../CloseButton';
import CompleteButton from '../CompleteButton';
import styles from './styles.scss';

import kakaoLogo from './icn-kakao.png';
import kakaoLogo2x from './icn-kakao@2x.png';
import kakaoLogo3x from './icn-kakao@3x.png';

const KakaoLink = ({
  onClose,
  onComplete,
  onKakaoLinkClick,
  className,
  children,
  ...other
}) => (
  <div className={classNames(styles.kakaoLink, className)} {...other}>
    <div className={styles.nav}>
      <div className={styles.navLeft}>
        <CloseButton onClick={onClose} />
      </div>

      <div className={styles.navRight}>
        <CompleteButton onClick={onComplete} />
      </div>
    </div>

    <div className={styles.body}>
      <div className={styles.message}>
        <div>
          스티커를 확인할 수 있게
        </div>

        <div>
          카카오특 친구에게 렛시 링크를 보내세요!
        </div>
      </div>

      <div className={styles.action}>
        <button
          type="button"
          className={styles.kakaoBtn}
          onClick={onKakaoLinkClick}
        >
          <img
            src={kakaoLogo}
            srcSet={`${kakaoLogo2x} 2x, ${kakaoLogo3x} 3x`}
            alt="카카오톡으로 링크 보내기"
            className={styles.kakaoBtnImage}
          />

          <span className={styles.kakaoBtnText}>카카오톡으로 링크 보내기</span>
        </button>
      </div>
    </div>
  </div>
);

export default KakaoLink;
