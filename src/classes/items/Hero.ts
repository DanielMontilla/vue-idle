import { HERO_CLASS_LIST, HERO_RACE_LIST } from '#/CONST';
import { ITEM_REGISTRY } from '#/data';
import { randRecKeyPick, randName, randArrPick, randInt } from '#/utilities';
import { Item } from '@/classes/_index';
import {
   ActivitiesObject,
   HeroClasses,
   HeroData,
   HeroRaces,
   ItemData,
   SkillsObject,
   StatsObject,
} from '@/types';

export default class Hero extends Item {
   /* 🗿 PROPERTIES */
   /** @description display name for hero */
   public name: string;
   /** @description general hero level */
   public level: number;
   public readonly race: HeroRaces;
   public readonly class: HeroClasses;
   // public skills: SkillsObject;
   // public stats: StatsObject;
   // public activities: ActivitiesObject;

   constructor(data: ItemData<'hero'>) {
      // fixing item quantity to always be 1
      data.quantity = 1;
      super(data);

      let { name, level, class: claṡs, race } = data.itemData;

      this.name = name;
      this.level = level;
      this.class = claṡs;
      this.race = race;
   }

   /* ⚡ static members & methods */
   /**
    * TODO: implement better/worst hero generation based on normal distribution to match current player level
    */
   public static generateRandom(): Hero {
      let data: ItemData<'hero'> = {
         type: 'hero',
         id: randRecKeyPick(ITEM_REGISTRY.hero),
         itemData: {
            name: randName(),
            level: randInt(1, 100),
            race: randArrPick(HERO_RACE_LIST),
            class: randArrPick(HERO_CLASS_LIST),
         },
      };

      return new Hero(data);
   }

   /* 🎭 abstract implementations */
   public getData(): ItemData<'hero'> {
      return {
         type: 'hero',
         id: this.id,
         itemData: {
            name: this.name,
            class: this.class,
            level: this.level,
            race: this.race,
         },
         quantity: this.quantity,
      };
   }
}
