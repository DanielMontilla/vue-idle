import { Item } from '@/classes/_index';
import { ConsumableData, ItemData } from '@/types';

export default class Consumable extends Item {
   constructor(data: ItemData<'consumable'>) {
      super(data);
      let { color } = data.itemData;
   }
}
