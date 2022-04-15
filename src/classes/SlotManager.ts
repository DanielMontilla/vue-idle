import { items, SlotTypeArr } from '@/CONST';
import type { SlotRef, SlotType, Writeable } from '@/types';
import { rand, randInt, randArrPick } from '@/utilities';
import { ref, type Ref } from 'vue';
import Hero from './Hero';
import type ItemData from './ItemData';
import SlotData from './SlotData';

/** @description global slot/item manager. */
abstract class SlotManager {
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

   public static add(type?: SlotType, item?: ItemData): SlotRef {
      let slot = new SlotData(SlotManager.next++, type ? type : 'none', item);
      //@ts-ignore typescript complaining for 0 reason
      return ref<SlotData>(slot);
   }

   public static addRandom(type?: SlotType, emptyChance: number = 0.5): SlotRef {
      let tempArr = SlotTypeArr as Writeable<typeof SlotTypeArr>;
      return this.add(
         type ? type : randArrPick(tempArr),
         rand() > emptyChance ? new Hero() : undefined
      );
   }

   public static addRandoms(amount: number, type?: SlotType): SlotRef[] {
      let arr: SlotRef[] = [];
      for (let i = 0; i < amount; i++) {
         arr.push(SlotManager.addRandom(type));
      }
      return arr;
   }

   public static addEmpty(type?: SlotType): SlotRef {
      return this.add(type);
   }

   public static addEmpties(amount: number, type?: SlotType): SlotRef[] {
      let arr: SlotRef[] = [];
      for (let i = 0; i < amount; i++) {
         arr.push(SlotManager.addEmpty(type));
      }
      return arr;
   }

   public static handleDrop = (desSlotRef: SlotRef, debug?: boolean) => {
      let srcSlotRef = SlotManager.draggedSlot as SlotRef; // NOTE: its literally impossible for this be undefined

      let srcSlot = srcSlotRef.value;
      let desSlot = desSlotRef.value;
      let desItem = desSlot.item;
      let srcItem = srcSlot.item;

      if (srcSlot.id === desSlot.id) {
         // If destination === source
         if (debug) console.log(`Dropped item into its original slot. Doing Nothing...`);
         return;
      }

      if (!srcItem) {
         // If src has no item... but they how would one drag no item?
         if (debug) console.log(`How the fuck. Doing Nothing...`);
         return;
      }

      if (!desItem) {
         // If the destination slot is empty:
         if (desSlot.notAllowed(srcItem)) {
            // If source item type is not in destination slot whitelist
            if (debug)
               console.log(`Destination slot doesn't allow source item type. Doing nothing...`);
            return;
         }
         if (debug) console.log(`Destination Slot is empty. Replacing...`);
         desItem = srcItem;
         srcItem = undefined;
      } else {
         // If the destination slot is NOT empty:
         if (debug) console.log(`Destination Slot NOT Empty`);
         // if (desSlot.notAllowed(srcItem) || srcSlot.notAllowed(desItem)) {
         //    // If item type doesn't match in either slot
         //    if (debug) console.log(`One of the items is not allows in one of the slots`);
         //    return;
         // }
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
                  let temp = srcItem;
                  srcItem = desItem;
                  desItem = temp;
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
   addEmpties: SlotManager.addEmpties,
   setDragged: SlotManager.setDragged,
   clearDragged: SlotManager.clearDragged,
   handleDrop: SlotManager.handleDrop
});

export default useSlots;
