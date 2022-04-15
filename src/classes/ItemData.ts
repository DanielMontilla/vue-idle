import { items } from '@/CONST';

export default abstract class ItemData {
   constructor(public id: number, public quantity: number) {}

   public getInfo() {
      return items[this.id];
   }
}
