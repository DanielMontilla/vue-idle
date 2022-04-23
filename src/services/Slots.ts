import { SLOT_TYPE_ARR } from '@/CONST';
import type { SlotRef, SlotType } from '@/types';
import { rand, randArrPick } from '@/utilities';
import { Item, Hero, Slot } from '@/classes/_index';
import { ref } from 'vue';

/** @description global slot/item manager. */
abstract class Slots {
   /* 🗿 PROPERTIES */
   private static next: number = 0;
   private static draggedSlot?: SlotRef;

   /* 📐 SETTERS */
   public static setDragged(slot: SlotRef) {
      Slots.draggedSlot = slot;
   }

   public static clearDragged() {
      Slots.draggedSlot = undefined;
   }

   /* 🏭 FACTORY */
   public static create(type?: SlotType, item?: Item): SlotRef {
      let slot = new Slot(Slots.next++, type ? type : 'none', item);
      // @ts-ignore typescript complaining for 0 reason
      return ref<Slot>(slot);
   }

   public static createRandom(type?: SlotType, emptyChance: number = 0.5): SlotRef {
      return Slots.create(
         type ? type : randArrPick(SLOT_TYPE_ARR),
         rand() > emptyChance ? Item.random() : undefined
      );
   }

   public static createRandoms(amount: number, type?: SlotType): SlotRef[] {
      let arr: SlotRef[] = [];
      for (let i = 0; i < amount; i++) {
         arr.push(Slots.createRandom(type));
      }
      return arr;
   }

   public static createEmpty(type?: SlotType): SlotRef {
      return Slots.create(type);
   }

   public static createEmpties(amount: number, type?: SlotType): SlotRef[] {
      let arr: SlotRef[] = [];
      for (let i = 0; i < amount; i++) {
         arr.push(Slots.createEmpty(type));
      }
      return arr;
   }

   public static handleDrop = (desSlotRef: SlotRef, debug?: boolean) => {
      let srcSlotRef = Slots.draggedSlot as SlotRef; // NOTE: its literally impossible for this be undefined

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

      if (srcSlot.locked || desSlot.locked) {
         // If either slot is locked
         if (debug) console.log(`Source slot is locked. Can't take or put items in`);
         return;
      }

      if (desSlot.notAllowed(srcItem) || (desItem && srcSlot.notAllowed(desItem))) {
         // If either destination slot doesn't allow source item or source slot doesn't allow destination item (if there is one)
         if (debug)
            console.log(
               `Source or Destination slot's whitelist preven one the items involved. Doing Nothing...`
            );
         return;
      }

      if (!desItem) {
         // If the destination slot is empty:
         if (debug) console.log(`Destination Slot is empty. Replacing...`);
         desItem = srcItem;
         srcItem = undefined;
      } else {
         // If the destination slot is NOT empty:
         if (debug) console.log(`Destination Slot NOT Empty`);
         if (desItem.id === srcItem.id && desItem.type === srcItem.type) {
            // If both slots have the same item:
            if (debug) console.log(`Both item's slots are the same (Id)`);
            let stackLimit = desItem.stackLimit;
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
               if (debug)
                  console.log(`The sum does NOT surpass the stack-limit. Merging...`);
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
   create: Slots.create,
   createRandom: Slots.createRandom,
   createRandoms: Slots.createRandoms,
   createEmpty: Slots.createEmpty,
   createEmpties: Slots.createEmpties,
   setDragged: Slots.setDragged,
   clearDragged: Slots.clearDragged,
   handleDrop: Slots.handleDrop,
});

export default useSlots;
