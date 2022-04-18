import type {
   Activity,
   Consumables,
   HeroRace,
   ItemInfo,
   ItemType,
   LabelConfig,
   PartialRecord,
   Skill,
   Stat,
} from '@/types';

export const STARTING_LABELS: LabelConfig[] = [
   {
      name: 'shop',
      icon: `icons/shop`,
      color: `#797A7E`,
   },
   {
      name: 'activities',
      icon: '',
      color: '#797A7E',
   },
   {
      name: 'training',
      icon: `icons/weight`,
      color: `#797A7E`,
   },
];

export const ITEMS: Record<ItemType, Record<number, ItemInfo>> = {
   hero: {
      1: {
         stackLimit: 1,
         src: `heros/human`,
      },
      2: {
         stackLimit: 1,
         src: `heros/goblin`,
      },
   },
   // armor: {},
   consumable: {
      1: {
         stackLimit: 16,
         src: `consumables/potion`,
      },
   },
   // weapon: {}
} as const;

export const HERO_ID_MAP: Record<HeroRace, number> = {
   human: 1,
   goblin: 2,
} as const;

export const CONSUMABLE_ID_MAP: Record<Consumables, number> = {
   potion: 1,
} as const;

// STAT => { SKILL #1, ... , SKILL #N }
export const RAW_STAT_GAINS: Record<Stat, PartialRecord<Skill, number>> = {
   health: {
      strength: 1,
      endurace: 1,
   },
   physical_damage: {
      strength: 1,
   },
   magic_damage: {
      magic: 1,
      intelligence: 1,
   },
   ranged_damage: {
      strength: 1,
      agility: 1,
      perception: 1,
   },
   stamina: {
      endurace: 1,
   },
   evasion: {
      luck: 1,
      agility: 1,
      perception: 1,
   },
   accuracy: {
      luck: 1,
      agility: 1,
      perception: 1,
   },
   resistance: {
      endurace: 1,
   },
   social: {
      intelligence: 1,
      charisma: 1,
   },
};

// SKILL => { STAT #1, ... , STAT #N }
export const RAW_SKILL_GAINS: Record<Skill, PartialRecord<Stat, number>> = {
   strength: {
      health: 1,
      physical_damage: 1,
      ranged_damage: 1,
   },
   endurace: {
      health: 1,
      stamina: 1,
      resistance: 1,
   },
   magic: {
      magic_damage: 1,
   },
   intelligence: {
      magic_damage: 1,
      social: 1,
   },
   luck: {
      accuracy: 1,
      evasion: 1,
   },
   agility: {
      ranged_damage: 1,
      accuracy: 1,
   },
   perception: {
      ranged_damage: 1,
      accuracy: 1,
      evasion: 1,
   },
   charisma: {
      social: 1,
   },
};

// For every 1 activty finish, a corresponding skill will gain x amount
// ACTIVITY => { SKILL #1, ... , SKILL #N }
export const RAW_ACTIVITY_GAINS: Record<Activity, PartialRecord<Skill, number>> = {
   fishing: {
      luck: 0.025,
      perception: 0.3,
   },
   mining: {
      strength: 1,
      endurace: 0.5,
   },
   woodcutting: {
      strength: 1.5,
   },
   research: {
      magic: 0.9,
      intelligence: 1,
   },
   archery: {
      intelligence: 0.03,
      agility: 0.35,
      perception: 0.15,
   },
   gambling: {
      intelligence: 0.025,
      luck: 0.1,
      charisma: 0.1,
   },
   spelunking: {
      perception: 0.25,
      luck: 0.025,
   },
   hunting: {
      intelligence: 0.01,
      agility: 0.2,
      perception: 0.025,
   },
   cooking: {
      charisma: 0.05,
   },
} as const;
