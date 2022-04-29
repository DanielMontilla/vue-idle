import type { Currency, PlayerData, Wallet } from '@/types';
import { randInt } from '@/utilities';
import { ref, type Ref } from 'vue';

class Player {
   /*  */
   public static ref: Ref<Player>;

   /* 🗿 PROPERTIES */
   private _wallet: Wallet;

   /* 🔧 UTILITY */
   public canPurchase(value: number, withh: Currency) {
      return value <= Player.ref.value.wallet[withh];
   }

   public spend(amount: number, withh: Currency) {
      let final = Player.ref.value.wallet[withh] - amount;
      if (final >= 0) {
         Player.ref.value.wallet[withh] = final;
         return true;
      } else {
         return false;
      }
   }

   /* 🔨 CONSTRUCTOR */
   private constructor({ wallet }: PlayerData) {
      this._wallet = wallet;

      // @ts-ignore Typescript at it again
      Player.ref = ref<Player>(this);
   }

   /* 🏭 FACTORY */
   public static init(data: PlayerData) {
      return new Player(data);
   }

   public static initRandom() {
      return new Player({
         wallet: {
            gold: 10000, //randInt(1, 999),
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

   return {
      player: Player.ref,
      canPurchase: Player.ref.value.canPurchase,
      spend: Player.ref.value.spend,
   };
};

export default usePlayer;
