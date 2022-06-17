import { Item, Hero, Consumable } from '@/classes/_index';
import { ITEM_TYPE_ARR } from '@/CONST';
import type {
   ConsumableData,
   HeroData,
   ItemData,
   ItemType,
   SocketData,
   SocketType,
} from '@/types';

export default class Socket {
   public item?: Item;

   public whitelist: ItemType[] = [];
   public isLocked: boolean = false;
   public type: SocketType = 'none';

   private static next = 0;
   public readonly id: number;

   constructor({ type, item }: SocketData) {
      if (type) this.type = type;

      switch (this.type) {
         case 'inventory':
            this.whitelistAll();
            break;

         case 'quest':
            this.addToWhitelist('hero');
            break;

         case 'buy':
            break;

         case 'activity':
            this.addToWhitelist('hero');
            break;

         default:
            console.warn(`Slot type '${type}' whitelist not specified`);
            this.whitelistAll();
            break;
      }

      this.id = Socket.next++;
      if (item) this.item = Item.Create(item);
   }

   public whitelistAll() {
      this.whitelist = [...ITEM_TYPE_ARR];
   }

   public addToWhitelist(...types: ItemType[]) {
      types.forEach(t => {
         if (!this.whitelist.includes(t)) {
            this.whitelist.push(t);
         }
      });
   }

   public isAllowed(item: Item) {
      return this.whitelist.includes(item.type);
   }

   public notAllowed(item: Item) {
      return !this.isAllowed(item);
   }

   public insert(item: Item) {
      this.item = item;
   }

   public fromData({ type, item }: SocketData) {
      this.type = type ? type : 'none';
      this.item = item ? Item.Create(item) : undefined;
   }

   public lock() {
      this.isLocked = true;
      return this;
   }

   public getData(): SocketData {
      return {
         type: this.type,
         item: this.item?.getData(),
      };
   }
}
