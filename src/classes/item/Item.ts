import { ITEMS } from '@/data';
import { usePlayer } from '@/services/_index';
import type { ItemInfo, ItemType } from '@/types';
import { randInt } from '@/utilities';
import type Socket from '../Socket';

export default abstract class Item {
   public id: number;
   public info: ItemInfo;

   public type: ItemType;
   public quantity: number;
   public socket!: Socket;

   public value: number = randInt(1, 300);

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
      if (!this.socket) {
         console.error(`NO SLOT!`);
         return false;
      }

      let { player } = usePlayer();

      let locked = this.socket.locked;
      let purcheasable =
         this.socket.type === 'buy' ? player.value.canPurchase(this.value, 'gold') : true;

      return !locked && purcheasable;
   }
}
