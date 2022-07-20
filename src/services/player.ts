import { Currencies, Wallet } from '@/types';
import { ref } from 'vue';

/* 🗿 Properties */
const wallet = ref<Wallet>({ gold: 0 });

/* 🔧 Methods */
/**
 * @param {Currencies} currency indicates which currency is gonna be used for purchase
 * @param {number} amount amount required to for successful purchase
 * @returns {boolean} boolean indicating whether the transaction was successful
 */
const purchase = (currency: Currencies, amount: number): boolean => {
   if (wallet.value[currency] >= amount) {
      wallet.value[currency] -= amount;
      return true;
   }
   return false;
};

const usePlayer = () => ({ wallet, purchase });

export default usePlayer;
