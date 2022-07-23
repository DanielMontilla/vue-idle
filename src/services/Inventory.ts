/**
 * @description manages all player inventory state
 * @type state management service
 */
import { DEF_SAVE_FILE } from '#/data';
import { Item, Socket } from '@/classes/_index';
import {
   InventoryData,
   SaveFile,
   SocketData,
   SocketRef,
   SocketSet,
   StateService,
} from '@/types';
import { Ref, ref } from 'vue';

/* 💬 Data */
const sockets = ref([]) as SocketSet;

/* 🔧 Methods */
const add = (data?: SocketData) => {
   sockets.value.push(Socket.createRef(data));
};

const addEmpty = (amount: number = 1) => {
   for (let i = 0; i < amount; i++) add();
};

const insert = (item: Item) => {
   for (const socket of sockets.value) {
      if (!socket.value.item) {
         socket.value.insert(item);
         return;
      }
   }
};

const clear = () => {
   sockets.value.splice(0, sockets.value.length);
};

/* state service implementations */
const _key = 'inventory';
const setData = (file: SaveFile) => {
   const { inventory } = file;

   clear();

   inventory.forEach(d => add(d));
};
const getData = (): InventoryData => {
   return sockets.value.map(s => (s.value.item ? s.value.getData() : undefined));
};

/* for type purposes */
let props = {
   sockets,
   addEmpty,
   insert,
   clear,
};

const useInventory = (): StateService<InventoryData> & typeof props => ({
   _key,
   setData,
   getData,
   sockets,
   addEmpty,
   insert,
   clear,
});

export default useInventory;
