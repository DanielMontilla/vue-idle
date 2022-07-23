import { DEF_WINDOW_SIZE, INV_COLS } from "#/CONST";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import {
   useInventory,
   usePages,
   usePlayer,
   useSave,
   useTauri,
} from "@/services/_index";
import { Hero, Item } from "@/classes/_index";

/** @description tauri settings */
const windowInit = async () => {
   const { isApp } = useTauri();
   if (isApp()) {
      let { WIDTH, HEIGHT } = DEF_WINDOW_SIZE;
      await appWindow.setSize(new LogicalSize(WIDTH, HEIGHT));
   }
};

/**
 * @description calls the neccesary routines/services to load or start app state
 * @param {boolean} def indicates whether to load base/default save
 */
const appInit = async (def: boolean = false) => {
   /* utility services */
   const { load } = useSave();
   const { isApp } = useTauri();

   let appEl = document.getElementById("app") as HTMLDivElement;
   appEl.style.backgroundColor = isApp() ? "transparent" : "var(--c-bg-darker)";

   /* state services */
   let services = [usePlayer(), useInventory(), usePages()];

   await load(services, def);
};

const useInit = () => ({ windowInit, appInit });

export default useInit;
