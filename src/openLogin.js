// @flow
// open letsee browser login
const openLogin = () => {
  if (typeof window !== 'undefined' && window !== null && window._app && window._app.openLogin) {
    const logIn = confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?');

    if (logIn) {
      window._app.openLogin();
    }
  }
};

export default openLogin;
