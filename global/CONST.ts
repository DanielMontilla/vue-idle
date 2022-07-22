/* 🚧 sizes & unchanging values */
export const DEF_WINDOW_SIZE = { WIDTH: 1280, HEIGHT: 900 };

export const SOCKET_SIZE = 48;
export const BAR_HEIGHT = 38;
export const TAB_HEIGHT = 28;
export const INV_ROWS = 8;
export const INV_COLS = 13;

/* 🔢 enumarators */
export enum DURATION {
   '1s' = 1000,
   '5s' = DURATION['1s'] * 5,
   '10s' = DURATION['1s'] * 10,
   '15s' = DURATION['1s'] * 15,
   '30s' = DURATION['1s'] * 30,
   '60s' = DURATION['1s'] * 60,
   '1m' = DURATION['60s'],
   '5m' = DURATION['1m'] * 5,
   '60m' = DURATION['1m'] * 60,
   '1h' = DURATION['60m'],
   '5h' = DURATION['1h'] * 5,
   '24h' = DURATION['1h'] * 24,
   '1d' = DURATION['24h'],
   '2d' = DURATION['1d'] * 2,
}

/* 📃 lists */
export const SOCKET_TYPE_LIST = [
   'inventory',
   'display',
   'journey',
   'buy',
   'none',
] as const;

export const PAGE_LIST = ['shop', 'activity'] as const;

export const ZONE_LIST = [
   'gardens',
   'slime fi-elds',
   'caverns',
   'deep caverns',
   'spike hills',
] as const;

export const ITEM_TYPE_LIST = ['hero', 'consumable', 'weapon'] as const;
export const HERO_CLASS_LIST = [`knight`, `archer`, `mage`] as const;
export const HERO_RACE_LIST = [`human`, `goblin`] as const;

export const RESOURCE_LIST = ['health', 'stamina', 'mana'] as const;
export const CURRENCY_LIST = ['gold'] as const;

export const STAT_LIST = [
   'physical_damage',
   'magic_damage',
   'ranged_damage',
   'evasion',
   'accuracy',
   'resistance',
   'social',
   'speed',
] as const;

export const SKILL_LIST = [
   'strength',
   'endurance',
   'magic',
   'intelligence',
   'luck',
   'agility',
   'perception',
   'charisma',
] as const;

export const ACTIVITY_LIST = [
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
