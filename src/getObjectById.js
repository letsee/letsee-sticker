// @flow
const getObjectById = (parent, id: string) => {
  let result = null;

  parent.traverse((obj) => {
    if (obj.uuid && obj.uuid === id) {
      result = obj;
    }
  });

  return result;
};

export default getObjectById;
