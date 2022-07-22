import { DEF_SAVE_FILE } from '#/data';
import { SaveFile, SaveKey, StateService } from '@/types';
import { useTauri } from '@/services/_index';

const encode = (content: SaveFile): string => {
   return JSON.stringify(content);
};

const decode = (content: string): SaveFile => {
   return JSON.parse(content) as SaveFile;
};

/** stores current cached save file */
let _saveFile: SaveFile = DEF_SAVE_FILE;
let _stateServices: StateService<any>[] = [];

/**
 * @description fetches save file if it exists in game dir (otherwise sets it to the default) and load (sets data) in all of the state services specified
 * @param {StateService[]} stateServices all services to be initlized (they are also registered for later use)
 * @returns {SaveFile} fetches savefile if it exists in game dir (otherwise sets it to the default) and set safeFile to it
 */
const load = async (...stateServices: StateService<any>[]): Promise<SaveFile> => {
   const { readFile } = useTauri();

   let file = await readFile('save.txt');

   // If save.txt is found then set it to save file
   if (file) _saveFile = decode(file);

   stateServices.forEach(s => {
      // registering services
      if (!_stateServices.includes(s)) _stateServices.push(s);

      // loading data into service
      s.setData(_saveFile);
   });

   return _saveFile;
};
const save = async (): Promise<SaveFile> => {
   _stateServices.forEach(s => {
      _saveFile[s._key] = s.getData();
   });

   const { writeFile } = useTauri();

   await writeFile('save.txt', encode(_saveFile));

   return _saveFile;
};

const useSave = () => ({ load, save, _saveFile });

export default useSave;
