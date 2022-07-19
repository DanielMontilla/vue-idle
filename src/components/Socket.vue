<script setup lang="ts">
   import { Socket, Item as ItemClass } from '@/classes/_index';
   import { Item } from '@/components/_index';
   import { SocketRef } from '@/types';
   import { ref, computed } from 'vue';

   /* 🎈 props & default values */
   const { socket, onInsert, onExtract, debug } = defineProps<{
      socket: SocketRef;
      onInsert?: (item: ItemClass) => any;
      onExtract?: () => any;
      debug?: boolean;
   }>();

   const { setSource, handleDrop, clearSource } = Socket;

   /* 🔗 reactive values */

   /* 💬 computed & parsed values  */
   const item = computed(() => socket.value.item);

   /* 📅 event handlers */
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
      if (onInsert) onInsert(item.value as ItemClass);
   };

   const onDragEnd = ({ dataTransfer }: DragEvent) => {
      // CONTEXT: THE SOCKET BEING DRAGGED FROM
      if (!dataTransfer) return;
      if (dataTransfer.dropEffect !== 'none') {
         if (onExtract) onExtract();
      }
      clearSource();
   };
</script>

<template>
   <div class="socket" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <Item v-if="item" :item="item" :onDragStart="onDragStart" :onDragEnd="onDragEnd" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/index' as *;

   .socket {
      @include square(var(--s-socket));
      @include grid;

      border: 1px solid var(--c-bg-darker);
      background-color: rgba(0, 0, 0, 0.1);
   }
</style>
