import type { Player, Item } from '@/classes/_index';

/**
 * @description object that holds entire game state
 * @list
 *    • Timers, Intervals & Timeouts
 *    • Socket contents
 *    • Player resources
 */
export default class Save {
   constructor(public player: Player, public inventory: Array<Item | undefined>) {}
}
