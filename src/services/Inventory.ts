/**
 * @description manages all player inventory state
 * @type state management service
 */
import { DEF_SAVE_FILE } from '#/data';
import { Item, Socket } from '@/classes/_index';
import { InventoryData, SaveFile, SocketRef, StateService } from '@/types';
import { Ref, ref } from 'vue';

/* 🏁 initialization  */
const { inventory } = DEF_SAVE_FILE;

/* 💬 Data */
const sockets: Ref<SocketRef[]> = ref(inventory.map(d => Socket.createRef(d)));

/* 🔧 Methods */
const addEmpty = (amount: number) => {
   for (let i = 0; i < amount; i++) {
      sockets.value.push(Socket.createRef());
   }
};

const insert = (item: Item) => {
   for (const socket of sockets.value) {
      if (!socket.value.item) {
         socket.value.insert(item);
         return;
      }
   }
};

/* state service implementations */
const _key = 'inventory';
const setData = (file: SaveFile) => {
   const { inventory } = file;

   sockets.value.splice(0, sockets.value.length);
   sockets.value = inventory.map(d => Socket.createRef(d));
};
const getData = (): InventoryData => {
   return sockets.value.map(s => s.value.getData());
};

/* for type purposes */
let props = {
   sockets,
   addEmpty,
   insert,
};

const useInventory = (): StateService<InventoryData> & typeof props => ({
   _key,
   setData,
   getData,
   sockets,
   addEmpty,
   insert,
});

export default useInventory;
