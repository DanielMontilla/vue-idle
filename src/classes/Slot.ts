import { ITEM_TYPE_ARR } from '@/CONST';
import type { ItemType, SlotType } from '@/types';
import type { Item } from '@/classes/_index';

export default class Slot {
   private _whitelist: ItemType[] = [];
   public locked: boolean = false;
   constructor(
      public id: number,
      public type: SlotType,
      private _item?: Item,
      public price?: number
   ) {
      switch (type) {
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

         case 'disabled':
            break;

         default:
            console.warn(`Slot type '${type}' whitelist not specified`);
            this.whitelistAll();
            break;
      }

      if (_item) _item.slot = this;
   }

   public get item(): Item | undefined {
      return this._item;
   }

   public set item(item: Item | undefined) {
      this._item = item;
      if (item) item.slot = this;
   }

   public get whitelist() {
      return this._whitelist;
   }

   public addToWhitelist(...types: ItemType[]) {
      types.forEach(t => {
         if (!this.whitelist.includes(t)) {
            this.whitelist.push(t);
         }
      });
   }

   public whitelistAll() {
      this._whitelist = [...ITEM_TYPE_ARR];
   }

   public isAllowed(item: Item) {
      return this._whitelist.includes(item.type);
   }

   public notAllowed(item: Item) {
      return !this.isAllowed(item);
   }

   public buy() {
      this.price = undefined;
   }
}
