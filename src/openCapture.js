// @flow
// open screen capture
const openCapture = () => {
  if (typeof window !== 'undefined' && window !== null && window._app && window._app.openCapture) {
    window._app.openCapture();
  }
};

export default openCapture;
