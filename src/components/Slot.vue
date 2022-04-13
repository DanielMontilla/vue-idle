<script setup lang="ts">
   import uSlot from '@/classes/Slot';
   import type { SlotRef } from '@/types';
   import Item from './Item.vue';

   interface SlotProps {
      slot: SlotRef;
   }

   const { slot } = defineProps<SlotProps>();
   const s = slot;

   const onDragStart = () => {
      uSlot.setDragging(slot.value);
      // console.log(`pre: slot.item === undefined ${slot.item === undefined}`);
   };

   const onDrop = () => {
      uSlot.handleDrop(slot.value);
   };

   const onDragEnd = () => {
      uSlot.setDragging(undefined);
      // console.log(`post: slot.item === undefined ${slot.item === undefined}`);
   };
</script>

<template>
   <div class="slot-ctn" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <Item
         v-if="s.item"
         :quantity="s.item.quantity"
         :id="s.item.id"
         @dragstart="onDragStart"
         @dragend="onDragEnd"
      />
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
