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

export const SlotTypeArr = [
   'none',
   'sell',
   'buy',
   'inventory',
   'training',
   'activity',
] as const;
export const ItemTypeArr = ['hero', /* 'weapon', 'armor', */ 'consumable'] as const;
export const HeroClassArr = [`knight`, `archer`, `mage`] as const;
export const HeroRaceArr = [`human`, `goblin`] as const;

export const StatArr = [
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

export const SkillArr = [
   'strength',
   'endurace',
   'magic',
   'intelligence',
   'luck',
   'agility',
   'perception',
   'charisma',
] as const;

export const ActivityArr = [
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

export const PLAYER = Symbol() as InjectionKey<PlayerRef>;
export const INVENTORY = Symbol() as InjectionKey<SlotRef[]>;
