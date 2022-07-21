import { appWindow } from '@tauri-apps/api/window';

// @ts-ignore for some reason tauri is not defined
const isApp = (): boolean => (window.__TAURI__ ? true : false);

const warn = (operation?: string) =>
   console.warn(
      `Currently not in tauri enviroment. Operation${
         operation ? ` ${operation} ` : ' '
      }not available`
   );

const quit = () => (isApp() ? appWindow.close() : warn());
const minimize = () => (isApp() ? appWindow.minimize() : warn('minimize'));
const expand = () => (isApp() ? appWindow.toggleMaximize() : warn('expand'));

const useTauri = () => ({ isApp, quit, minimize, expand });

export default useTauri;
