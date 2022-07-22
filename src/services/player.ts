/**
 * @description manages all player related application state
 * @type state management service
 */
import { DEF_SAVE_FILE } from '#/data';
import { Currencies, PlayerData, SaveFile, StateService, Wallet } from '@/types';
import { Ref, ref } from 'vue';

/* 🏁 initialization  */
const { player } = DEF_SAVE_FILE;

/* 💬 Data */
const wallet: Ref<Wallet> = ref(player.wallet);

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

/* state service implementations */
const _key = 'player';
const setData = (file: SaveFile) => {
   const { player } = file;

   wallet.value = player.wallet;
};
const getData = (): PlayerData => ({
   wallet: wallet.value,
});

/* for type purposes */
let props = {
   wallet,
   purchase,
};

const usePlayer = (): StateService<PlayerData> & typeof props => ({
   _key,
   setData,
   getData,
   wallet,
   purchase,
});

export default usePlayer;
