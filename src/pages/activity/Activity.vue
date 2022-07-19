<script setup lang="ts">
   import { Inventory } from '@/components/_index';
</script>

<template>
   <div class="page-activity">
      <Inventory />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/index' as *;
   .page-activity {
      @include grid;
   }
</style>
