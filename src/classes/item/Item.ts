import { ITEMS } from '@/data';
import type { ConsumableData, HeroData, ItemData, ItemInfo, ItemType } from '@/types';
import { randInt } from '@/utilities';
import { Consumable, Hero } from '@/classes/_index';

export default abstract class Item {
   public id: number;
   public info: ItemInfo;

   public type: ItemType;
   public quantity: number;

   public value: number = randInt(1, 300);
   public moveable: boolean = true;

   constructor(data: ItemData) {
      let { type, id, quantity } = data;

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

   public static Create(data: ItemData): Item {
      let { type } = data;
      switch (type) {
         case `hero`:
            return new Hero(data as HeroData);

         case `consumable`:
            return new Consumable(data as ConsumableData);

         default:
            throw new Error(
               `item type ${type} not registered properly. Create case in Item.Create method`
            );
      }
   }

   public abstract getData(): ItemData;
}
