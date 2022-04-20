import type { Currency, PlayerData, Wallet } from '@/types';
import { randInt } from '@/utilities';
import { ref, type Ref } from 'vue';

class Player {
   /*  */
   public static ref: Ref<PlayerData>;

   /* 🗿 PROPERTIES */
   private _wallet: Wallet;

   /* 🔨 CONSTRUCTOR */
   private constructor({ wallet }: PlayerData) {
      this._wallet = wallet;

      Player.ref = ref(this);
   }

   /* 🏭 FACTORY */
   public static init(data: PlayerData) {
      return new Player(data);
   }

   public static initRandom() {
      return new Player({
         wallet: {
            gold: randInt(1, 999),
            diamond: randInt(1, 999),
         },
      });
   }

   /* 🔎 GETTERS */
   public get wallet() {
      return this._wallet;
   }
}

const usePlayer = (data?: PlayerData) => {
   if (data) Player.init(data);
   if (!Player.ref && !data) Player.initRandom();

   return Player.ref;
};

export default usePlayer;
