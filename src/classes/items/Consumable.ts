import { Item, Slot } from '@/classes/_index';
import type { Consumables } from '@/types';
import { CONSUMABLE_ID_MAP } from '@/data';
import { randInt, randRecKeyPick } from '@/utilities';

export default class Consumable extends Item {
   constructor(id: Consumables, quantity: number) {
      super('consumable', CONSUMABLE_ID_MAP[id], quantity);
   }

   public static random() {
      return new Consumable(randRecKeyPick(CONSUMABLE_ID_MAP), randInt(1, 16));
   }
}
