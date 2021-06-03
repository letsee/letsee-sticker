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

// 현재 기기가 안드로이드인지 IOS인지 판단하여 정보를 전달해줍니다.
function checkDeviceType() {
  let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  
  if ( varUA.indexOf('android') > -1) {
    //안드로이드
    return "android";
  } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
    //IOS
    return "ios";
  } else {
    //아이폰, 안드로이드 외
    return "other";
  }
}

// TODO: 현재 안드로이드 일때는 intent를 통해 이동하도록 설정,
// TODO: ios일때는 커스텀 링크를 사용하
// 카카오톡 링크를 클릭했을 때 링크 이동 기능
// 카카오톡의 내부 WebView가 아닌 android/ios 각각이 가지고 있는 in-app 웹 브라우저로 이동 하여야 함
// 안드로이드에서는 내부 인텐트를 통해서 브라우저로 이동이 가능하지만
// IOS에서는 외부 브라우저를 띄우는 방식은 지원되지 않으며,
// FTP를 사파리브라우저를 열리게 한뒤 ftp 결과인 html파일에 sticker링크를 삽입하여 redirect하는 방식으로 구현하여야 함.
const generateWebArSdkKakaoLinkUrl = (messageId: string) : string => {
  const deviceType = checkDeviceType();
  // window.alert(deviceType)
  // return "https://www.naver.com"
  if (deviceType === 'android') {
    return "intent://intra.letsee.io:10002/public?#Intent;scheme=http;package=com.android.chrome;end"
  } else if (deviceType === 'ios') {
    // return `https://vm82m.app.goo.gl/?${qs.stringify({link: "ftp://ec2-3-34-91-141.ap-northeast-2.compute.amazonaws.com/bridge.html"})}`
    return `https://intra.letsee.io/test.html`;
  } else {
    return "https://www.naver.com"
  }
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
        // iosExecParams: kakaoLinkUrl,
      },
    }],
    ...options,
  });
};

export default openKakaoLink;
