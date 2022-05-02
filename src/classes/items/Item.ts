import { ITEM_TYPE_ARR } from '@/CONST';
import { ITEMS } from '@/data';
import type { ItemInfo, ItemType, SlotType } from '@/types';
import { randArrPick, randInt, recordLength } from '@/utilities';
import { Hero, Consumable, Slot } from '@/classes/_index';
import usePlayer from '@/services/Player';

export default abstract class Item {
   public readonly info: ItemInfo;
   public slot!: Slot;
   public value: number = 100;
   public moveable: boolean = true;

   constructor(public type: ItemType, public id: number, public quantity: number) {
      this.info = ITEMS[this.type][this.id];
   }

   public get src() {
      return this.info.src;
   }

   public get stackLimit() {
      return this.info.stackLimit;
   }

   public get slotType(): SlotType {
      if (!this.slot) {
         console.error(`NO SLOT!`);
         return 'none';
      }
      return this.slot.type;
   }

   public get isDraggable(): boolean {
      if (!this.slot) {
         console.error(`NO SLOT!`);
         return false;
      }

      let { player } = usePlayer();

      let moveable = this.moveable;
      let locked = this.slot.locked;
      let buyable = this.slot.price !== undefined;
      let purcheasable =
         this.slot.type === 'buy' ? player.value.canPurchase(this.value, 'gold') : true;

      return !locked && !buyable && purcheasable && moveable;
   }

   public static random(type?: ItemType): Item {
      type = type ? type : randArrPick(ITEM_TYPE_ARR);

      switch (type) {
         case 'hero':
            return Hero.random();
         case 'consumable':
            return Consumable.random();
      }
   }
}
