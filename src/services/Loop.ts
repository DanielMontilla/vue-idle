import type { LoopCallback } from '@/types';
import { recordLength } from '@/utilities';

let next: number = 0;
let previousTime: number;
let raf: number | undefined = undefined;
let fps: number;

const callbacks: Record<number, LoopCallback> = {};

const begin = () => {
   previousTime = performance.now();
   raf = requestAnimationFrame(flush);
};

const flush = (currentTime: number) => {
   let timeElapsed = currentTime - previousTime;
   fps = 1000 / timeElapsed;

   update((timeElapsed *= 0.001));

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

const useLoop = () => ({
   add: add,
   remove: remove,
});

export default useLoop;
