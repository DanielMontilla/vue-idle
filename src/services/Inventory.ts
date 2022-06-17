import type { Item, Socket } from '@/classes/_index';
import { useSockets } from '@/services/_index';
import type { InventoryData, ItemData } from '@/types';
import { ref, type Ref } from 'vue';

const sockets = ref<Ref<Socket>[]>([]); // not really sure why I made this a ref of a ref... | bc inventory may grow...?
const { createRef, createRandomRef } = useSockets();

const add = (item?: ItemData) => {
   let socket = createRef({ type: 'inventory', item: item });
   sockets.value.push(socket);
   return socket;
};

const addEmpty = () => add();
const addEmpties = (amount: number) => {
   let arr: Ref<Socket>[] = [];
   for (let i = 0; i < amount; i++) arr.push(add());
   return arr;
};

const addRandom = () => {
   let socket = createRandomRef('inventory');
   sockets.value.push(socket);
   return socket;
};

const addRandoms = (amount: number) => {
   let arr: Ref<Socket>[] = [];
   for (let i = 0; i < amount; i++) arr.push(addRandom());
   return arr;
};

const get = (index: number) => {
   return sockets.value[index];
};

const getData = () => {
   let arr: InventoryData = [];
   sockets.value.forEach(s => arr.push(s.value.getData()));
   return arr;
};

const load = (data: InventoryData) => {
   // Very wonky vue reference behaviour, not really sure how to remedy this
   for (let i = 0; i < data.length; i++) {
      let socketData = data[i];

      if (sockets.value[i]) {
         sockets.value[i].value.fromData(socketData);
      } else {
         sockets.value.push(createRef(socketData));
      }
   }

   sockets.value.push(createRandomRef('inventory'));
};

const insert = (item: Item) => {
   for (const socket of sockets.value) {
      if (!socket.value.item) {
         socket.value.item = item;
         return;
      }
   }
};

const useInventory = () => ({
   sockets,
   add,
   get,
   addEmpty,
   addEmpties,
   addRandom,
   addRandoms,
   getData,
   load,
   insert,
});

export default useInventory;
