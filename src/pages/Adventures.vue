<script setup lang="ts">
   import { usePages, useInterval } from '@/services/_index';
   import { Inventory } from '@/components/_index';
   import { Interval } from '@/classes/_index';
   import { computed, ref } from 'vue';

   const { register, current } = usePages();
   const index = register();

   const { get } = useInterval();
   const interval = get({
      time: 3000,
      iterations: 5,
      onIteration: i => console.log(`Iteration ${i} completed!`),
      onCompleted: () => console.log(`Completed!`),
   });
</script>

<template>
   <div v-show="index === current" class="adventures">
      <Inventory class="inventory-area" />
      {{ interval.progress.toFixed(0) }}
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventures {
      @include window-default($adventure-background);
      @include grid-align;
   }
</style>
