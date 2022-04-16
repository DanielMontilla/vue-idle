import { Item, Slot } from '@/classes/_index';
import type { Consumables } from '@/types';
import { consumableInfoMap } from '@/data';
import { randInt, randRecKeyPick } from '@/utilities';

export default class Consumable extends Item {
   constructor(id: Consumables, quantity: number) {
      super('consumable', consumableInfoMap[id], quantity);
   }

   public static random() {
      return new Consumable(randRecKeyPick(consumableInfoMap), randInt(1, 16));
   }
}
