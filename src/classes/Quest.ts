import type { QuestConfig, Zone } from '@/types';
import type { Hero } from '@/classes/_index';
import { useLoop } from '@/services/_index';
import { ref, type Ref } from 'vue';

export default class Quest {
   public zone: Zone | undefined;
   public distance: Ref<number>;
   public time: Ref<number>;

   public hero: Ref<Hero> | undefined;

   public started: boolean;

   public play: boolean;
   public foward: boolean;
   public return: boolean;

   private loopId: number;

   constructor(config?: QuestConfig) {
      config = config
         ? config
         : {
              // Default
              zone: undefined,
              distance: 0,
              time: 0,
           };

      this.zone = config.zone;
      this.distance = ref(config.distance);
      this.time = ref(config.time);

      this.started = false;
      this.play = false;
      this.foward = false;
      this.return = false;

      const { add } = useLoop();

      this.loopId = add(dt => {
         if (this.play) {
            if (this.return) dt *= -1;

            this.time.value += dt;
            if (this.hero) {
               this.distance.value += 1.4 * dt;
               if (this.foward) {
                  this.distance.value += 1.4 * 2 * dt;
                  this.hero.value.resources.stamina.amount -= 10 * dt;
               }
            }
         }
      });
   }

   setHero(hero: Hero) {
      this.hero = ref(hero) as unknown as Ref<Hero>;
   }

   removeHero() {
      this.hero = undefined;
   }
}
