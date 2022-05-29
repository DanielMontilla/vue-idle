import type { Currency, PlayerData, Wallet } from '@/types';

export default class Player {
   public wallet: Wallet;

   public constructor(data?: PlayerData) {
      let { wallet } = data
         ? data
         : {
              wallet: {
                 diamond: 0,
                 gold: 0,
              },
           };

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
