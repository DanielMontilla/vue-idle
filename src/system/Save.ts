import type { InventoryData, ItemData, PlayerData, SocketData } from '@/types';

/**
 * @description object that holds entire game state
 * @list
 *    • Timers, Intervals & Timeouts
 *    • Socket contents
 *    • Player resources
 */
export default class Save {
   constructor(public player: PlayerData, public inventory: InventoryData) {}
}
