import { type Item, Socket, Consumable, Hero } from '@/classes/_index';
import type { ItemData, SocketData, SocketType } from '@/types';
import { rand, randArrPick, randInt } from '@/utilities';
import { ITEM_TYPE_ARR, SOCKET_TYPE_ARR } from '@/CONST';
import { ref, type Ref } from 'vue';

let sourceRef: Ref<Socket> | undefined = undefined;

const create = (data: SocketData): Socket => {
   let socket = new Socket(data);
   return socket;
};

const createRef = (data: SocketData): Ref<Socket> => {
   let socket = new Socket(data);
   return ref(socket);
};

const createRandomRef = (socketType?: SocketType, emptyChance = 0.5) => {
   socketType = socketType ? socketType : randArrPick(SOCKET_TYPE_ARR);

   let item: ItemData | undefined;
   if (rand() < emptyChance) {
      let itemType = randArrPick(ITEM_TYPE_ARR);
      switch (itemType) {
         case 'consumable':
            let consumable = Consumable.Random();
            consumable.quantity = randInt(1, consumable.info.stackLimit);
            item = consumable.getData();
            break;
         case 'hero':
            item = Hero.Random().getData();
            break;
      }
   }
   return createRef({ type: socketType, item: item });
};

const handleDrop = (destinationRef: Ref<Socket>, debug?: boolean) => {
   if (!sourceRef) {
      if (debug) console.log(`Source socket is undefined. how...? Doing Nothing...`);
      return false;
   }

   let source = sourceRef.value;
   let destination = destinationRef.value;
   let destinationItem = destination.item;
   let sourceItem = source.item;

   if (source.id === destination.id) {
      // If destination === source
      if (debug) console.log(`Dropped item into its original socket. Doing Nothing...`);
      return false;
   }

   if (!sourceItem) {
      // If src has no item... but they how would one drag no item?
      if (debug) console.log(`How the fuck. Doing Nothing...`);
      return false;
   }

   if (source.isLocked || destination.isLocked) {
      // If either slot is locked
      if (debug)
         console.log(`Source o destination socket is locked. Can't take or put items in`);
      return false;
   }

   if (destination.notAllowed(sourceItem)) {
      // If destination slot doesn't allow source item
      if (debug)
         console.log(
            `Destination slot's whitelist prevent source item. Doing Nothing...`
         );
      return false;
   }

   if (destinationItem) {
      if (source.notAllowed(destinationItem)) {
         if (debug)
            console.log(
               `Source slot's whitelist prevent destination item. Doing Nothing...`
            );
         return false;
      }
   }

   if (!destinationItem) {
      // If the destination slot is empty:
      if (debug) console.log(`Destination Slot is empty. Replacing...`);
      destinationItem = sourceItem;
      sourceItem = undefined;
   } else {
      // If the destination slot is NOT empty:
      if (debug) console.log(`Destination Slot NOT Empty`);
      if (
         destinationItem.id === sourceItem.id &&
         destinationItem.type === sourceItem.type
      ) {
         // If both slots have the same item:
         if (debug) console.log(`Both item's slots are the same (Id)`);
         let stackLimit = destinationItem.stackLimit;
         let sum = destinationItem.quantity + sourceItem.quantity;
         if (sum > stackLimit) {
            // If the sum of the quantities surpass the stack limit:
            if (debug) console.log(`The sum surpass the stack-limit`);
            let remainder = sum - stackLimit;
            if (destinationItem.quantity === stackLimit) {
               // If destination slot is already full:
               if (debug) console.log(`Destination slot is already full. Swapping...`);
               let temp = sourceItem;
               sourceItem = destinationItem;
               destinationItem = temp;
            } else {
               // If destination slot can only hold a portion:
               if (debug) console.log(`Destination slot has space. Splitting...`);
               sourceItem.quantity = remainder;
               destinationItem.quantity = stackLimit;
            }
         } else {
            // If sum does NOT surpass stack size:
            if (debug)
               console.log(`The sum does NOT surpass the stack-limit. Merging...`);
            destinationItem.quantity = sum;
            sourceItem = undefined;
         }
      } else {
         // If both slots have diferent items:
         if (debug) console.log(`Slot's items are different. Swapping...`);
         let temp = sourceItem;
         sourceItem = destinationItem;
         destinationItem = temp;
      }
   }

   sourceRef.value.item = sourceItem;
   destinationRef.value.item = destinationItem;
   return true;
};

const setSource = (socket: Ref<Socket>) => (sourceRef = socket);
const clearSource = () => (sourceRef = undefined);

const useSockets = () => ({
   createRef,
   create,
   handleDrop,
   setSource,
   clearSource,
   createRandomRef,
});

export default useSockets;
