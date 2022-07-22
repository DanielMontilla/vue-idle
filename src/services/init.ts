import { DEF_WINDOW_SIZE, INV_COLS } from '#/CONST';
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { useInventory, usePages, usePlayer, useSave, useTauri } from '@/services/_index';
import { Hero, Item } from '@/classes/_index';

/** @description tauri settings */
const windowInit = async () => {
   const { isApp } = useTauri();
   if (isApp()) {
      let { WIDTH, HEIGHT } = DEF_WINDOW_SIZE;
      await appWindow.setSize(new LogicalSize(WIDTH, HEIGHT));
   }
};

/** @description calls the neccesary routines/services to load or start app state */
const appInit = async () => {
   /* utility services */
   const { load } = useSave();
   const { isApp } = useTauri();

   let appEl = document.getElementById('app') as HTMLDivElement;
   appEl.style.backgroundColor = isApp() ? 'transparent' : 'var(--c-bg-darker)';

   /* state services */
   // 1. load save file (or def if missing)
   await load(...[usePlayer(), useInventory(), usePages()]);

   const { addEmpty, insert } = useInventory();

   addEmpty(INV_COLS * 2);
   insert(Hero.generateRandom());
};

const useInit = () => ({ windowInit, appInit });

export default useInit;
