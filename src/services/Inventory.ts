import type { Item, Socket } from '@/classes/_index';
import { useSockets } from '@/services/_index';
import type { SocketType } from '@/types';
import { ref, type Ref } from 'vue';

const sockets = ref<Ref<Socket>[]>([]);
const { createRef } = useSockets();

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

const useInventory = () => {
   return {
      sockets: sockets,
      add: add,
      addEmpty: addEmpty,
      addEmpties: addEmpties,
   };
};

export default useInventory;
