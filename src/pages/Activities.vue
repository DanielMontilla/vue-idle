<script setup lang="ts">
   import usePages from '@/services/Pages';

   const { register, current } = usePages();
   const index = register();
</script>

<template>
   <div v-show="index === current" class="activities"></div>
</template>

<style scoped lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;

   .activities {
      @include window-default($activity-background);
   }
</style>
