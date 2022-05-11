import type { Currency, PlayerData, Wallet } from '@/types';

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

   public canPurchase(value: number, withh: Currency) {
      return value <= this.wallet[withh];
   }

   public spend(amount: number, withh: Currency) {
      let final = this.wallet[withh] - amount;
      if (final >= 0) {
         this.wallet[withh] = final;
         return true;
      } else {
         return false;
      }
   }
}
