<script setup lang="ts">
   import useInventory from '@/stores/inventory';
   import type { ItemData } from '@/types';
   import { ref } from 'vue';
   import Item from './Item.vue';

   interface SlotProps {
      index: number;
   }

   const inv = useInventory();
   let { index } = defineProps<SlotProps>();

   let currentItem = ref<ItemData | undefined>(inv.slots[index]);
   // TODO: perform more targeted state change. Currently this triggers for each slot on every state change
   inv.$subscribe((m, s) => {
      currentItem.value = s.slots[index];
   });

   let onDragStart = () => inv.setDragging(index);
   let onDrop = () => inv.handleDrop(index);

   let onDragEnd = ({ dataTransfer }: DragEvent) => {
      if (!dataTransfer) return;
      let { dropEffect } = dataTransfer;
      if (dropEffect === 'none') inv.clearDragging();
   };
</script>

<template>
   <div class="slot-ctn" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <Item
         v-if="currentItem"
         :id="currentItem.id"
         :quantity="currentItem.quantity"
         @dragstart="onDragStart"
         @dragend="onDragEnd"
      />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .slot-ctn {
      @include flex-center;
      display: inline;
      width: 64px;
      height: 64px;
      background-color: hsla(0, 0%, 0%, 0.1);
      border: $s-1 solid black;
   }
</style>
