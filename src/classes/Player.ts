import type { PlayerData, Wallet } from '@/types';

export default class Player {
   public wallet: Wallet;

   public constructor() {
      this.wallet = {
         gold: 0,
         diamond: 0,
      };
   }

   public boot({ wallet }: PlayerData) {
      this.wallet = wallet;
   }
}
