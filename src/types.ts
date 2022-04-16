import type { Ref } from 'vue';
import type { Hero, Consumable, Item, Slot } from '@/classes/_index';
import type { ConsumableArr, HeroClassArr, HeroRaceArr, ItemTypeArr, SlotTypeArr } from '@/CONST';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface LabelData {
   title: string;
   onColor: string;
   offColor: string;
}

export type Tab = { label: LabelData };

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
export interface HeroConfig {
   name: string;
   level: number;
   race: HeroRace;
   class: HeroClass;
}

export interface Stat {
   level: number; // Integer level
   currentExp: number;
   neededExp: number;
}

export type uCallback = (dt: number) => any;

export type Consumables = typeof ConsumableArr[number];
