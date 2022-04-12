import { items } from '@/CONST';
import type { SlotData } from '@/types';
import { defineStore } from 'pinia';
import useSlots from './slots';

interface InventoryStoreState {
   slotIndices: number[]; // list of all slot indices that belong to inventory
}

const useInventory = defineStore('inventory', {
   state: (): InventoryStoreState => ({
      slotIndices: []
   }),
   getters: {},
   actions: {
      init(slots: SlotData[]) {
         for (const slot of slots) {
            this.addSlot(slot);
         }
      },
      addSlot(data: SlotData) {
         const s = useSlots();
         this.slotIndices.push(s.add(data));
      }
   }
});

export default useInventory;
