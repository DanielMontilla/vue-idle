import type { QuestConfig, Zone } from '@/types';
import type { Hero } from '@/classes/_index';

export default class Quest {
   public zone: Zone;
   public distance: number;
   public time: number;
   public hero: Hero | undefined;

   public started: boolean;

   public play: boolean;
   public foward: boolean;
   public return: boolean;

   // private interval: Interval

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
      this.play = false;
      this.foward = false;
      this.return = false;
   }
}
