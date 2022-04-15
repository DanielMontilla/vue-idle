import type { InjectionKey } from 'vue';
import type { HeroRace, ItemInfo, PlayerRef, SlotRef } from './types';

export const WINDOW_SIZE = { HEIGHT: 900, WIDTH: 1280 };

// TODO: fetch from json
export const items: Record<number, ItemInfo> = {
   1: {
      stackLimit: 1,
      type: 'hero',
      imgSrc: `heros/human`
   },
   2: {
      stackLimit: 1,
      type: 'hero',
      imgSrc: `heros/goblin`
   }
};

export const heros: Record<HeroRace, number> = {
   human: 1,
   goblin: 2
};

export const SlotTypeArr = ['none', 'sell', 'buy', 'inventory', 'training'] as const;
export const ItemTypeArr = ['hero', 'weapon', 'armor', 'consumable'] as const;
export const HeroClassArr = [`knight`, `archer`, `mage`] as const;
export const HeroRaceArr = [`human`, `goblin`] as const;
// export const Skills = [`human`, `goblin`] as const;
export const INVENTORY = Symbol() as InjectionKey<SlotRef[]>;
export const PLAYER = Symbol() as InjectionKey<PlayerRef>;
