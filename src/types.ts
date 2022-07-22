import {
   ACTIVITY_LIST,
   CURRENCY_LIST,
   DURATION,
   HERO_CLASS_LIST,
   HERO_RACE_LIST,
   ITEM_TYPE_LIST,
   PAGE_LIST,
   RESOURCE_LIST,
   SKILL_LIST,
   SOCKET_TYPE_LIST,
   STAT_LIST,
   ZONE_LIST,
} from '#/CONST';
import { Socket, Item, Hero, Consumable, Weapon } from '@/classes/_index';
import { Ref } from 'vue';

/* 🧬 Literals constant */
export type ItemTypes = typeof ITEM_TYPE_LIST[number];
export type SocketTypes = typeof SOCKET_TYPE_LIST[number];
export type HeroClasses = typeof HERO_CLASS_LIST[number];
export type HeroRaces = typeof HERO_RACE_LIST[number];
export type Resources = typeof RESOURCE_LIST[number];
export type Stats = typeof STAT_LIST[number];
export type Skills = typeof SKILL_LIST[number];
export type Activities = typeof ACTIVITY_LIST[number];
export type Zones = typeof ZONE_LIST[number];
export type Currencies = typeof CURRENCY_LIST[number];
export type Pages = typeof PAGE_LIST[number];

/* 🧰 data for object construction or state initialization */
export interface SocketData {
   type: SocketTypes;
   itemData: ItemData | null;
}

export interface ItemData<I extends ItemTypes = ItemTypes> {
   id: number;
   type: I;
   quantity?: number;

   itemData: $ItemTypeToData<I>;
}

export interface HeroData {
   name: string;
   race: HeroRaces;
   class: HeroClasses;
   level: number;
}
export interface ConsumableData {
   color: number;
}
export interface WeaponData {
   dmg: number;
}

export interface IntervalData {
   time: number | keyof typeof DURATION;
   onTick?: (dt: number) => void;
   onIteration?: (iteration: number) => number | void;
   onCompleted?: () => void;
   iterations?: number | 'infinite';
   paused?: boolean;
}

export interface PlayerData {
   wallet: Wallet;
}

export type InventoryData = SocketData[];

export interface BarracksData {
   refreshTime: IntervalData;
   slots: number;
   heros: SocketData[];
}

export interface ShopData {
   barracks: BarracksData;
}

export type PagesData = {
   shop: ShopData;
};

/**
 * @description represents all game data to be serilized for long term storage
 */
export interface SaveFile {
   player: PlayerData;
   inventory: InventoryData;
   pages: PagesData;
}

/* 🎯 descriptors */
export interface Skill {
   level: number;
   expirince: number;
}

export interface Activity {
   level: number;
   expirince: number;
}

/* 🆘 helpers */
export type SocketRef = Ref<Socket>;
export type ItemRef = Ref<Item>;
export type SkillsObject = Record<Skills, Skill>;
export type StatsObject = Record<Stats, number>;
export type ActivitiesObject = Record<Activities, Activity>;

export type Wallet = Record<Currencies, number>;

export type ItemStackLimit = 1 | 16 | 32 | 64;
export interface ItemInfo {
   stackLimit: ItemStackLimit;
   src: string;
}

export interface StateService<T> {
   _key: SaveKey;
   setData(file: SaveFile): void;
   getData(): T;
}

export type SaveKey = keyof SaveFile;

export interface StateClass<T> {
   getData(): T;
}

export type LoopCallback = (dt: number) => any;
export type Range = { min: number; max: number };

/** 📏 Helper conditional types */
export type $ItemTypeToData<T extends ItemTypes> = T extends 'hero'
   ? HeroData
   : T extends 'consumable'
   ? ConsumableData
   : WeaponData;

export type $ItemTypeToClass<T extends ItemTypes> = T extends 'hero'
   ? Hero
   : T extends 'consumable'
   ? Consumable
   : Weapon;
