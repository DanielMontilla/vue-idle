import type { Ref } from 'vue';
import type { Hero, Consumable, Item, Slot, Label } from '@/classes/_index';
import type {
   ActivityArr,
   ConsumableArr,
   HeroClassArr,
   HeroRaceArr,
   ItemTypeArr,
   SkillArr,
   SlotTypeArr,
   StatArr,
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

export type ItemType = typeof ItemTypeArr[number];
export type ItemStackLimit = 1 | 16 | 32 | 64;

export type ItemRef = Ref<Item>;
export interface ItemInfo {
   stackLimit: ItemStackLimit;
   src: string;
}

export type SlotRef = Ref<Slot>;
export type SlotType = typeof SlotTypeArr[number];

export type PlayerRef = Ref<PlayerData>;
export type Currency = 'gold' | 'diamond';
export type Wallet = Record<Currency, number>;
export interface PlayerData {
   wallet: Wallet;
}

export type HeroClass = typeof HeroClassArr[number];
export type HeroRace = typeof HeroRaceArr[number];
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

export type Stat = typeof StatArr[number];
export type Skill = typeof SkillArr[number];
export type Activity = typeof ActivityArr[number];

export type ItemClass = Consumable | Hero;
