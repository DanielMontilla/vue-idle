import type { Ref } from 'vue';
import type {
   ACTIVITY_ARR,
   HERO_CLASS_ARR,
   HERO_RACE_ARR,
   ITEM_TYPE_ARR,
   PAGES,
   RESOURCE_ARR,
   SKILL_ARR,
   SOCKET_TYPE_ARR,
   STAT_ARR,
   ZONE_ARR,
} from '@/CONST';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type RecKey = string | number | symbol;

export type Page = typeof PAGES[number];
export type ItemType = typeof ITEM_TYPE_ARR[number];
export type ItemStackLimit = 1 | 16 | 32 | 64;
export interface ItemInfo {
   stackLimit: ItemStackLimit;
   src: string;
}

export type SocketType = typeof SOCKET_TYPE_ARR[number];

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

export type LoopCallback = (dt: number) => any;

export type Resource = typeof RESOURCE_ARR[number];
export type Stat = typeof STAT_ARR[number];
export type Skill = typeof SKILL_ARR[number];
export type Activity = typeof ACTIVITY_ARR[number];
export type Zone = typeof ZONE_ARR[number];

export interface IntervalOptions {
   time: number;
   onIteration?: (iteration: number) => number | void;
   onCompleted?: () => number | void;
   iterations?: number;
   paused?: boolean;
}

export interface QuestConfig {
   zone: Zone;
   distance: number;
   time: number;
}
