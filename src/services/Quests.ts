import { Quest } from '@/classes/_index';
import type { QuestConfig, QuestRef } from '@/types';
import { ref, type Ref } from 'vue';

const useQuests = () => {
   const boot = (configs: Array<QuestConfig | undefined> | number): Ref<QuestRef[]> => {
      configs =
         typeof configs === 'number'
            ? new Array<QuestConfig | undefined>(configs).fill(undefined)
            : configs;

      let arr: QuestRef[] = [];

      configs.forEach(c => {
         let quest = new Quest(c);
         // @ts-ignore weird typescript error
         let questRef: QuestRef = ref(quest);
         arr.push(questRef);
      });
      return ref(arr);
   };
   const get = (config?: QuestConfig): QuestRef => {
      let quest = new Quest(config);
      // @ts-ignore weird typescript error
      return ref(quest);
   };

   return {
      boot: boot,
      get: get,
   };
};

export default useQuests;
