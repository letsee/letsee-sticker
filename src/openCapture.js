// @flow
const openCapture = () => typeof window !== 'undefined' && window !== null && window._app && window._app.openCapture && window._app.openCapture();

export default openCapture;
