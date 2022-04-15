import type { Ref } from 'vue';
import type SlotData from './classes/SlotData';
import type { HeroClassArr, HeroRaceArr, ItemTypeArr, SlotTypeArr } from './CONST';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface LabelData {
   title: string;
   onColor: string;
   offColor: string;
}

export type Tab = { label: LabelData };

export type ItemType = typeof ItemTypeArr[number];

export interface ItemInfo {
   stackLimit: 1 | 16 | 32 | 64;
   type: ItemType;
   imgSrc: string;
}

// export type ItemRef = Ref<ItemData>;

export type SlotRef = Ref<SlotData>;
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
