import type { Ref } from 'vue';
import type { Hero, Consumable, Item, Slot, Label } from '@/classes/_index';
import type {
   ACTIVITY_ARR,
   ConsumableArr,
   HERO_CLASS_ARR,
   HERO_RACE_ARR,
   ITEM_TYPE_ARR,
   SKILL_ARR,
   SLOT_TYPE_ARR,
   STAT_ARR,
} from '@/CONST';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

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

export type ItemRef = Ref<Item>;
export interface ItemInfo {
   stackLimit: ItemStackLimit;
   src: string;
}

export type SlotRef = Ref<Slot>;
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

export type uCallback = (dt: number) => any;

export type Consumables = typeof ConsumableArr[number];

export type Stat = typeof STAT_ARR[number];
export type Skill = typeof SKILL_ARR[number];
export type Activity = typeof ACTIVITY_ARR[number];

export type ItemClass = Consumable | Hero;
