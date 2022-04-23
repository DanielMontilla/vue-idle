import type { InjectionKey } from 'vue';
import type {
   Activity,
   HeroRace,
   ItemInfo,
   PartialRecord,
   PlayerRef,
   Skill,
   SlotRef,
   Stat,
} from '@/types';

export const VIEWPORT_SIZE = { HEIGHT: 900, WIDTH: 1280 };

export const SLOT_TYPE_ARR = [
   'none',
   'sell',
   'buy',
   'inventory',
   'training',
   'activity',
] as const;

export const ITEM_TYPE_ARR = ['hero', /* 'weapon', 'armor', */ 'consumable'] as const;
export const HERO_CLASS_ARR = [`knight`, `archer`, `mage`] as const;
export const HERO_RACE_ARR = [`human`, `goblin`] as const;

export const RESOURCE_ARR = ['health', 'stamina', 'mana'];

export const STAT_ARR = [
   'health',
   'physical_damage',
   'magic_damage',
   'ranged_damage',
   'stamina',
   'evasion',
   'accuracy',
   'resistance',
   'social',
] as const;

export const SKILL_ARR = [
   'strength',
   'endurance',
   'magic',
   'intelligence',
   'luck',
   'agility',
   'perception',
   'charisma',
] as const;

export const ACTIVITY_ARR = [
   'fishing',
   'mining',
   'woodcutting',
   'research',
   'archery',
   'gambling',
   'spelunking',
   'hunting',
   'cooking',
] as const;

export const ConsumableArr = ['potion'] as const;
