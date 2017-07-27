// @flow
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
