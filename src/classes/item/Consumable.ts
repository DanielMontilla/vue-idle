import { Item } from '@/classes/_index';

export default class Consumable extends Item {
   constructor(id: number = 1, quantity: number = 1) {
      super('consumable', id, quantity);
   }

   public static Random() {
      return new Consumable();
   }
}
