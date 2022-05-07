<script setup lang="ts">
   import { useInterval } from '@/services/_index';

   const { getRef } = useInterval();
</script>

<template>
   <div class="quest-card"></div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .activity-station {
   }
</style>
