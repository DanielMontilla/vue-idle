<script setup lang="ts">
   import useInventory from '@/stores/inventory';
   import Slot from './Slot.vue';

   let inventory = useInventory();
</script>

<template>
   <div class="inventory-ctn">
      <Slot class="inventory-slot" v-for="index in inventory.slotIndices" :index="index" />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .inventory-ctn {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      width: 64 * 9;
      height: 64 * 5;
   }
</style>
