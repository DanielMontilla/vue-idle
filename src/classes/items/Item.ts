import { ItemTypeArr } from '@/CONST';
import { ITEMS } from '@/data';
import type { ItemInfo, ItemType, SlotType } from '@/types';
import { randArrPick, randInt, recordLength } from '@/utilities';
import { Hero, Consumable, Slot } from '@/classes/_index';

export default abstract class Item {
   public readonly info: ItemInfo;
   public slot!: Slot;
   public value: number = randInt(30, 999);

   constructor(public type: ItemType, public id: number, public quantity: number) {
      this.info = ITEMS[this.type][this.id];
   }

   public get src() {
      return this.info.src;
   }

   public get stackLimit() {
      return this.info.stackLimit;
   }

   public get slotType(): SlotType {
      if (!this.slot) {
         console.error(`NO SLOT!`);
         return 'none';
      }
      return this.slot.type;
   }

   public get isLocked(): boolean {
      if (!this.slot) {
         console.error(`NO SLOT!`);
         return false;
      }
      return this.slot.locked;
   }

   public static random(type?: ItemType): Item {
      type = type ? type : randArrPick(ItemTypeArr);

      switch (type) {
         case 'hero':
            return Hero.random();
         case 'consumable':
            return Consumable.random();
      }
   }
}
