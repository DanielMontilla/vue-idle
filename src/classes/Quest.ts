import type { QuestConfig, Zone } from '@/types';
import type { Hero, Interval } from '@/classes/_index';
import { useInterval } from '@/services/_index';
import { ref, type Ref } from 'vue';

export default class Quest {
   public zone: Zone | undefined;
   public distance: Ref<number>;
   public time: Ref<number>;

   public hero: Ref<Hero> | undefined;

   public started: boolean;

   public isPlay: boolean;
   public isFoward: boolean;
   public isReturn: boolean;

   private interval: Interval;

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
      this.isPlay = false;
      this.isFoward = false;
      this.isReturn = false;

      const { add } = useInterval();

      this.interval = add({
         time: 5000,
         iterations: 'infinite',
         onIteration: () => console.log('hi'),
         onTick: dt => {
            if (this.isPlay) {
               if (this.isReturn) dt *= -1;

               this.time.value += dt;
               if (this.hero) {
                  this.distance.value += 1.4 * dt;
                  if (this.isFoward) {
                     this.distance.value += 1.4 * 2 * dt;
                     this.hero.value.resources.stamina.amount -= 10 * dt;
                  }
               }
            }
         },
         paused: true,
      });
   }

   play() {
      if (!this.zone) return;
      if (!this.started) this.started = true;
      this.isPlay = !this.isPlay;
      this.interval.isPaused = !this.isPlay;
      if (this.isFoward) this.isFoward = false;
   }

   return() {
      if (!this.started || !this.zone) return;
      this.isReturn = !this.isReturn;

      this.interval.pause();
   }

   foward() {
      if (!this.started || !this.zone) return;
      this.isFoward = !this.isFoward;
   }

   setHero(hero: Hero) {
      this.hero = ref(hero) as unknown as Ref<Hero>;
   }

   removeHero() {
      this.hero = undefined;
   }
}
