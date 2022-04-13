<script setup lang="ts">
   import useSlots from '@/classes/SlotManager';
   import { defineProps } from 'vue';
   import Inventory from '../components/Inventory.vue';
   import Slot from '../components/Slot.vue';

   interface ShopProps {
      show: boolean;
   }
   const { show } = defineProps<ShopProps>();
   const slots = useSlots();
</script>

<template>
   <div class="shop-ctn" :class="{ hide: !show }">
      SHOP
      <Slot :data="slots.addEmpty()" />
      <div class="shop-recruitment-area"></div>
      <div class="shop-item-shop-area">
         <Inventory />
      </div>
      <div class="shop-inventory-area"></div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .shop-ctn {
      @include window-default;
   }
</style>
