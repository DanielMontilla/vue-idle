import { ITEMS } from '@/data';
import type { ItemInfo, ItemType } from '@/types';
import { randInt } from '@/utilities';

export default abstract class Item {
   public id: number;
   public info: ItemInfo;

   public type: ItemType;
   public quantity: number;

   public value: number = randInt(1, 300);
   public moveable: boolean = true;

   constructor(type: ItemType, id: number, quantity: number) {
      this.type = type;
      this.id = id;
      this.quantity = quantity;

      this.info = ITEMS[type][id];
   }

   get src() {
      return this.info.src;
   }

   get stackLimit() {
      return this.info.stackLimit;
   }

   public isDraggable(): boolean {
      let moveable = this.moveable;

      return moveable;
   }
}
