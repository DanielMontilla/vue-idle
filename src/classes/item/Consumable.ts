import { Item } from '@/classes/_index';
import type { ConsumableData } from '@/types';
import { randInt } from '@/utilities';

export default class Consumable extends Item {
   constructor(data: ConsumableData) {
      super(data);
   }

   public static Random() {
      return new Consumable({ id: 1, quantity: randInt(0, 64), type: 'consumable' });
   }

   public getData(): ConsumableData {
      return {
         type: 'consumable',
         id: this.id,
         quantity: this.quantity,
      };
   }
}
