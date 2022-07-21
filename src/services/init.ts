import { DEF_WINDOW_SIZE, INV_COLS } from '#/CONST';
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { useInventory, useTauri } from '@/services/_index';
import { Hero, Item } from '@/classes/_index';

/** @description tauri settings */
const windowInit = async () => {
   const { isApp } = useTauri();
   if (isApp()) {
      let { WIDTH, HEIGHT } = DEF_WINDOW_SIZE;
      await appWindow.setSize(new LogicalSize(WIDTH, HEIGHT));
   }
};
const appInit = () => {
   const { addEmpty, insert } = useInventory();
   const { isApp } = useTauri();

   addEmpty(INV_COLS * 2);
   insert(Hero.generateRandom());

   let appEl = document.getElementById('app') as HTMLDivElement;
   appEl.style.backgroundColor = isApp() ? 'transparent' : 'var(--c-bg-darker)';
};

const useInit = () => ({ windowInit, appInit });

export default useInit;
