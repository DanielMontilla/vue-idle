import { HERO_CLASS_LIST, HERO_GENDER_LIST, HERO_RACE_LIST } from '#/CONST';
import { ITEM_REGISTRY } from '#/data';
import { randRecKeyPick, randName, randArrPick, randInt } from '#/utilities';
import { Item } from '@/classes/_index';
import {
   ActivitiesObject,
   HeroClasses,
   HeroData,
   HeroGenders,
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
   public readonly gender: HeroGenders;
   public readonly race: HeroRaces;
   public readonly class: HeroClasses;
   // public skills: SkillsObject;
   // public stats: StatsObject;
   // public activities: ActivitiesObject;

   constructor(data: ItemData<'hero'>) {
      // fixing item quantity to always be 1
      data.quantity = 1;
      super(data);

      let { name, level, class: claṡs, race, gender } = data.itemData;

      this.name = name;
      this.level = level;
      this.class = claṡs;
      this.race = race;
      this.gender = gender;
   }

   /* ⚡ static members & methods */
   /**
    * TODO: implement better/worst hero generation based on normal distribution to match current player level
    */
   public static generateRandom(): Hero {
      let gender = randArrPick(HERO_GENDER_LIST);

      let data: ItemData<'hero'> = {
         type: 'hero',
         id: randRecKeyPick(ITEM_REGISTRY.hero),
         itemData: {
            name: randName(gender === '?' ? undefined : gender),
            gender: gender,
            level: randInt(1, 100),
            race: randArrPick(HERO_RACE_LIST),
            class: randArrPick(HERO_CLASS_LIST),
         },
      };

      return new Hero(data);
   }

   public get genderSymbol() {
      switch (this.gender) {
         case 'male':
            return '♂';
         case 'female':
            return '♀';
         default:
            return '?';
      }
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
            gender: this.gender,
         },
         quantity: this.quantity,
      };
   }
}
