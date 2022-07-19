import { ITEM_REGISTRY } from '#/data';
import { $ItemTypeToClass, ItemData, ItemInfo, ItemTypes } from '@/types';
import { Hero, Consumable } from '@/classes/_index';

export default abstract class Item {
   public id: number;
   public value: number;
   public quantity: number;

   public info: ItemInfo;
   public type: ItemTypes;

   protected constructor(data: ItemData<ItemTypes>) {
      let { type, id, quantity } = data;
      this.id = id;
      this.quantity = quantity ? quantity : 1;
      this.value = 0; // TODO: add 'compute' method

      this.info = ITEM_REGISTRY[type][id];
      this.type = type;
   }

   /* 🔎 getters */
   get src() {
      return `${this.type}/${this.info.src}`;
   }

   get stackLimit() {
      return this.info.stackLimit;
   }

   /* 🎭 Abstract memebrs & methods */
   public static fromData<T extends ItemTypes>(data: ItemData<T>): $ItemTypeToClass<T> {
      switch (data.type) {
         case 'hero':
            return new Hero(data as ItemData<'hero'>) as $ItemTypeToClass<T>;
         case 'consumable':
            return new Consumable(data as ItemData<'consumable'>) as $ItemTypeToClass<T>;
         default:
            throw new Error('Item type is not registered');
      }
   }
}
