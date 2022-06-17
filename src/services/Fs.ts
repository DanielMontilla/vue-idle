import { Save } from '@/system/_index';
import { usePlayer, useInventory } from '@/services/_index';
import { BaseDirectory, readTextFile, writeFile } from '@tauri-apps/api/fs';

const { getData: getPlayerData, load: loadPlayer } = usePlayer();
const { getData: getInventoryData, load: loadInventory } = useInventory();

const save = async () => {
   console.log(`Writting file...`);
   // Create save file object
   const SAVE = new Save(getPlayerData(), getInventoryData());

   try {
      await writeFile(
         { contents: JSON.stringify(SAVE), path: 'save.txt' },
         { dir: BaseDirectory.Download }
      );
      console.log(`Wrote file!`);
   } catch (e) {
      console.log(`Couldn't write file :(`);
      console.log(e);
   }
};
const load = async () => {
   console.log(`Loading file...`);
   // Create save file object
   try {
      let saveFile = await readTextFile('save.txt', { dir: BaseDirectory.Download });
      let SAVE = JSON.parse(saveFile) as Save;

      loadPlayer(SAVE.player);
      loadInventory(SAVE.inventory);
      console.log(`File loaded!`);
   } catch (e) {
      console.log(`Couldn't load file :(`);
      console.log(e);
   }
};

const useFs = () => ({
   save,
   load,
});

export default useFs;
