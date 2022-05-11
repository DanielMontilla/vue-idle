import { useLoop } from '@/services/_index';
import type { IntervalOptions } from '@/types';
import { mapValue } from '@/utilities';
import { ref } from 'vue';

export default class Interval {
   public progress = ref(0);
   public iteration: number = 0;
   public completed: boolean = false;

   public paused: boolean;
   public iterations: number | 'infinite';
   public time: number;
   public remainingTime: number;
   public onIteration?: (iteration: number) => number | void;
   public onCompleted?: () => number | void;

   private loopId: number;

   public constructor(options: IntervalOptions) {
      let { time, onIteration, onCompleted, iterations, paused } = options;

      this.time = time;

      this.paused = paused ? paused : false;
      this.iterations = iterations ? iterations : 1;
      this.onIteration = onIteration;
      this.onCompleted = onCompleted;

      this.remainingTime = this.time;

      const { add } = useLoop();

      this.loopId = add(dt => {
         if (!this.paused && !this.completed) {
            // not paused
            let step = this.remainingTime - dt * 1000;
            if (step > 0) {
               // time remaining
               this.remainingTime = step;
            } else {
               // time expired
               if (this.iterations > 0 || this.iterations === 'infinite') {
                  // iterations remaining
                  this.iteration++;
                  if (this.onIteration) {
                     let newTime = this.onIteration(this.iteration);
                     if (newTime) this.time = newTime;
                  }
                  this.remainingTime = time + step;
                  if (typeof this.iterations === 'number') this.iterations--;
               } else {
                  if (this.onCompleted) this.onCompleted();
                  this.completed = true;
               }
            }
            this.computeProgress();
         }
      });
   }

   public destroy() {
      const { remove } = useLoop();
      remove(this.loopId);
   }

   private computeProgress() {
      this.progress.value = mapValue([0, this.time], [0, 100], this.remainingTime);
   }

   public toggle() {
      this.paused = !this.paused;
   }
}
