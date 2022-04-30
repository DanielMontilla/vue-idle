import type {
   Activity,
   Consumables,
   HeroRace,
   ItemInfo,
   ItemType,
   LabelConfig,
   PartialRecord,
   Resource,
   Skill,
   Stat,
} from '@/types';
import { ACTIVITY_ARR, RESOURCE_ARR, SKILL_ARR, STAT_ARR } from '@/CONST';
import { constructRelationRec } from '@/utilities';

export const STARTING_LABELS: LabelConfig[] = [
   {
      name: 'shop',
      color: 'hsla(210, 55%, 20%, 1)',
      icon: `icons/shop`,
   },
   {
      name: 'activities',
      color: 'hsla(133, 55%, 20%, 1)',
      icon: '',
   },
   {
      name: 'adventure',
      color: 'hsla(316, 55%, 20%, 1)',
      icon: '',
   },
   // {
   //    name: 'training',
   //    icon: `icons/weight`,
   // },
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
          /*  phy    mag    ran    eva    acc    res    soc    */
   /* str */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* end */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* mag */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* int */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* lck */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* agi */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* per */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
   /* chr */ [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
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
