import { useLoop } from '@/services/_index';
import { IntervalData, StateClass } from '@/types';
import { mapValue } from '#/utilities';
import { ref, Ref, watch, WatchStopHandle } from 'vue';
import { DURATION } from '#/CONST';

export default class Interval implements StateClass<IntervalData> {
   /** @description number ∈ (0, 1) indicating percentage of current interation progress */
   public progress: Ref<number>;
   /** @description number of interations completed so far */
   public iteration: Ref<number>;
   /** @description indicates whether interval stop condition has been met */
   public completed: Ref<boolean>;
   /** @description indicates the amount of remining iterations or if its infinite */
   public iterations: Ref<number | 'infinite'>;
   /** @description total time in miliseconds for current iteration */
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
   private loop: number;
   private unwatch: WatchStopHandle;

   public constructor(options: IntervalData) {
      let { time, onTick, onIteration, onCompleted, iterations, paused, remaining } =
         options;

      this.progress = ref(0);
      this.iteration = ref(0);
      this.completed = ref(false);

      this.time = typeof time === 'string' ? ref(DURATION[time]) : ref(time);

      this.isPaused = paused ? ref(paused) : ref(false);
      this.iterations = iterations ? ref(iterations) : ref('infinite');
      this.onTick = onTick;
      this.onIteration = onIteration;
      this.onCompleted = onCompleted;

      this.remaining = remaining ? ref(remaining) : ref(this.time.value);

      const { add } = useLoop();

      this.loop = add(dt => {
         if (!this.isPaused.value && !this.completed.value) {
            // if not paused and not completed
            if (this.onTick) this.onTick(dt);
            let step = this.remaining.value - dt;
            if (step > 0) {
               // if time remaining
               this.remaining.value = step;
            } else {
               // if time expired
               if (this.iterations.value > 0 || this.iterations.value === 'infinite') {
                  // iterations remaining
                  this.iteration.value++;
                  if (this.onIteration) {
                     let newTime = this.onIteration(this.iteration.value);
                     if (newTime) this.time.value = newTime;
                  }
                  this.remaining.value = this.time.value + step;
                  if (typeof this.iterations.value === 'number') this.iterations.value--;
               } else {
                  if (this.onCompleted) this.onCompleted();
                  this.completed.value = true;
               }
            }
         }
      });

      this.unwatch = watch([this.time, this.remaining], ([newTime, newRemining]) => {
         this.progress.value = mapValue(
            newRemining,
            { min: 0, max: newTime },
            { min: 1, max: 0 }
         );
      });
   }

   public getData(): IntervalData {
      return {
         time: this.time.value,
         iterations: this.iterations.value,
         paused: this.isPaused.value,
         remaining: this.remaining.value,
      };
   }

   public destroy() {
      const { remove } = useLoop();
      remove(this.loop);
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
