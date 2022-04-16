import { HeroClassArr, HeroRaceArr } from '@/CONST';
import type { HeroClass, HeroConfig, HeroRace, Stat } from '@/types';
import { expCalc, mapValue, randArrPick, randInt } from '@/utilities';
import { Item } from '@/classes/_index';
import { faker } from '@faker-js/faker';
import { heroInfoMap } from '@/data';

export default class Hero extends Item {
   public level: Stat;
   public name: string;
   public readonly race: HeroRace;
   public readonly class: HeroClass;

   constructor(config?: HeroConfig) {
      config = config
         ? config
         : {
              name: faker.name.firstName(),
              level: randInt(0, 5),
              race: randArrPick(HeroRaceArr),
              class: randArrPick(HeroClassArr)
           };

      super('hero', heroInfoMap[config.race], 1);

      this.name = config.name;
      this.level = { level: config.level, currentExp: 0, neededExp: expCalc(config.level) };
      this.race = config.race;
      this.class = config.class;
   }

   private updateNeededExp() {
      this.level.neededExp = expCalc(this.level.level);
   }

   public addExp(amount: number) {
      let step = amount + this.level.currentExp;
      if (step >= this.level.neededExp) {
         let remainder = step - this.level.neededExp;
         this.level.level++;
         this.level.currentExp = remainder;
         this.updateNeededExp();
      } else {
         this.level.currentExp = step;
      }
   }

   public get progress() {
      return mapValue([0, this.level.neededExp], [0, 100], this.level.currentExp);
   }

   // TODO: streamline
   public getRaceIcon() {
      let icon = '';

      switch (this.class) {
         case 'knight':
            icon = 'sword';
            break;
         case 'archer':
            icon = 'bow';
            break;
         case 'mage':
            icon = 'wand';
            break;
      }

      return `src/assets/icons/${icon}.svg`;
   }
}
