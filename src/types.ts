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

export type SlotType = '';

export interface SlotData {
   type: SlotType;
   item?: ItemData;
}
