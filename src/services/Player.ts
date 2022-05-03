import { Player } from '@/classes/_index';
import type { PlayerData } from '@/types';
import { randInt } from '@/utilities';
import { ref, type Ref } from 'vue';

const player: Ref<Player> = ref(new Player());
const randomize = () => {
   player.value.boot({
      wallet: {
         gold: randInt(0, 5000),
         diamond: randInt(0, 100),
      },
   });
};

const usePlayer = (data?: PlayerData) => {
   if (data) player.value.boot(data);

   return { player: player, randomize: randomize };
};

export default usePlayer;
