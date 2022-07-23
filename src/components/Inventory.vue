<script setup lang="ts">
   import { useInventory } from '@/services/_index';
   import { Socket } from '@/components/_index';
   import { isRef } from 'vue';

   const { sockets } = useInventory();
</script>

<template>
   <div class="inventory">
      <Socket v-for="socket in sockets" :socket="socket" :debug="true" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/index' as *;

   .inventory {
      @include grid(start, start);
      @include size(var(--inv-width), var(--inv-height));
      grid-template-columns: repeat(var(--inv-cols), var(--s-socket));
      grid-template-rows: repeat(var(--inv-rows), var(--s-socket));
   }
</style>
