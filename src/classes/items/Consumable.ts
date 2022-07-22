import { Item } from '@/classes/_index';
import { ConsumableData, ItemData } from '@/types';

export default class Consumable extends Item {
   /* 🗿 PROPERTIES */
   public color: number;

   constructor(data: ItemData<'consumable'>) {
      super(data);
      let { color } = data.itemData;
      this.color = color;
   }

   /* 🎭 abstract implementations */
   public getData(): ItemData<'consumable'> {
      return {
         id: this.id,
         type: 'consumable',
         itemData: {
            color: this.color,
         },
         quantity: this.quantity,
      };
   }
}
