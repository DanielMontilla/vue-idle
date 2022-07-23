import { ItemInfo, ItemTypes, PlayerData, SaveFile } from '@/types';

// TODO: move to json file

export const ITEM_REGISTRY: Record<ItemTypes, Record<number, ItemInfo>> = {
   hero: {
      1: {
         stackLimit: 1,
         src: `human`,
      },
      2: {
         stackLimit: 1,
         src: `goblin`,
      },
   },
   consumable: {
      1: {
         stackLimit: 16,
         src: `consumables/potion`,
      },
   },
   weapon: {},
};

const ITEM_TOOLTIP_REGISTRY = {};

/* 🏢 base/default values */
export const DEF_SAVE_FILE: SaveFile = {
   player: {
      wallet: {
         gold: 0,
      },
   },
   inventory: new Array(26).fill(undefined),
   pages: {
      shop: {
         barracks: {
            interval: {
               time: '5m',
            },
            sockets: new Array(3).fill(undefined),
         },
      },
   },
};
