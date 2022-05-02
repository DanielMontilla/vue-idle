import type { QuestConfig, Zone } from '@/types';
import type { Hero, Interval } from '@/classes/_index';
import { useInterval, useLoop } from '@/services/_index';
import type { Ref } from 'vue';

export default class Quest {
   public zone: Zone;
   public distance: number;
   public time: number;
   public hero: Hero | undefined;

   public started: boolean;

   public isPlay: boolean;
   public isFoward: boolean;
   public isBacking: boolean;

   private loop?: number;
   private interval?: Ref<Interval>;

   constructor(config?: QuestConfig) {
      config = config
         ? config
         : {
              // Default
              zone: 'gardens',
              distance: 0,
              time: 0,
           };

      this.zone = config.zone;
      this.distance = config.distance;
      this.time = config.time;

      this.started = false;
      this.isPlay = false;
      this.isFoward = false;
      this.isBacking = false;
   }

   registerHero(hero: Hero) {
      this.hero = hero;
   }

   removeHero() {
      this.hero = undefined;
   }

   begin() {
      if (!this.hero) return;
      this.hero.moveable = false;
      this.started = true;

      // let { add } = useInterval();
      let loop = useLoop();

      this.loop = loop.add(dt => {
         if (!this.isPlay) return;
         this.distance += (this.hero as Hero).stats.speed * dt;
         this.time += dt;
      });
   }

   end() {
      if (!this.loop) return;
      let loop = useLoop();
      loop.remove(this.loop);
   }

   play() {
      if (!this.started) this.begin();
      this.isPlay = !this.isPlay;
      if (this.isFoward) this.isFoward = false;
   }

   back() {
      if (!this.started) return;
      this.isBacking = !this.isBacking;
   }

   foward() {
      if (!this.started) return;
      this.isFoward = !this.isFoward;
   }

   return() {
      if (!this.hero) return;
      this.started = false;
      this.hero.moveable = true;
   }
}
