import { recordLength } from '#/utilities';
import type { LoopCallback } from '@/types';

let next: number = 0;
let previousTime: number;
let raf: number | undefined = undefined;

const callbacks: Record<number, LoopCallback> = {};

const begin = () => {
   previousTime = performance.now();
   raf = requestAnimationFrame(flush);
};

const flush = (currentTime: number) => {
   let timeElapsed = currentTime - previousTime;

   update(timeElapsed);

   previousTime = currentTime;
   raf = requestAnimationFrame(flush);
};

const update = (dt: number) => {
   for (const i in callbacks) callbacks[i](dt);
};

// TODO: error handeling
const stop = () => {
   if (raf) cancelAnimationFrame(raf);
   raf = undefined;
};

const add = (callback: LoopCallback) => {
   if (!raf) begin();
   callbacks[next] = callback;
   return next++;
};

const remove = (id: number) => {
   delete callbacks[id];
   if (!recordLength(callbacks)) stop();
};

const useLoop = () => ({ add, remove });

export default useLoop;
