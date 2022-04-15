import { HeroClassArr, HeroRaceArr, heros } from '@/CONST';
import type { HeroClass, HeroConfig, HeroRace } from '@/types';
import { randArrPick, randInt } from '@/utilities';
import ItemData from './ItemData';
import { faker } from '@faker-js/faker';

export default class Hero extends ItemData {
   public level: number;
   public name: string;
   public readonly race: HeroRace;
   public readonly class: HeroClass;

   constructor(config?: HeroConfig) {
      config = config
         ? config
         : {
              name: faker.name.firstName(),
              level: randInt(0, 999),
              race: randArrPick(HeroRaceArr),
              class: randArrPick(HeroClassArr)
           };

      super(heros[config.race], 1);

      this.name = config.name;
      this.level = config.level;
      this.race = config.race;
      this.class = config.class;
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
