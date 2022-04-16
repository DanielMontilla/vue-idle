import { ItemTypeArr } from '@/CONST';
import { items } from '@/data';
import type { ItemInfo, ItemType } from '@/types';
import { randArrPick, randInt, recordLength } from '@/utilities';
import { Hero, Consumable } from '@/classes/_index';

export default abstract class Item {
   public readonly info: ItemInfo;
   constructor(public type: ItemType, public id: number, public quantity: number) {
      this.info = items[this.type][this.id];
   }

   public get src() {
      return this.info.src;
   }

   public get stackLimit() {
      return this.info.stackLimit;
   }

   public static random(type?: ItemType): Item {
      type = type ? type : randArrPick(ItemTypeArr);
      let id = randInt(1, recordLength(items[type]));
      let itemInfo = items[type][id];
      let quantity = randInt(1, itemInfo.stackLimit);

      switch (type) {
         case 'hero':
            return Hero.random();
         case 'consumable':
            return Consumable.random();
      }
   }
}
