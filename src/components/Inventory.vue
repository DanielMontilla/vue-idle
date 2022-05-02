<script setup lang="ts">
   import { useInventory } from '@/services/_index';
   import { Socket } from '@/components/_index';

   const { sockets } = useInventory();
</script>

<template>
   <div class="inventory">
      <Socket v-for="socket in sockets" :socket="socket" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .inventory {
      @include even-grid(6, 9);
   }
</style>
