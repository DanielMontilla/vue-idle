import type { ItemData, PlayerData } from '@/types';

/**
 * @description object that holds entire game state
 * @list
 *    • Timers, Intervals & Timeouts
 *    • Socket contents
 *    • Player resources
 */
export default class Save {
   constructor(
      public player: PlayerData,
      public inventory: Array<ItemData | undefined>
   ) {}
}
