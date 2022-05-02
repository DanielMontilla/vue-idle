<script setup lang="ts">
   import usePages from '@/services/Pages';
   import Inventory from '../components/Inventory.vue';

   const { register, current } = usePages();
   const index = register();
</script>

<template>
   <div v-show="index === current" class="adventures">
      <Inventory />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventures {
      @include window-default($adventure-background);
   }
</style>
