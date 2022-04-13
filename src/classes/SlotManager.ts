import { items } from '@/CONST';
import type { ItemData, SlotData, SlotRef, SlotType } from '@/types';
import { rand, randInt } from '@/utilities';
import { ref, type Ref } from 'vue';

/** @description global slot manager */
class SlotManager {
   /** next available unique slot id */
   private static next: number = 0;
   /** if mid-drag, populated by source slot. Otherwise undefined */
   private static draggedSlot?: SlotRef;

   public static setDragged(slot?: SlotRef) {
      SlotManager.draggedSlot = slot;
   }

   public static clearDragged() {
      SlotManager.setDragged(undefined);
   }

   public static add(type?: SlotType, item?: ItemData): Ref<SlotData> {
      return ref({ id: SlotManager.next++, type: type ? type : 'none', item: item });
   }

   public static addRandom(): Ref<SlotData> {
      return this.add(
         'none',
         rand() > 0.5 ? { id: randInt(1, 2), quantity: randInt(1, 16) } : undefined
      );
   }

   public static addEmpty(): Ref<SlotData> {
      return this.add('none');
   }

   public static addRandoms(amount: number): Ref<SlotData>[] {
      let arr: Ref<SlotData>[] = [];
      for (let i = 0; i < amount; i++) {
         arr.push(SlotManager.addRandom());
      }
      return arr;
   }

   public static handleDrop = (desSlotRef: SlotRef, debug?: boolean) => {
      let srcSlotRef = SlotManager.draggedSlot as SlotRef; // NOTE: its literally impossible for this be undefined

      let srcSlot = srcSlotRef.value;
      let desSlot = desSlotRef.value;
      let desItem = desSlot.item;
      let srcItem = srcSlot.item;

      if (srcSlot.id === desSlot.id) return;

      if (!desItem) {
         // If the destination slot is empty:
         if (debug) console.log(`Destination Slot is empty. Replacing...`);
         desItem = srcItem;
         srcItem = undefined;
      } else {
         // If the destination slot is NOT empty:
         if (debug) console.log(`Destination Slot NOT Empty`);
         if (!srcItem) return;
         if (desItem.id === srcItem.id) {
            // If both slots have the same item:
            if (debug) console.log(`Both item's slots are the same (Id)`);
            let stackLimit = items[srcItem.id].stackLimit;
            let sum = desItem.quantity + srcItem.quantity;
            if (sum > stackLimit) {
               // If the sum of the quantities surpass the stack limit:
               if (debug) console.log(`The sum surpass the stack-limit`);
               let remainder = sum - stackLimit;
               if (desItem.quantity === stackLimit) {
                  // If destination slot is already full:
                  if (debug) console.log(`Destination slot is already full. Swapping...`);
                  srcItem.quantity = stackLimit;
                  desItem.quantity = remainder;
               } else {
                  // If destination slot can only hold a portion:
                  if (debug) console.log(`Destination slot has space. Splitting...`);
                  srcItem.quantity = remainder;
                  desItem.quantity = stackLimit;
               }
            } else {
               // If sum does NOT surpass stack size:
               if (debug) console.log(`The sum does NOT surpass the stack-limit. Merging...`);
               desItem.quantity = sum;
               srcItem = undefined;
            }
         } else {
            // If both slots have diferent items:
            if (debug) console.log(`Slot's items are different. Swapping...`);
            let temp = srcItem;
            srcItem = desItem;
            desItem = temp;
         }
      }

      srcSlot.item = srcItem;
      desSlot.item = desItem;
   };
}

/**
 * kinda like a react hook huh :)
 */
const useSlots = () => ({
   add: SlotManager.add,
   addRandom: SlotManager.addRandom,
   addRandoms: SlotManager.addRandoms,
   addEmpty: SlotManager.addEmpty,
   setDragged: SlotManager.setDragged,
   clearDragged: SlotManager.clearDragged,
   handleDrop: SlotManager.handleDrop
});

export default useSlots;
