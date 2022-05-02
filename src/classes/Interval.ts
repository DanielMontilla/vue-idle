import { emptyFunc } from '@/utilities';

export default class Interval {
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
