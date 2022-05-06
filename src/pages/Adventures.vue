<script setup lang="ts">
   import { usePages } from '@/services/_index';
   import { Inventory } from '@/components/_index';

   const { register, current } = usePages();
   const index = register();
</script>

<template>
   <div v-show="index === current" class="adventures">
      <Inventory class="inventory-area" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventures {
      @include window-default($adventure-background);
      @include grid-align;
   }
</style>
