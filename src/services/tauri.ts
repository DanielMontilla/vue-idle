import { appWindow } from '@tauri-apps/api/window';

// @ts-ignore for some reason tauri is not defined
const inTauri = (): boolean => (window.__TAURI__ ? true : false);

const warn = (operation?: string) =>
   console.warn(
      `Currently not in tauri enviroment. Operation${
         operation ? ` ${operation} ` : ' '
      }not available`
   );

const quit = () => (inTauri() ? appWindow.close() : warn());
const minimize = () => (inTauri() ? appWindow.minimize() : warn('minimize'));
const expand = () => (inTauri() ? appWindow.toggleMaximize() : warn('expand'));

const useTauri = () => ({ inTauri, quit, minimize, expand });

export default useTauri;
