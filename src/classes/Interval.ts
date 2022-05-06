import { useLoop } from '@/services/_index';
import type { IntervalOptions } from '@/types';

export default class Interval {
   public progress: number = 0;
   public iteration: number = 0;
   public paused: boolean;
   public iterations: number;
   public time: number;
   public remainingTime: number;
   public onIteration?: () => any;
   public onCompleted?: () => number | void;

   private loopId: number;

   public constructor(options: IntervalOptions) {
      let { time, onIteration, onCompleted, iterations, paused } = options;

      this.time = time;

      this.paused = paused ? paused : false;
      this.iterations = iterations ? iterations : 1;
      this.onIteration = onIteration;
      this.onCompleted = onCompleted;

      this.remainingTime = time;

      const { add } = useLoop();

      this.loopId = add(dt => {
         if (!this.paused) {
            let step = this.remainingTime - dt * 1000;
            if (step > 0) {
               this.remainingTime = step;
            } else {
               if (this.iterations > 0)
               this.remainingTime = time + step;
               this.iteration--;
            }
         }
      });
   }
}
