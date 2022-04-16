import type { Currency, Wallet } from '@/types';
import { ref } from 'vue';

class Player {
   private constructor(gold: number = 10) {
      Player._wallet.gold = gold;
   }

   private static instance: Player;
   public static create() {
      if (!Player.instance) Player.instance = new Player();
      return Player.instance;
   }

   private static _wallet: Wallet;
   public static get wallet() {
      return Player._wallet;
   }

   public static addToWallet(currency: Currency, amount: number) {
      return (Player._wallet[currency] += amount);
   }
}

const player = ref<Player>(Player.create());
