const saveObject = {
   shop: {
      barracks: {},
   },
};

type Save = typeof saveObject;

const load = (): Save => saveObject;
const save = () => {};

const useSave = () => ({ load, save });

export default useSave;
