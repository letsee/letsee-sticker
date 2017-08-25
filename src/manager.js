// @flow
import Hammer from 'hammerjs';

const manager = new Hammer.Manager(document.body);
const Pan = new Hammer.Pan({ pointers: 0 });
const Rotate = new Hammer.Rotate();
const Pinch = new Hammer.Pinch();

const Press = new Hammer.Press({
  time: 1000,
  threshold: 15,
});

const Swipe = new Hammer.Swipe({
  direction: Hammer.DIRECTION_HORIZONTAL,
});

Rotate.recognizeWith([Pan]);
Pinch.recognizeWith([Rotate, Pan]);

manager.add(Press);
manager.add(Pan);
manager.add(Rotate);
manager.add(Pinch);
manager.add(Swipe);

manager.get('swipe').set({ enable: false });

export const enableManager = (enable: boolean = false) => {
  manager.get('pan').set({ enable });
  manager.get('pinch').set({ enable });
  manager.get('rotate').set({ enable });
  manager.get('press').set({ enable });
};

export default manager;
