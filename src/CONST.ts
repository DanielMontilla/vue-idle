import type { StyleValue } from 'vue';

// TODO: move to global settings file
export const CONTENT_SIZE = { WIDTH: 1280, HEIGHT: 900 };
export const APP_PADDING = 4;
export const BAR_HEIGHT = 32;
export const APP_SIZE = {
   WIDTH: CONTENT_SIZE.WIDTH + APP_PADDING * 2,
   HEIGHT: CONTENT_SIZE.HEIGHT + BAR_HEIGHT + APP_PADDING * 2,
};

export const appStyle: StyleValue = {
   height: `${APP_SIZE.HEIGHT}px`,
   width: `${APP_SIZE.WIDTH}px`,
   maxHeight: `${APP_SIZE.HEIGHT}px`,
   maxWidth: `${APP_SIZE.WIDTH}px`,
   padding: `${APP_PADDING}px`,
};

export const contentStyle: StyleValue = {
   height: `${CONTENT_SIZE.HEIGHT}px`,
   width: `${CONTENT_SIZE.WIDTH}px`,
   maxHeight: `${CONTENT_SIZE.HEIGHT}px`,
   maxWidth: `${CONTENT_SIZE.WIDTH}px`,
};

export const ZONE_ARR = [
   'gardens',
   'slime fields',
   'caverns',
   'deep caverns',
   'spike hills',
] as const;

export const SOCKET_TYPE_ARR = [
   'none',
   'sell',
   'buy',
   'inventory',
   'activity',
   'journey',
   'display',
] as const;

export const PAGES = ['store', 'activities', 'adventures'] as const;

export const ITEM_TYPE_ARR = ['hero', /* 'weapon', 'armor', */ 'consumable'] as const;
export const HERO_CLASS_ARR = [`knight`, `archer`, `mage`] as const;
export const HERO_RACE_ARR = [`human`, `goblin`] as const;

export const RESOURCE_ARR = ['health', 'stamina', 'mana'] as const;
export const CURRENCY_ARR = ['gold', 'diamond'] as const;

export const STAT_ARR = [
   'physical_damage',
   'magic_damage',
   'ranged_damage',
   'evasion',
   'accuracy',
   'resistance',
   'social',
   'speed',
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
