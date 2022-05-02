<script setup lang="ts">
   import usePages from '@/services/Pages';

   const { register, current } = usePages();
   const index = register();
</script>

<template>
   <div v-show="index === current" class="adventures"></div>
</template>

<style scoped lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;

   .adventures {
      @include window-default($adventure-background);
   }
</style>
