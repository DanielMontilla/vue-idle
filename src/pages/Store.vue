<script setup lang="ts">
   import { useSockets, usePages } from '@/services/_index';
   import { Inventory } from '@/components/_index';

   const { register, current } = usePages();
   const index = register();
</script>

<template>
   <div v-show="index === current" class="store">
      <Inventory />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .store {
      @include window-default($store-background);
      @include flex-center;
   }
</style>
