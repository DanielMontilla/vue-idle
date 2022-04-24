import type { loopCallback } from '@/types';
import { recordLength } from '@/utilities';

/** Kinda like a gameloop :) */
abstract class Loop {
   private static callbacks: Record<number, loopCallback> = [];
   private static next: number = 0;
   private static previousTime: number;
   private static _raf?: number;
   private static _fps: number;

   public static begin = () => {
      Loop.previousTime = performance.now();
      Loop._raf = requestAnimationFrame(Loop.flush);
   };

   private static flush = (currentTime: number) => {
      let timeElapsed = currentTime - Loop.previousTime;
      Loop._fps = 1000 / timeElapsed;

      Loop.update((timeElapsed *= 0.001));

      Loop.previousTime = currentTime;
      Loop._raf = requestAnimationFrame(Loop.flush);
   };

   private static update(dt: number) {
      for (const i in Loop.callbacks) {
         Loop.callbacks[i](dt);
      }
   }

   public static add = (callback: loopCallback) => {
      if (!Loop._raf) Loop.begin();
      Loop.callbacks[Loop.next] = callback;
      Loop.next++;
      return Loop.next - 1;
   };

   public static remove = (id: number) => {
      delete Loop.callbacks[id];
      if (!recordLength(Loop.callbacks)) Loop.stop();
   };

   public static get fps() {
      return Loop._fps;
   }

   // TODO: error handeling
   public static stop() {
      if (Loop._raf) cancelAnimationFrame(Loop._raf);
      Loop._raf = undefined;
   }
}

const useLoop = () => ({
   begin: Loop.begin,
   add: Loop.add,
   remove: Loop.remove,
   stop: Loop.stop,
   // fps: Loop.fps
});

export default useLoop;
