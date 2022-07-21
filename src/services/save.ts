import { DEF_BARRACK_SLOTS } from '#/CONST';
import { ref } from 'vue';

const state = ref({
   shop: {
      barracks: {
         slots: DEF_BARRACK_SLOTS,
      },
   },
});

const load = () => {};
const save = () => {};

const useSave = () => ({ state, load, save });

export default useSave;
