import {
   ACTIVITY_LIST,
   CURRENCY_LIST,
   DURATION,
   HERO_CLASS_LIST,
   HERO_RACE_LIST,
   ITEM_TYPE_LIST,
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

/* 🧰 data for Object Construction */
export interface SocketData {
   type: SocketTypes;
   itemData: ItemData | null;
}

export interface ItemData<T extends ItemTypes = 'hero'> {
   id: number;
   type: T;
   quantity?: number;

   itemData: $ItemTypeToData<T>;
}

export interface HeroData {
   name: string;
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

export type LoopCallback = (dt: number) => any;
export type Range = { min: number; max: number };

export interface Save {
   shop: {
      barracks: {};
   };
}
export type SaveRef = Ref<Save>;

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
