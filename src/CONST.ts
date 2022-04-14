import type { InjectionKey } from 'vue';
import type { ItemInfo, PlayerRef, SlotRef } from './types';

export const WINDOW_SIZE = { HEIGHT: 900, WIDTH: 1280 };

// TODO: fetch from json
export const items: Record<number, ItemInfo> = {
   1: {
      stackLimit: 1,
      type: 'hero',
      imgSrc: `icons/knight`
   },
   2: {
      stackLimit: 1,
      type: 'hero',
      imgSrc: `icons/goblin`
   }
};
export const SlotTypeArr = ['none', 'sell', 'buy', 'inventory', 'training'] as const;
export const INVENTORY = Symbol() as InjectionKey<SlotRef[]>;
export const PLAYER = Symbol() as InjectionKey<PlayerRef>;
