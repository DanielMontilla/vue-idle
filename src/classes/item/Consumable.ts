import { Item } from '@/classes/_index';
import { randInt, randRecKeyPick } from '@/utilities';

export default class Consumable extends Item {
   constructor(id: number, quantity: number) {
      super('consumable', id, quantity);
   }
}
