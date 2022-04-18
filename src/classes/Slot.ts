import { ItemTypeArr } from '@/CONST';
import type { ItemType, SlotType } from '@/types';
import type { Item } from '@/classes/_index';

export default class Slot {
   private _whitelist: ItemType[] = [];
   public locked: boolean = false;
   constructor(public id: number, public type: SlotType, private _item?: Item) {
      switch (type) {
         case 'training':
            this.addToWhitelist('hero');
            break;

         case 'inventory':
            this.whitelistAll();
            break;

         case 'buy':
            // this.whitelistAll();
            break;

         case 'activity':
            this.addToWhitelist('hero');
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
      this._whitelist = [...ItemTypeArr];
   }

   public isAllowed(item: Item) {
      return this._whitelist.includes(item.type);
   }

   public notAllowed(item: Item) {
      return !this.isAllowed(item);
   }
}
