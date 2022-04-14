import type { Ref } from 'vue';
import type { SlotTypeArr } from './CONST';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface LabelData {
   title: string;
   onColor: string;
   offColor: string;
}

export type Tab = { label: LabelData };

export interface ItemInfo {
   stackLimit: 1 | 16 | 32 | 64;
   type: 'hero' | 'weapon' | 'armor' | 'consumable';
   imgSrc: string;
}

// export type ItemRef = Ref<ItemData>;
export interface ItemData {
   id: number;
   quantity: number;
}

export interface HeroData extends ItemData {
   healthTotal: number;
   health: number;
}

export type SlotRef = Ref<SlotData>;
export type SlotType = typeof SlotTypeArr[number];
export interface SlotData {
   type: SlotType;
   id: number;
   item?: ItemData;
}

export type PlayerRef = Ref<PlayerData>;
export type Currency = 'gold' | 'diamond';
export type Wallet = Record<Currency, number>;
export interface PlayerData {
   wallet: Wallet;
}
