<script setup lang="ts">
   import { INVENTORY } from '@/CONST';
   import { inject } from 'vue';
   import Slot from './Slot.vue';
   import type { SlotRef } from '@/types';

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
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      width: 64 * 9;
      height: 64 * 5;
   }
</style>
