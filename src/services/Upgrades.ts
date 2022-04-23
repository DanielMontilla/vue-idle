import { ref } from 'vue';

const useUpgrades = () => {
   let upgrades = ref([]);

   return {
      upgrades: upgrades,
   };
};

export default useUpgrades();
2;
