<script setup lang="ts">
   import type { Socket, Item } from '@/classes/_index';
   import { Item as MyItem } from '@/components/_index';
   import { computed, type Ref } from 'vue';
   import useSockets from '@/services/Sockets';

   interface SocketProps {
      socket?: Ref<Socket>;
      debug?: boolean;
      onEnter?: (item: Item) => any;
      onLeave?: () => any;
   }

   const { socket: socketRef, debug, onEnter, onLeave } = defineProps<SocketProps>();
   const { createRef, handleDrop, setSource, clearSource } = useSockets();
   const socket = socketRef ? socketRef : createRef();

   const item = computed(() => socket.value.item);

   /* 📅 EVENT HANDLERS */
   const onDragStart = ({ dataTransfer }: DragEvent) => {
      // CONTEXT: THE SOCKET BEING DRAGGED FROM
      if (!dataTransfer) return;
      dataTransfer.effectAllowed = 'move';
      dataTransfer.dropEffect = 'move';
      setSource(socket);
   };

   const onDrop = () => {
      // CONTEXT: THE SOCKET BEING DROPPED INTO
      if (!handleDrop(socket, debug)) return;
      if (onEnter) onEnter(item.value as Item);
   };

   const onDragEnd = ({ dataTransfer }: DragEvent) => {
      // CONTEXT: THE SOCKET BEING DRAGGED FROM
      if (!dataTransfer) return;
      if (dataTransfer.dropEffect !== 'none') {
         if (onLeave) onLeave();
      }
      clearSource();
   };
</script>

<template>
   <div class="socket" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <MyItem
         v-if="item"
         :item="item"
         :onDragStart="onDragStart"
         :onDragEnd="onDragEnd"
      />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .socket {
      @include flex-center;
      @include set-size(64px, 64px);

      background-color: hsla(0, 0%, 100%, 0.05);
      border: 1px solid rgb(25, 25, 25);
   }
</style>
