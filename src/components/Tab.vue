<script setup lang="ts">
   interface TabProps {
      name: string;
   }

   const { name } = defineProps<TabProps>();
</script>

<template>
   <div class="tab">
      <div class="name"></div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;
</style>
