import { items } from '@/data';
import type { ItemInfo, ItemType } from '@/types';

export default abstract class Item {
   private info: ItemInfo;
   constructor(public type: ItemType, public id: number, public quantity: number) {
      this.info = items[this.type][this.id];
   }

   public get src() {
      return this.info.src;
   }

   public get stackLimit() {
      return this.info.stackLimit;
   }

   public getInfo() {
      return items[this.type][this.id];
   }
}
