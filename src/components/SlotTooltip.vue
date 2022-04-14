<script setup lang="ts">
   import type { ItemRef } from '@/types';

   interface SlotTooltipProps {
      item: ItemRef;
   }
   const { item } = defineProps<SlotTooltipProps>();
</script>

<template>
   <div class="slot-tooltip-ctn">
      <div></div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .slot-tooltip-ctn {
   }
</style>
