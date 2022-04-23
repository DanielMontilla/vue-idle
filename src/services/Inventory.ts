import { Item, Slot } from '@/classes/_index';
import { useSlots, usePlayer } from '@/services/_index';
import type { SlotRef } from '@/types';
import { ref, type Ref } from 'vue';

class Inventory {
   /* 🗿 PROPERTIES */
   /** Reactive array of reactive slot objects */
   public static slots: Ref<SlotRef[]> = ref([]);
   public static slotPrice: Ref<number> = ref(0);

   /* 💿 COMPUTED */

   public static computeSlotPrice() {
      Inventory.slotPrice.value = Math.round(10 + this.slots.value.length ** 2);
   }

   /* 🏭 FACTORY */
   public static add(item?: Item | SlotRef) {
      let slot: SlotRef;
      const slots = useSlots();

      if (item instanceof Item) {
         slot = slots.create('inventory', item);
      } else if (item) {
         slot = item;
      } else {
         slot = slots.createEmpty('inventory');
      }

      Inventory.slots.value.push(slot);
      Inventory.computeSlotPrice();
      return slot;
   }

   public static addRandom(emptyChance?: number) {
      const slots = useSlots();
      let slot = slots.createRandom('inventory', emptyChance);
      return Inventory.add(slot);
   }

   public static addRandoms(amount: number) {
      const slots = useSlots();
      let mySlots = slots.createRandoms(amount, 'inventory');
      for (const slot of mySlots) {
         Inventory.add(slot);
      }
      return mySlots;
   }

   public static addEmpty() {
      const slots = useSlots();
      let slot = slots.createEmpty('inventory');
      return Inventory.add(slot);
   }

   public static addEmpties(amount: number) {
      const slots = useSlots();
      let mySlots = slots.createEmpties(amount, 'inventory');
      for (const slot of mySlots) {
         Inventory.add(slot);
      }
      return mySlots;
   }

   public static addBuyable(amount?: number) {
      amount = amount ? amount : 1;
      const slots = useSlots();
      let mySlots: SlotRef[] = [];
      for (let i = 0; i < amount; i++) {
         mySlots.push(slots.create('inventory', undefined, 10));
      }
      Inventory.slots.value.push(...mySlots);
      return mySlots;
   }

   public static buySlot() {
      const { spend } = usePlayer();
      if (spend(Inventory.slotPrice.value, 'gold')) {
         Inventory.add();
         return true;
      } else {
         return false;
      }
   }

   /* ⭐ initialization interface */
   public static init(/* Data */) {}
}

const useInventory = () => ({
   slots: Inventory.slots,
   add: Inventory.add,
   addRandom: Inventory.addRandom,
   addRandoms: Inventory.addRandoms,
   addEmpty: Inventory.addEmpty,
   addEmpties: Inventory.addEmpties,
   addBuyable: Inventory.addBuyable,
   slotPrice: Inventory.slotPrice,
   buySlot: Inventory.buySlot,
});

export default useInventory;
