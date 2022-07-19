import { Item, Socket } from '@/classes/_index';
import { SocketRef } from '@/types';
import { ref } from 'vue';

const sockets = ref<SocketRef[]>([]);

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

const useInventory = () => ({ sockets, addEmpty, insert });

export default useInventory;
