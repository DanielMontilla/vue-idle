<script setup lang="ts">
   import { PLAYER } from '@/CONST';
   import type { PlayerRef } from '@/types';
   import { defineProps, inject } from 'vue';
   import Inventory from '../components/Inventory.vue';

   interface ShopProps {
      show: boolean;
   }
   const { show } = defineProps<ShopProps>();
   const player = inject(PLAYER) as PlayerRef;
</script>

<template>
   <div class="shop-ctn" :class="{ hide: !show }">
      <div class="shop-recruitment-area"></div>
      <!-- <Slot :data="slots.addEmpty()" /> -->
      <div class="shop-item-store-area"></div>
      <div class="shop-inventory-area"><Inventory /></div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .shop-ctn {
      @include page-default;
      display: grid;
      grid-template-columns: $inv-width auto;
      grid-template-rows: auto $inv-height;
      grid-template-areas:
         'store recruit'
         'inv   recruit';
   }

   .shop-recruitment-area {
      grid-area: recruit;
   }

   .shop-item-store-area {
      grid-area: store;
   }

   .shop-inventory-area {
      grid-area: inv;
   }
</style>
