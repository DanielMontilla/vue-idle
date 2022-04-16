<script setup lang="ts">
   import { INVENTORY } from '@/CONST';
   import type { SlotRef } from '@/types';
   import { Slot } from '@/components/_index';
   import { inject } from 'vue';

   let slots = inject(INVENTORY) as SlotRef[];
</script>

<template>
   <div class="inventory-ctn">
      <Slot class="inventory-slot" v-for="slot in slots" :data="slot" />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;
   .inventory-ctn {
      display: grid;
      gap: 0;
      grid-template-columns: repeat($inv-cols, $slot-size);
      grid-template-rows: repeat($inv-rows, $slot-size);
      width: $inv-width;
      height: $inv-height;
      // overflow-y: auto;
      // overflow-x: hidden;
      &::-webkit-scrollbar {
         // TODO: implement custom scroll functionality
         // transform: translate(10px);
      }
   }
</style>
