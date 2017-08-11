// @flow
import qs from 'qs';

const LETSEE_BROWSER_LOAD_URL = 'https://browser.letsee.io/load';
const GOOGLE = 'https://vm82m.app.goo.gl/';

const generateKakaoLinkUrl = (messageId: string): string => {
  const browserParams = {
    url: `${window.location.protocol}//${window.location.host}${process.env.PUBLIC_PATH || '/'}${messageId}`,
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

export default generateKakaoLinkUrl;
