import { items } from '@/CONST';
import type { ItemData } from '@/types';
import { defineStore } from 'pinia';

interface InventoryStoreState {
   slots: Array<ItemData | undefined>;
   dragging?: number;
}

/**
 * Matains global state on player inventory because HTML drag & drop api is dogshit
 */
const useInventory = defineStore('inventory', {
   state: (): InventoryStoreState => ({
      slots: [],
      dragging: undefined
   }),
   getters: {
      items(state) {
         return state.slots;
      }
   },
   actions: {
      init(slots: Array<ItemData | undefined>) {
         this.slots = slots;
      },
      addSlot(item: ItemData | undefined) {
         this.slots.push(item);
      },
      setDragging(i: number) {
         this.dragging = i;
      },
      clearDragging() {
         this.dragging = undefined;
      },
      setSlot(index: number, data?: ItemData) {
         this.slots[index] = data;
      },
      handleDrop(destIndex: number) {
         if (this.dragging === undefined) {
            console.error(`Could not drop because not dragging`);
            return;
         }

         // Setting relevant source and destination data
         let srcIndex = this.dragging;
         let destSlot = this.slots[destIndex];
         let srcSlot = this.slots[srcIndex];

         if (!destSlot) {
            destSlot = srcSlot;
            srcSlot = undefined;
         } else {
            if (!srcSlot) return;
            if (destSlot.id == srcSlot.id) {
               let stackLimit = items[srcSlot.id].stackLimit;
               let sum = destSlot.quantity + srcSlot.quantity;
               if (sum > stackLimit) {
                  let remainder = sum - stackLimit;
                  if (destSlot.quantity === stackLimit) {
                     srcSlot.quantity = stackLimit;
                     destSlot.quantity = remainder;
                  } else {
                     srcSlot.quantity = remainder;
                     destSlot.quantity = stackLimit;
                  }
               } else {
                  destSlot.quantity = sum;
                  srcSlot = undefined;
               }
            }
         }

         this.setSlot(srcIndex, srcSlot);
         this.setSlot(destIndex, destSlot);
      }
   }
});

export default useInventory;
