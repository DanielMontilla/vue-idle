import { DEF_SAVE_FILE } from '#/data';
import { SaveFile, StateService } from '@/types';
import { useTauri } from '@/services/_index';
import { ref } from 'vue';

/* 🗿 properties */
/** @description defines whether game is using initial save file */
let isDef = true;

/** stores current cached save file */
let _saveFile: SaveFile = DEF_SAVE_FILE;
let _stateServices: StateService<any>[] = [];

const registerServices = (...stateServices: StateService<any>[]) => {
   stateServices.forEach(s => {
      if (!_stateServices.includes(s)) _stateServices.push(s);
   });
};

/**
 * @description fetches save file if it exists in game dir (otherwise sets it to the default) and load (sets data) in all of the state services specified
 * @param {StateService[]} stateServices all services to be initlized (they are also registered for later use)
 * @param {boolean} def indicates whether to load base/default save
 * @returns {SaveFile} fetches savefile if it exists in game dir (otherwise sets it to the default) and set safeFile to it
 */
const load = async (
   stateServices: StateService<any>[],
   def: boolean = false
): Promise<SaveFile> => {
   const { readFile } = useTauri();

   registerServices(...stateServices);

   if (!def) {
      let file = await readFile('save.txt');

      // If save.txt is found then set it to save file
      if (file) {
         _saveFile = decode(file);
         isDef = false;
      }
   }

   _stateServices.forEach(s => {
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

/* 🔧 utility */
const encode = (content: SaveFile): string => {
   return JSON.stringify(content);
};

const decode = (content: string): SaveFile => {
   return JSON.parse(content) as SaveFile;
};

const useSave = () => ({ load, registerServices, save, _saveFile, isDef });

export default useSave;
