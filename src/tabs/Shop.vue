<script setup lang="ts">
   import Inventory from '../components/Inventory.vue';
   defineProps();
</script>

<template>
   <div class="shop-ctn">
      <div class="shop-recruitment-area"></div>
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
