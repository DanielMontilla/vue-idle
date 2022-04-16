import type { InjectionKey } from 'vue';
import type { HeroRace, ItemInfo, PlayerRef, SlotRef } from './types';

export const VIEWPORT_SIZE = { HEIGHT: 900, WIDTH: 1280 };

export const SlotTypeArr = ['none', 'sell', 'buy', 'inventory', 'training'] as const;
export const ItemTypeArr = ['hero', /* 'weapon', 'armor', */ 'consumable'] as const;
export const HeroClassArr = [`knight`, `archer`, `mage`] as const;
export const HeroRaceArr = [`human`, `goblin`] as const;
export const ConsumableArr = ['potion'] as const;

export const INVENTORY = Symbol() as InjectionKey<SlotRef[]>;
export const PLAYER = Symbol() as InjectionKey<PlayerRef>;
