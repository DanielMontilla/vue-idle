import { appWindow } from '@tauri-apps/api/window';
import {
   readTextFile,
   writeTextFile,
   BaseDirectory,
   createDir,
} from '@tauri-apps/api/fs';
import { configDir, resolve } from '@tauri-apps/api/path';

// @ts-ignore for some reason tauri is not defined
const isApp = (): boolean => (window.__TAURI__ ? true : false);

const warn = (operation?: string) =>
   console.warn(
      `Currently not in tauri enviroment. Operation${
         operation ? ` ${operation} ` : ' '
      }not available`
   );

const readFile = async (name: string): Promise<string | null> => {
   let path = await resolve(await configDir(), 'vue-idle', name);

   try {
      return await readTextFile(path);
   } catch (e) {
      console.log(e);
      return null;
   }
};

const writeFile = async (name: string, content: string): Promise<boolean> => {
   let path = await resolve(await configDir(), 'vue-idle', name);

   try {
      await writeTextFile(path, content);
      return true;
   } catch (e) {
      console.log(e);
      return false;
   }
};

const quit = () => (isApp() ? appWindow.close() : warn());
const minimize = () => (isApp() ? appWindow.minimize() : warn('minimize'));
const expand = () => (isApp() ? appWindow.toggleMaximize() : warn('expand'));

const useTauri = () => ({ isApp, quit, minimize, expand, readFile, writeFile });

export default useTauri;
