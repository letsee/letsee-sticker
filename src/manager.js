// @flow
import Hammer from 'hammerjs';

const manager = new Hammer.Manager(document.body);
const Pan = new Hammer.Pan();
const Rotate = new Hammer.Rotate();
const Pinch = new Hammer.Pinch();

const Press = new Hammer.Press({
  time: 1000,
  threshold: 15,
});

Rotate.recognizeWith([Pan]);
Pinch.recognizeWith([Rotate, Pan]);

manager.add(Press);
manager.add(Pan);
manager.add(Rotate);
manager.add(Pinch);

export default manager;
