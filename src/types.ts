import type { Ref } from 'vue';
import type {
   ACTIVITY_ARR,
   ConsumableArr,
   HERO_CLASS_ARR,
   HERO_RACE_ARR,
   ITEM_TYPE_ARR,
   RESOURCE_ARR,
   SKILL_ARR,
   SLOT_TYPE_ARR,
   STAT_ARR,
   ZONE_ARR,
} from '@/CONST';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type RecKey = string | number | symbol;

export interface LabelConfig {
   name: string;
   icon: string;
   color: string;
   price?: number;
   unlocked?: boolean;
   puchesable?: boolean;
}

export type ItemType = typeof ITEM_TYPE_ARR[number];
export type ItemStackLimit = 1 | 16 | 32 | 64;
export interface ItemInfo {
   stackLimit: ItemStackLimit;
   src: string;
}

export type SlotType = typeof SLOT_TYPE_ARR[number];

export type PlayerRef = Ref<PlayerData>;
export type Currency = 'gold' | 'diamond';
export type Wallet = Record<Currency, number>;
export interface PlayerData {
   wallet: Wallet;
}

export type HeroClass = typeof HERO_CLASS_ARR[number];
export type HeroRace = typeof HERO_RACE_ARR[number];
export type SkillsData = Record<Skill, SkillData>;
export type ActivitiesData = Record<Activity, ActivityData>;
export interface HeroData {
   id: number;
   name: string;
   race: HeroRace;
   class: HeroClass;
   skills: SkillsData;
   activities: ActivitiesData;
}

export interface SkillData {
   level: number;
   xp: number;
}

export interface ActivityData extends SkillData {}

export type loopCallback = (dt: number) => any;

export type Consumables = typeof ConsumableArr[number];

export type Resource = typeof RESOURCE_ARR[number];
export type Stat = typeof STAT_ARR[number];
export type Skill = typeof SKILL_ARR[number];
export type Activity = typeof ACTIVITY_ARR[number];
export type Zone = typeof ZONE_ARR[number];

export interface IntervalConfig {
   time: number;
   callback: Function;
   onComplete: Function;
   /**
    * number > 1 = limited
    * number <= 0 = unlimited
    * undifined = 1
    */
   iterations?: number;
   paused?: boolean;
}

export interface QuestConfig {
   zone: Zone;
   distance: number;
   time: number;
}
