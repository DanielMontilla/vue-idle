import type { Ref } from 'vue';

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

export interface ItemData {
   id: number;
   quantity: number;
}

export type SlotRef = Ref<SlotData>;

export type SlotType = 'none' | 'rogue';

/** @description contains all necesary slot data to render view */
export interface SlotData {
   type: SlotType;
   id: number;
   item?: ItemData;
}
