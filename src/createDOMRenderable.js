// @flow
const createDOMRenderable = (value: string, className: string = '', clickCallback?: MouseEventHandler) => {
  const element = document.createElement('div');
  element.innerHTML = value;
  element.className = className;

  if (clickCallback) {
    element.onclick = clickCallback;
  }

  return new DOMRenderable(element);
};

export default createDOMRenderable;
