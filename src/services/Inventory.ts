import type { Item, Socket } from '@/classes/_index';
import { useSockets } from '@/services/_index';
import { ref, type Ref } from 'vue';

const sockets = ref<Ref<Socket>[]>([]); // not really sure why I made this a ref of a ref
const { createRef, createRandomRef } = useSockets();

const add = (item?: Item) => {
   let socket = createRef('inventory', item);
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

const getRaw = () => {
   let arr: Array<Item | undefined> = [];
   sockets.value.forEach(s => arr.push(s.value.item));
   return arr;
};

const load = (rawItems: Array<Item | undefined>) => {
   rawItems.forEach(i => {
      if (i) insert(i);
   });
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
   getRaw,
   load,
   insert,
});

export default useInventory;
