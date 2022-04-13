import { items } from '@/CONST';
import type { ItemData, SlotData, SlotType } from '@/types';
import { rand, randInt } from '@/utilities';
import { ref, type Ref } from 'vue';

/**
 * @description Object to hold data about slots and manage their operations
 */
export default class uSlot {
   public static count = 0;
   private static draggedSlot: uSlot | undefined;
   public id: number;

   private constructor(public type: SlotType, public item: ItemData | undefined) {
      this.id = uSlot.count;
      uSlot.count++;
   }

   public getItem() {
      return this.item;
   }

   public static getRandomRef = (): Ref<uSlot> => {
      return ref(uSlot.Random());
   };

   public static getEmptyRef = (): Ref<uSlot> => {
      return ref(uSlot.Empty());
   };

   public static setDragging = (slot: uSlot | undefined) => (uSlot.draggedSlot = slot);
   public static Empty = () => new uSlot('none', undefined);
   public static Random = () =>
      new uSlot(
         'rogue',
         rand() > 0.5 ? { id: randInt(1, 2), quantity: randInt(1, 16) } : undefined
      );

   public static Randoms(amount: number) {
      let arr: uSlot[] = [];
      for (let i = 0; i < amount; i++) {
         arr.push(uSlot.Random());
      }
      return arr;
   }
   public static handleDrop = (desSlot: uSlot) => {
      let srcSlot = uSlot.draggedSlot as uSlot; // NOTE: its literally impossible for this be undefined
      let desItem = desSlot.item;
      let srcItem = srcSlot.item;

      if (srcSlot.id === desSlot.id) return;

      if (!desItem) {
         // If the destination slot is empty:
         desItem = srcItem;
         srcItem = undefined;
      } else {
         // If the destination slot is NOT empty:
         if (!srcItem) return;
         if (desItem.id === srcItem.id) {
            // If both slots have the same item:
            let stackLimit = items[srcItem.id].stackLimit;
            let sum = desItem.quantity + srcItem.quantity;
            if (sum > stackLimit) {
               // If the sum of the quantities surpass the stack limit:
               let remainder = sum - stackLimit;
               if (desItem.quantity === stackLimit) {
                  // If destination slot is already full:
                  srcItem.quantity = stackLimit;
                  desItem.quantity = remainder;
               } else {
                  // If destination slot can only hold a portion:
                  srcItem.quantity = remainder;
                  desItem.quantity = stackLimit;
               }
            } else {
               //
               desItem.quantity = sum;
               srcItem = undefined;
            }
         } else {
            // If both slots have diferent items:
            let temp = srcItem;
            srcItem = desItem;
            desItem = temp;
         }
      }

      srcSlot.item = srcItem;
      desSlot.item = desItem;
   };
}
