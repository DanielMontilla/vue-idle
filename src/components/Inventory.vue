<script setup lang="ts">
   import { Slot } from '@/components/_index';
   import useInventory from '@/services/Inventory';

   const { slots } = useInventory();
</script>

<template>
   <div class="inventory-container">
      <Slot v-for="slot in slots" :slot="slot" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .inventory-container {
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
