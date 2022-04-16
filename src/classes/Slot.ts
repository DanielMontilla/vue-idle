import { ItemTypeArr } from '@/CONST';
import type { ItemType, SlotType } from '@/types';
import type { Item } from '@/classes/_index';

export default class Slot {
   private _whitelist: ItemType[] = [];
   private _locked: boolean = false;
   constructor(public id: number, public type: SlotType, public item?: Item) {
      switch (type) {
         case 'training':
            this.addToWhitelist('hero');
            break;

         default:
            this.whitelistAll();
            break;
      }
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
