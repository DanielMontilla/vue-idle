<script setup lang="ts">
   import usePages from '@/services/Pages';

   interface TabProps {
      name: string;
      page: number;
      color: string;
   }

   const { set } = usePages();
   const { name, page } = defineProps<TabProps>();
</script>

<template>
   <div @click="set(page)" class="tab" :style="{ backgroundColor: color }">
      {{ name }}
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .tab {
      line-height: 1;
      font-weight: 600;
      padding: 6px 8px;
   }
</style>
