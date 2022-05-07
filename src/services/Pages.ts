import { ref } from 'vue';

let next = 0;
const current = ref(2);

const register = () => next++;
const set = (index: number) => {
   if (index > next) {
      console.warn(`Page index doesn't exist`);
      return;
   }
   current.value = index;
};

const usePages = (index?: number) => {
   if (index) set(index);

   return {
      current: current,
      register: register,
      set: set,
   };
};

export default usePages;
