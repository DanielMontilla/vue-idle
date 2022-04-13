<script setup lang="ts">
   import useSlots from '@/classes/SlotManager';
   import type { SlotRef } from '@/types';
   import Item from './Item.vue';

   interface SlotProps {
      data: SlotRef;
   }

   const { data: slot } = defineProps<SlotProps>();
   /** NOTE: for some reason <Item/> component is not acting on state change... this made is work somehow... i have no idea whats happening */
   let s = slot; // why?
   const manager = useSlots();

   const onDragStart = () => manager.setDragged(slot);
   const onDrop = () => manager.handleDrop(slot, true);
   const onDragEnd = () => manager.clearDragged();
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
