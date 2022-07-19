import { useLoop } from '@/services/_index';
import { IntervalOptions } from '@/types';
import { mapValue } from '#/utilities';
import { ref, Ref, watch, WatchStopHandle } from 'vue';

export default class Interval {
   /** @description number ∈ (0, 1) indicating percentage of current interation progress */
   public progress: Ref<number>;
   /** @description number of interations completed so far */
   public iteration: Ref<number>;
   /** @description indicates whether interval stop condition has been met */
   public completed: Ref<boolean>;
   /** @description indicates the amount of remining iterations or if its infinite */
   public iterations: Ref<number | 'infinite'>;
   /** @description total time for current iteration */
   public time: Ref<number>;
   /** @description remining time in current iteration */
   public remaining: Ref<number>;
   /** @description indicates if its paused */
   public isPaused: Ref<boolean>;
   /** @description function called each animation tick */
   public onTick?: (dt: number) => void;
   /**
    * @description funciton called each iteration
    * @param iteration indicating current iteration
    * @returns 'number' indicating next iteration time
    * @returns 'void' indicating next iteration time will remain unchanged
    */
   public onIteration?: (iteration: number) => number | void;
   /** @description function called when stop condition is reached */
   public onCompleted?: () => void;

   /** keeps track of loop id for lifecycle operations */
   private loopId: number;
   private unwatch: WatchStopHandle;

   public constructor(options: IntervalOptions) {
      let { time, onTick, onIteration, onCompleted, iterations, paused } = options;

      this.progress = ref(0);
      this.iteration = ref(0);
      this.completed = ref(false);

      this.time = ref(time);

      this.isPaused = paused ? ref(paused) : ref(false);
      this.iterations = iterations ? ref(iterations) : ref(1);
      this.onTick = onTick;
      this.onIteration = onIteration;
      this.onCompleted = onCompleted;

      this.remaining = ref(this.time);

      const { add } = useLoop();

      this.loopId = add(dt => {
         let {
            time,
            isPaused,
            completed,
            remaining,
            iterations,
            iteration,
            onIteration,
            onCompleted,
         } = this;

         if (!isPaused.value && !completed.value) {
            // if not paused and not completed
            if (this.onTick) this.onTick(dt);
            let step = remaining.value - dt;
            if (step > 0) {
               // if time remaining
               remaining.value = step;
            } else {
               // if time expired
               if (iterations.value > 0 || iterations.value === 'infinite') {
                  // iterations remaining
                  iteration.value++;
                  if (onIteration) {
                     let newTime = onIteration(iteration.value);
                     if (newTime) time.value = newTime;
                  }
                  remaining.value = time.value + step;
                  if (typeof iterations.value === 'number') iterations.value--;
               } else {
                  if (onCompleted) onCompleted();
                  completed.value = true;
               }
            }
         }
      });

      this.unwatch = watch([this.time, this.remaining], ([newTime], [newRemining]) => {
         this.progress.value = mapValue(
            newRemining,
            { min: 0, max: newTime },
            { min: 0, max: 1 }
         );
      });
   }

   public destroy() {
      const { remove } = useLoop();
      remove(this.loopId);
      this.unwatch();
   }

   public toggle() {
      this.isPaused.value = !this.isPaused.value;
   }

   public pause() {
      this.isPaused.value = true;
   }

   public unpause() {
      this.isPaused.value = false;
   }
}
