// @flow
import qs from 'qs';

const LETSEE_BROWSER_LOAD_URL = 'https://browser.letsee.io/load';
const GOOGLE = 'https://vm82m.app.goo.gl/';

// generate kakao link url for message with given id
const generateKakaoLinkUrl = (messageId: string): string => {
  const protocol = typeof window !== 'undefined' && window !== null ? window.location.protocol : 'http';
  const host = typeof window !== 'undefined' && window !== null ? window.location.host : 'apps.letsee.io'; // TODO host

  const browserParams = {
    url: `${protocol}//${host}${process.env.PUBLIC_PATH || '/'}${messageId}`,
  };

  const link = `${LETSEE_BROWSER_LOAD_URL}?url=${browserParams.url}`;

  const params = {
    link,
    apn: 'io.letsee.browser',
    isi: '1215633022',
    ibi: 'io.letsee.ios.browser',
  };

  return `${GOOGLE}?${qs.stringify(params)}`;
};

// open kakaotalk app with the given info
const openKakaoLink = (messageId: string, authorName: string, entityName: string, options = {}) => {
  const kakaoLinkUrl = generateKakaoLinkUrl(messageId);

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '렛시 스티커 메세지가 도착했어요!',
      description: `${authorName}님이 ${entityName}에 스티커 메세지를 담아 보냈습니다. 지금 렛시 브라우저로 확인해보세요!`,
      imageUrl: process.env.KAKAO_IMAGE_URL,
      link: {
        mobileWebUrl: kakaoLinkUrl,
        webUrl: kakaoLinkUrl,
        androidExecParams: kakaoLinkUrl,
        iosExecParams: kakaoLinkUrl,
      },
    },
    buttons: [{
      title: '렛시 브라우저로 보기',
      link: {
        mobileWebUrl: kakaoLinkUrl,
        webUrl: kakaoLinkUrl,
        androidExecParams: kakaoLinkUrl,
        iosExecParams: kakaoLinkUrl,
      },
    }],
    ...options,
  });
};

export default openKakaoLink;
