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
   public name: string;
   // public readonly race: HeroRaces;
   // public readonly class: HeroClasses;
   // public skills: SkillsObject;
   // public stats: StatsObject;
   // public activities: ActivitiesObject;

   constructor(data: ItemData<'hero'>) {
      super(data);

      let { name } = data.itemData;

      this.name = name;
   }

   /* 🎭 Abstract memebrs & methods */
}
