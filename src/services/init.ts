import { DEF_WINDOW_SIZE, INV_COLS } from '#/CONST';
import { Item } from '@/classes/_index';
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { useInventory, useTauri } from '@/services/_index';

/** @description tauri settings */
const windowInit = async () => {
   const { inTauri } = useTauri();

   if (inTauri()) {
      let { WIDTH, HEIGHT } = DEF_WINDOW_SIZE;
      await appWindow.setSize(new LogicalSize(WIDTH, HEIGHT));
   }
};
const appInit = () => {
   const { addEmpty, insert } = useInventory();

   addEmpty(INV_COLS * 2);
   insert(Item.fromData({ type: 'hero', id: 1, quantity: 10, itemData: { name: 'x' } }));
};

const useInit = () => ({ windowInit, appInit });

export default useInit;
