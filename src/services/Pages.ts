import { ref } from 'vue';

abstract class Pages {
   private static next = 0;

   public static current = ref(0);

   public static register = () => Pages.next++;
   public static set = (index: number) => {
      if (index < Pages.next) {
         console.warn(`Page index doesn't exist`);
         return;
      }
      Pages.current.value = index;
   };
}

const usePages = (current?: number) => {
   if (current) Pages.set(current);

   return {
      current: Pages.current,
      register: Pages.register,
      set: Pages.set,
   };
};

export default usePages;
