<script setup lang="ts">
   import { usePages, useAudio } from '@/services/_index';

   interface TabProps {
      name: string;
      page: number;
      color: string;
   }

   const { set } = usePages();
   const { play } = useAudio();
   const { name, page } = defineProps<TabProps>();
</script>

<template>
   <div
      @click="[set(page), play('paperflip_1')]"
      class="tab"
      :style="{ backgroundColor: color }"
   >
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
