<script setup lang="ts">
   import { Inventory } from '@/components/_index';
   import { Barracks, Store } from '@/pages/_index';
   import { usePages } from '@/services/_index';

   const { shop } = usePages();
</script>

<template>
   <div class="page-shop">
      <Barracks class="barracks" :data="shop.barracks" />
      <Store class="store" />
      <Inventory class="inventory" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/index' as *;
   .page-shop {
      @include grid-area(
         min-content auto,
         auto min-content,
         'barracks store' 'inventory store'
      );
   }

   .inventory {
      grid-area: inventory;
   }

   .barracks {
      grid-area: barracks;
   }

   .store {
      grid-area: store;
   }
</style>
