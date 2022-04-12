import type { ItemInfo } from './types';

export const WINDOW_SIZE = { HEIGHT: 900, WIDTH: 1200 };

export const items: Record<number, ItemInfo> = {
   1: {
      stackLimit: 1,
      type: 'hero',
      imgSrc: `icons/knight`
   }
};
