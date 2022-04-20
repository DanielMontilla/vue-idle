import type { Item, Slot } from '@/classes/_index';
import { useSlots } from '@/services/_index';
import type { SlotRef } from '@/types';
import { ref, type Ref } from 'vue';

class Inventory {
   /* 🗿 PROPERTIES */
   /** Reactive array of reactive slot objects */
   public static slots: Ref<SlotRef[]> = ref([]);

   /* 🏭 FACTORY */
   public static add(item?: Item) {
      const slots = useSlots();
      let slot = ref(slots.create('inventory', item));
      Inventory.slots.value.push(slot);
      return slot;
   }

   public static addRandom(emptyChance?: number) {
      const slots = useSlots();
      let slot = slots.createRandom('inventory', emptyChance);
      Inventory.slots.value.push(slot);
      return slot;
   }

   public static addRandoms(amount: number) {
      const slots = useSlots();
      let mySlots = slots.createRandoms(amount, 'inventory');
      Inventory.slots.value.push(...mySlots);
      return mySlots;
   }

   public static addEmpty() {
      const slots = useSlots();
      let slot = slots.createEmpty('inventory');
      Inventory.slots.value.push(slot);
      return slot;
   }

   public static addEmpties(amount: number) {
      const slots = useSlots();
      let mySlots = slots.createEmpties(amount, 'inventory');
      Inventory.slots.value.push(...mySlots);
      return mySlots;
   }
}

const useInventory = () => ({
   slots: Inventory.slots,
   add: Inventory.add,
   addRandom: Inventory.addRandom,
   addRandoms: Inventory.addRandoms,
   addEmpty: Inventory.addEmpty,
   addEmpties: Inventory.addEmpties,
});

export default useInventory;
