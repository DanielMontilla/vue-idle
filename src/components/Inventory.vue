<script setup lang="ts">
   import useInventory from '@/stores/inventory';
   import Slot from './Slot.vue';

   const inventory = useInventory();
</script>

<template>
   <div class="inventory-ctn">
      <Slot v-for="(slot, i) in inventory.slots" :index="i" />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .inventory-ctn {
      display: grid;
      grid-auto-flow: column;
   }
</style>
