/* 🚧 sizes & unchanging values */
export const SOCKET_SIZE = 48;
export const BAR_HEIGHT = 32;
export const TAB_HEIGHT = 28;

export const INV_ROWS = 8;
export const INV_COLS = 13;

/* lists 📃 */
export const SOCKET_TYPE_LIST = ['inventory', 'display', 'journey', 'none'] as const;

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
export const CURRENCY_LIST = ['gold', 'diamond'] as const;

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
