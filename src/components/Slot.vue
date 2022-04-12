<script setup lang="ts">
   import useSlots from '@/stores/slots';
   import type { ItemData, SlotData } from '@/types';
   import { ref } from 'vue';
   import Item from './Item.vue';

   interface SlotProps {
      index: number;
   }

   const slots = useSlots();
   const { index } = defineProps<SlotProps>();

   let item = ref<ItemData | undefined>(slots.slots[index].item);

   // TODO: perform more targeted state change. Currently this triggers for each slot on every state change
   slots.$subscribe((m, s) => {
      item.value = s.slots[index].item;
   });

   let onDragStart = ({ dataTransfer }: DragEvent) => {
      if (!dataTransfer) return;
      dataTransfer.dropEffect = 'move';
      dataTransfer.effectAllowed = 'move';
      slots.setDragging(index);
   };
   let onDrop = () => slots.handleDrop(index);

   let onDragEnd = ({ dataTransfer }: DragEvent) => {
      if (!dataTransfer) return;
      let { dropEffect } = dataTransfer;
      if (dropEffect === 'none') slots.clearDragging();
   };
</script>

<template>
   <div class="slot-ctn" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <Item v-if="item" :data="item" @dragstart="onDragStart" @dragend="onDragEnd" />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .slot-ctn {
      @include flex-center;
      display: block;
      width: 64px;
      height: 64px;
      min-height: 64px;
      min-width: 64px;
      background-color: hsla(0, 0%, 0%, 0.1);
      border: $s-1 solid black;
   }
</style>
