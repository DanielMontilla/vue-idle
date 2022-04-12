import { items } from '@/CONST';
import type { ItemData, SlotData } from '@/types';
import { defineStore } from 'pinia';

interface SlotsStoreState {
   slots: Record<number, SlotData>; // list of all slots
   next: number; // next available unique id
   dragging?: number; // index of item's slot being dragged
}

const useSlots = defineStore('slots', {
   state: (): SlotsStoreState => ({
      slots: {},
      dragging: undefined,
      next: 0
   }),
   getters: {},
   actions: {
      add(data: SlotData) {
         this.slots[this.next] = data;
         this.next++;
         return this.next - 1;
      },
      setDragging(i: number) {
         this.dragging = i;
      },
      clearDragging() {
         this.dragging = undefined;
      },
      set(index: number, data: SlotData) {
         this.slots[index] = data;
      },
      setItem(index: number, data?: ItemData) {
         this.slots[index].item = data;
      },
      handleDrop(desIndex: number) {
         if (this.dragging === undefined) {
            console.error(`Could not drop because not dragging`);
            return;
         }

         // Setting relevant source and destination data
         let srcIndex = this.dragging;
         let desSlot = this.slots[desIndex];
         let srcSlot = this.slots[srcIndex];
         let desItem = desSlot.item;
         let srcItem = srcSlot.item;

         if (!desItem) {
            desItem = srcItem;
            srcItem = undefined;
         } else {
            if (!srcItem) return;
            if (desItem.id === srcItem.id) {
               let stackLimit = items[srcItem.id].stackLimit;
               let sum = desItem.quantity + srcItem.quantity;
               if (sum > stackLimit) {
                  let remainder = sum - stackLimit;
                  if (desItem.quantity === stackLimit) {
                     srcItem.quantity = stackLimit;
                     desItem.quantity = remainder;
                  } else {
                     srcItem.quantity = remainder;
                     desItem.quantity = stackLimit;
                  }
               } else {
                  desItem.quantity = sum;
                  srcItem = undefined;
               }
            } else {
               // SWAP
               console.log('SWAPPING');
               let temp = srcItem;
               srcItem = desItem;
               desItem = temp;
            }
         }

         desSlot.item = desItem;
         srcSlot.item = srcItem;

         this.set(srcIndex, srcSlot);
         this.set(desIndex, desSlot);
      }
   }
});

export default useSlots;
