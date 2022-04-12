<script setup lang="ts">
   import Inventory from '../components/Inventory.vue';
   import { defineProps } from 'vue';
   import useSlots from '@/stores/slots';
   import Slot from '../components/Slot.vue';

   interface ShopProps {
      show: boolean;
   }
   const slots = useSlots();
   const { show } = defineProps<ShopProps>();
   let i = slots.add({ type: '', item: { id: 2, quantity: 1 } });
</script>

<template>
   <div class="shop-ctn" :class="{ hide: !show }">
      <div class="shop-recruitment-area">
         <Slot :index="i" />
      </div>
      <div class="shop-item-shop-area"></div>
      <div class="shop-inventory-area">
         <Inventory />
      </div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .shop-ctn {
      @include window-default;
   }
</style>
