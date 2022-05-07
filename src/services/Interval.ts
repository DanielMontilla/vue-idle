import { useLoop } from '@/services/_index';
import type { IntervalConfig } from '@/types';
import { emptyFunc } from '@/utilities';
import { ref, type Ref } from 'vue';

class Interval {
   public timeRemaining: number;
   public iterationsRemaining: number;
   public completed: boolean = false;
   public loopId!: number;

   constructor(
      public id: number,
      public time: number,
      public iterationCallback: Function = emptyFunc,
      public iterations: number = 1,
      public onCompleteCallback: Function = emptyFunc,
      public paused: boolean = false
   ) {
      this.timeRemaining = time;
      this.iterationsRemaining = iterations;
   }

   seconds(decimals?: number) {
      decimals = decimals ? decimals : 20;
      return this.timeRemaining.toFixed(decimals);
   }

   miliseconds(decimals?: number) {
      decimals = decimals ? decimals : 20;
   }

   pause() {
      this.paused = true;
   }

   unpause() {
      this.paused = false;
   }

   toggle() {
      this.paused = !this.paused;
   }
}

const loop = useLoop();
const intervals = new Map<number, Ref<Interval>>();
let next = 0;
const add = ({ time, callback, iterations, onComplete, paused }: IntervalConfig) => {
   let i = ref(new Interval(next++, time, callback, iterations, onComplete, paused));

   i.value.loopId = loop.add(dt => {
      if (i.value.paused) return;
      let step = i.value.timeRemaining - dt;
      if (step > 0) {
         i.value.timeRemaining = step;
         return;
      }
      if (i.value.iterationsRemaining > 0) {
         i.value.iterationsRemaining--;
         i.value.timeRemaining = i.value.time;
         i.value.iterationCallback();
      } else {
         i.value.onCompleteCallback();
         i.value.completed = true;
         i.value.timeRemaining = 0;
         loop.remove(i.value.loopId);
      }
   });

   intervals.set(next - 1, i);
   return i;
};

// TODO: maybe clean up. a bit of repetition

const pause = (interval: number | Ref<Interval>) => {
   if (interval instanceof Interval) {
      let tempInt = intervals.get(interval.id);
      if (!tempInt) {
         console.error(`wtf interval not registered`);
         return;
      }
      interval = tempInt;
   }
   if (typeof interval === 'number') {
      let tempInt = intervals.get(interval);
      if (!tempInt) {
         console.error(`wtf interval is not registered`);
         return;
      }
      interval = tempInt;
   }

   interval.value.pause();
};
const unpause = (interval: number | Ref<Interval>) => {
   if (interval instanceof Interval) {
      let tempInt = intervals.get(interval.id);
      if (!tempInt) {
         console.error(`wtf interval not registered`);
         return;
      }
      interval = tempInt;
   }
   if (typeof interval === 'number') {
      let tempInt = intervals.get(interval);
      if (!tempInt) {
         console.error(`wtf interval is not registered`);
         return;
      }
      interval = tempInt;
   }

   interval.value.unpause();
};

const toggle = (interval: number | Ref<Interval> | Interval) => {
   if (interval instanceof Interval) {
      let tempInt = intervals.get(interval.id);
      if (!tempInt) {
         console.error(`wtf interval not registered`);
         return;
      }
      interval = tempInt;
   }
   if (typeof interval === 'number') {
      let tempInt = intervals.get(interval);
      if (!tempInt) {
         console.error(`wtf interval is not registered`);
         return;
      }
      interval = tempInt;
   }

   interval.value.toggle();
};

const useInterval = () => {
   return {
      add: add,
      pause: pause,
      unpuase: unpause,
      toggle: toggle,
   };
};

export default useInterval;
