import type { HeroRace, ItemInfo, ItemType } from '@/types';

export const items: Record<ItemType, Record<number, ItemInfo>> = {
   hero: {
      1: {
         stackLimit: 1,
         src: `heros/human`
      },
      2: {
         stackLimit: 1,
         src: `heros/goblin`
      }
   },
   armor: {},
   consumable: {
      1: {
         stackLimit: 16,
         src: `consumables/potion`
      }
   },
   weapon: {}
} as const;

export const heroInfoMap: Record<HeroRace, number> = {
   human: 1,
   goblin: 2
};
