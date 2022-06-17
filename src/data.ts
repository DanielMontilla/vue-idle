import type { HeroRace, ItemInfo, ItemType, Page, Resource } from '@/types';
import { ACTIVITY_ARR, RESOURCE_ARR, SKILL_ARR, STAT_ARR } from '@/CONST';
import { constructRelationRec } from '@/utilities';

/* 🎨 Styling  */
export const resource_color: Record<Resource, string> = {
   health: 'rgb(161, 50, 50)',
   stamina: 'rgb(50, 161, 74)',
   mana: 'rgb(50, 85, 161)',
};

export const tabs: Record<Page, string> = {
   store: 'hsla(210, 55%, 20%, 1)',
   activities: 'hsla(133, 55%, 20%, 1)',
   adventures: 'hsla(316, 55%, 20%, 1)',
};

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

export const BASE_RESOURCES: Record<Resource, number> = {
   health: 100,
   mana: 50,
   stamina: 100,
};

/* prettier-ignore */
export const SKILL_RESOURCE_MAT = [
          /*  hp     sta    man
   /* str */ [0.500, 0.000, 0.000],
   /* end */ [0.500, 0.750, 0.000],
   /* mag */ [0.000, 0.000, 1.000],
   /* int */ [0.000, 0.000, 0.500],
   /* lck */ [0.000, 0.000, 0.000],
   /* agi */ [0.025, 0.500, 0.000],
   /* per */ [0.000, 0.025, 0.000],
   /* chr */ [0.000, 0.000, 0.300],
];
/* prettier-ignore */
export const SKILL_STAT_MAT = [
          /*  phy    mag    ran    eva    acc    res    soc    spe    */
   /* str */ [1.000, 0.000, 0.500, 0.000, 0.000, 0.500, 0.000, 0.250],
   /* end */ [0.150, 0.000, 0.025, 0.000, 0.000, 1.500, 0.000, 0.000],
   /* mag */ [0.000, 1.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000],
   /* int */ [0.030, 0.800, 0.050, 0.333, 0.500, 0.000, 0.650, 0.000],
   /* lck */ [0.000, 0.005, 0.090, 0.001, 1.000, 0.000, 0.050, 0.000],
   /* agi */ [0.100, 0.010, 1.000, 0.750, 0.050, 0.000, 0.000, 1.000],
   /* per */ [0.000, 0.025, 0.050, 0.050, 0.800, 0.000, 0.010, 0.250],
   /* chr */ [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 1.500, 1.000],
];
/* prettier-ignore */
export const SKILL_ACTIVITY_MAT = [
          /*  fis    min    wod    res    arc    gam    spe    hun    coo    */
   /* str */ [0.000, 1.000, 1.500, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000],
   /* end */ [0.000, 0.500, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000],
   /* mag */ [0.000, 0.000, 0.000, 0.750, 0.000, 0.000, 0.000, 0.000, 0.000],
   /* int */ [0.000, 0.000, 0.000, 1.000, 0.030, 0.025, 0.000, 0.010, 0.000],
   /* lck */ [0.025, 0.025, 0.000, 0.000, 0.000, 0.300, 0.025, 0.000, 0.000],
   /* agi */ [0.000, 0.000, 0.000, 0.000, 0.350, 0.100, 0.000, 0.200, 0.000],
   /* per */ [0.300, 0.000, 0.050, 0.000, 0.150, 0.000, 0.250, 0.025, 0.000],
   /* chr */ [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.050],
];

/* 🤖 COMPUTED DATA */
export const SKILL_TO_ACTIVITY = constructRelationRec(
   SKILL_ACTIVITY_MAT,
   SKILL_ARR,
   ACTIVITY_ARR,
   false
);

export const ACTIVITY_TO_SKILL = constructRelationRec(
   SKILL_ACTIVITY_MAT,
   ACTIVITY_ARR,
   SKILL_ARR,
   true
);

export const SKILL_TO_STAT = constructRelationRec(
   SKILL_STAT_MAT,
   SKILL_ARR,
   STAT_ARR,
   false
);

export const STAT_TO_SKILL = constructRelationRec(
   SKILL_STAT_MAT,
   STAT_ARR,
   SKILL_ARR,
   true
);

export const SKILL_TO_RESOURCE = constructRelationRec(
   SKILL_RESOURCE_MAT,
   SKILL_ARR,
   RESOURCE_ARR,
   false
);

export const RESOURCE_TO_SKILL = constructRelationRec(
   SKILL_RESOURCE_MAT,
   RESOURCE_ARR,
   SKILL_ARR,
   true
);

/* 🎨 Preload assets */
export const SOUNDS: string[] = [`paperflip`];
