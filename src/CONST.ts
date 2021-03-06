import type { Resource, Stat, Skill, Activity } from './types';

// TODO: move to global settings file
export const CONTENT_SIZE = { WIDTH: 1280, HEIGHT: 900 };
export const APP_PADDING = 4;
export const BAR_HEIGHT = 32;
export const APP_SIZE = {
   WIDTH: CONTENT_SIZE.WIDTH + APP_PADDING * 2,
   HEIGHT: CONTENT_SIZE.HEIGHT + BAR_HEIGHT + APP_PADDING * 2,
};

export const ZONE_ARR = ['gardens', 'slime fields'] as const;

export const SLOT_TYPE_ARR = [
   'none',
   'sell',
   'buy',
   'inventory',
   'activity',
   'quest',
   'disabled',
] as const;

export const ITEM_TYPE_ARR = ['hero', /* 'weapon', 'armor', */ 'consumable'] as const;
export const HERO_CLASS_ARR = [`knight`, `archer`, `mage`] as const;
export const HERO_RACE_ARR = [`human`, `goblin`] as const;

export const RESOURCE_ARR = ['health', 'stamina', 'mana'] as const;

export const STAT_ARR = [
   'physical_damage',
   'magic_damage',
   'ranged_damage',
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
