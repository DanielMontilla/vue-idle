import type { Ref } from 'vue';
import type {
   ACTIVITY_ARR,
   CURRENCY_ARR,
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
import type { Item } from './classes/_index';

/* 🔧  Utility */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type RecKey = string | number | symbol;

/* 🧬 Constant Literals */
export type Page = typeof PAGES[number];
export type ItemType = typeof ITEM_TYPE_ARR[number];
export type SocketType = typeof SOCKET_TYPE_ARR[number];
export type HeroClass = typeof HERO_CLASS_ARR[number];
export type HeroRace = typeof HERO_RACE_ARR[number];
export type Resource = typeof RESOURCE_ARR[number];
export type Stat = typeof STAT_ARR[number];
export type Skill = typeof SKILL_ARR[number];
export type Activity = typeof ACTIVITY_ARR[number];
export type Zone = typeof ZONE_ARR[number];
export type Currency = typeof CURRENCY_ARR[number];

/* 🆘 Helpers */
export type PlayerRef = Ref<PlayerData>;
export type Wallet = Record<Currency, number>;

export type SkillsData = Record<Skill, SkillData>;
export type ActivitiesData = Record<Activity, ActivityData>;
export type ItemStackLimit = 1 | 16 | 32 | 64;
export interface ItemInfo {
   stackLimit: ItemStackLimit;
   src: string;
}

export type LoopCallback = (dt: number) => any;

/* 🧰 Constructors • required data for object construction only */
export interface ItemData {
   type: ItemType;
   id: number;
   quantity: number;
}

export interface HeroData extends ItemData {
   type: 'hero';
   id: number;
   quantity: 1;

   name: string;
   race: HeroRace;
   class: HeroClass;
   skills: SkillsData;
   activities: ActivitiesData;
}

export interface ConsumableData extends ItemData {
   type: 'consumable';
   id: number;
   quantity: number;
}

export interface PlayerData {
   wallet: Wallet;
}

export interface SkillData {
   level: number;
   xp: number;
}

export interface ActivityData extends SkillData {}

export interface IntervalOptions {
   time: number;
   onTick?: (dt: number) => void;
   onIteration?: (iteration: number) => number | void;
   onCompleted?: () => number | void;
   iterations?: number | 'infinite';
   paused?: boolean;
}

export interface QuestConfig {
   zone: Zone | undefined;
   distance: number;
   time: number;
}

export interface SocketData {
   type?: SocketType;
   item?: ItemData;
}

export type InventoryData = SocketData[];

export interface ActivityCardData {
   activity: Activity;
   heroSocket: SocketData;
   inventory: SocketData[];
   progress: number;
}
