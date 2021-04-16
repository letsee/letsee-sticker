// @flow
// Object3D의 자식들중 param으로 입력된 uuid값을 가지는 Object3D를 반환함.
const getObjectById = (parent, id: string): ?Object3D => {
  let result = null;

  parent.traverse((obj) => {
    if (obj.uuid && obj.uuid === id) {
      result = obj;
    }
  });

  return result;
};

export default getObjectById;
