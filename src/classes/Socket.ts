import { Hero, Item } from '@/classes/_index';
import { ItemTypes, SocketData, SocketRef, SocketTypes, StateClass } from '@/types';
import { ref } from 'vue';

export default class Socket implements StateClass<SocketData> {
   private static next: number = 0;
   public readonly id: number;

   /**
    * @description store item instance (or not)
    * @type 'Item' item
    * @type 'null' no item currently being held by socket
    */
   public item: Item | null;
   /**
    * @description indicates which items are currently allowed for insertion
    * @type 'Array<ItemType>' if only certain items types are whitelisted
    * @type '"all"' if all types are allowed
    * @type 'null' if no types are allowed
    */
   public whitelist: ItemTypes[] | 'all' | null;
   /** @description if locked no item can enter or exit */
   public isLocked: boolean;
   /** @description provides hints for categorized socket behavior at initialization */
   public type: SocketTypes;

   public count = 0;

   private constructor(data?: SocketData) {
      let { type, itemData }: SocketData = data
         ? data
         : {
              type: 'none',
              itemData: null,
           };

      this.item = itemData ? Item.fromData(itemData) : null;
      this.type = type;
      this.isLocked = false;

      switch (this.type) {
         case 'none':
            this.whitelist = 'all';
            break;
         case 'inventory':
            this.whitelist = 'all';
            break;
         case 'display':
            this.whitelist = null;
            break;
         case 'journey':
            this.whitelist = ['hero'];
            break;
         case 'buy':
            this.whitelist = null;
            break;
         default:
            console.warn(`socket of type ${this.type} is not registered`);
            this.whitelist = 'all';
            break;
      }

      this.id = Socket.next++;
   }

   public insert(item: Item) {
      this.item = item;
      return this;
   }

   public lock() {
      this.isLocked = true;
      return this;
   }

   public unlock() {
      this.isLocked = false;
      return this;
   }

   public isAllowed(item: Item) {
      return this.whitelist === null
         ? false
         : this.whitelist === 'all'
         ? true
         : this.whitelist.includes(item.type);
   }

   public isNotAllowed(item: Item) {
      return !this.isAllowed(item);
   }

   public getData(): SocketData {
      return {
         type: this.type,
         itemData: this.item ? this.item.getData() : null,
      };
   }

   /* ⚡ static/global members & methods */
   public static createRef = (data?: SocketData): SocketRef => ref(new Socket(data));
   public static source: SocketRef | null;
   public static setSource = (socket: SocketRef) => (this.source = socket);
   public static clearSource = () => (Socket.source = null);
   public static handleDrop = (destinationRef: SocketRef, debug?: boolean) => {
      let sourceRef = this.source;

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
         if (debug)
            console.log(`Dropped item into its original socket. Doing Nothing...`);
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
            console.log(
               `Source o destination socket is locked. Can't take or put items in`
            );
         return false;
      }

      if (destination.isNotAllowed(sourceItem)) {
         // If destination slot doesn't allow source item
         if (debug)
            console.log(
               `Destination slot's whitelist prevent source item. Doing Nothing...`
            );
         return false;
      }

      if (destinationItem) {
         if (source.isNotAllowed(destinationItem)) {
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
         sourceItem = null;
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
               sourceItem = null;
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
}
