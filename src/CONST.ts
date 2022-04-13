import type { InjectionKey } from 'vue';
import type { ItemInfo, SlotRef } from './types';

export const WINDOW_SIZE = { HEIGHT: 900, WIDTH: 1200 };

export const items: Record<number, ItemInfo> = {
   1: {
      stackLimit: 16,
      type: 'hero',
      imgSrc: `icons/knight`
   },
   2: {
      stackLimit: 16,
      type: 'hero',
      imgSrc: `icons/goblin`
   }
};

export const INVENTORY = Symbol() as InjectionKey<SlotRef[]>;
