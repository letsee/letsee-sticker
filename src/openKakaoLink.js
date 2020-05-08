// @flow
import qs from 'qs';

const LETSEE_BROWSER_LOAD_URL = 'https://browser.letsee.io/load';
const GOOGLE = 'https://vm82m.app.goo.gl/';

// const generateKakaoLinkUrl = (messageId: string): string => {
//   const protocol = typeof window !== 'undefined' && window !== null ? window.location.protocol : 'http';
//   const host = typeof window !== 'undefined' && window !== null ? window.location.host : 'apps.letsee.io'; // TODO host
//
//   const browserParams = {
//     url: `${protocol}//${host}${process.env.PUBLIC_PATH || '/'}${messageId}`,
//     => https://browser.letsee.io/load?url=http//app.letsee.io/KqS1YNqhXxcjCz0UQ?
//   };
//
//   const link = `${LETSEE_BROWSER_LOAD_URL}?url=${browserParams.url}`;
//
//   const params = {
//     link,
//     apn: 'io.letsee.browser',
//     isi: '1215633022',
//     ibi: 'io.letsee.ios.browser',
//   };
//
//   return `${GOOGLE}?${qs.stringify(params)}`;
// };

// TODO: 현재 안드로이드 일때는 intent를 통해 이동하도록 설정,
// TODO: ios일때는 커스텀 링크를 사용하
// 카카오톡 링크를 클릭했을 때 링크 이동 기능
// 카카오톡의 내부 WebView가 아닌 android/ios 각각이 가지고 있는 in-app 웹 브라우저로 이동 하여야 함
const generateWebArSdkKakaoLinkUrl = (messageId: string) : string => {
  return "intent://intra.letsee.io:10002/public?#Intent;scheme=http;package=com.android.chrome;end"
};

const openKakaoLink = (messageId: string, authorName: string, entityName: string, options = {}) => {
  const kakaoLinkUrl = generateWebArSdkKakaoLinkUrl(messageId);
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '렛시 스티커 메세지가 도착했어요!',
      description: `${authorName}님이 ${entityName}에 스티커 메세지를 담아 보냈습니다. 지금 렛시 브라우저로 확인해보세요!`,
      // imageUrl: process.env.KAKAO_IMAGE_URL,
      imageUrl: 'assets/kakao_link_image.png',
      link: {
        mobileWebUrl: kakaoLinkUrl,
        webUrl: kakaoLinkUrl,
        // androidExecParams: kakaoLinkUrl,
        // iosExecParams: kakaoLinkUrl,
      },
    },
    buttons: [{
      title: '렛시 브라우저로 보기',
      link: {
        mobileWebUrl: kakaoLinkUrl,
        webUrl: kakaoLinkUrl,
        // androidExecParams: kakaoLinkUrl,
        // iosExecParams: kakaoLinkUrl,₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩
      },
    }],
    ...options,
  });
};

export default openKakaoLink;
