import { ITEMS } from '@/data';
import type { ItemInfo, ItemType } from '@/types';
import type Socket from '../Socket';

export default abstract class Item {
   public id: number;
   public info: ItemInfo;

   public type: ItemType;
   public quantity: number;
   public socket!: Socket;

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
}
