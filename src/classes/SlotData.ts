import { ItemTypeArr } from '@/CONST';
import type { ItemType, SlotType } from '@/types';
import type ItemData from './ItemData';

export default class SlotData {
   private _whitelist: ItemType[] = [];
   constructor(public id: number, public type: SlotType, public item?: ItemData) {
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

   public isAllowed(item: ItemData) {
      return this._whitelist.includes(item.getInfo().type);
   }

   public notAllowed(item: ItemData) {
      return !this.isAllowed(item);
   }
}
