import { Interval } from '@/classes/_index';
import { useLoop } from '@/services/_index';
import type { IntervalConfig } from '@/types';
import { emptyFunc } from '@/utilities';
import { ref, type Ref } from 'vue';

const intervals = new Map<number, Ref<Interval>>();
let next = 0;
const add = ({ time, callback, iterations, onComplete, paused }: IntervalConfig) => {
   const loop = useLoop();
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
