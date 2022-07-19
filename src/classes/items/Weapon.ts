import { Item } from '@/classes/_index';
import { ItemData } from '@/types';

export default class Weapon extends Item {
   constructor(data: ItemData<'weapon'>) {
      super(data);
      let { dmg } = data.itemData;
   }
}
