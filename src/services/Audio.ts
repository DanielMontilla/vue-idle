import { SOUNDS } from '@/data';

const sounds = new Map<string, HTMLAudioElement>();

const init = () => {
   SOUNDS.forEach(src => {
      sounds.set(src, new Audio(`src/assets/sounds/${src}.mp3`));
   });
};

const play = async (name: string) => {
   let sound = sounds.get(name);

   if (!sound) {
      console.warn(`no sound with that name. Add it to SOUNDS array in data file`);
      return;
   }

   sound.load();
   await sound.play();
};

const playRandom = (name: string) => {};

const useAudio = () => ({
   init,
   play,
});

export default useAudio;
