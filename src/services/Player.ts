import { Player } from '@/classes/_index';
import type { PlayerData } from '@/types';
import { randInt } from '@/utilities';
import { ref, type Ref } from 'vue';

const player = ref<Player>(new Player());

const load = (data: PlayerData) => {
   player.value = new Player(data);
};

const randomize = () => {
   player.value = new Player({
      wallet: {
         gold: randInt(0, 5000),
         diamond: randInt(0, 100),
      },
   });
};

const getData = (): PlayerData => {
   return player.value.getRaw();
};

const usePlayer = () => ({ player, load, randomize, getData });

export default usePlayer;
