<script setup lang="ts">
   import { useInterval } from '@/services/_index';

   const { get } = useInterval();
</script>

<template>
   <div class="activity-station"></div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .activity-station {
   }
</style>
