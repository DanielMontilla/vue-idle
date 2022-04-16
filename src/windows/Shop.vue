<script setup lang="ts">
   import { useSlots } from '@/services/_index';
   import { PLAYER } from '@/CONST';
   import { Slot, Inventory } from '@/components/_index';
   import type { PlayerRef } from '@/types';
   import { defineProps, inject } from 'vue';

   // interface ShopProps {
   //    show: boolean;
   // }
   // const { show } = defineProps<ShopProps>();
   const slots = useSlots();
   const player = inject(PLAYER) as PlayerRef;
</script>

<template>
   <div class="shop-ctn">
      <div class="shop-recruitment-area">
         <Slot :data="slots.addRandom('buy')" />
      </div>
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
