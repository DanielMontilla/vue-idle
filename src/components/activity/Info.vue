<script setup lang="ts">
   import { mapValue } from '@/utilities';
   import { computed } from '@vue/reactivity';

   // interface InfoProps {

   // }
   // let { current, total } = defineProps<InfoProps>();
</script>

<template>
   <div class="info">i</div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .info {
      @include square(20px);
      @include flex-center;

      font-family: 'Times New Roman', Times, serif;
      font-style: italic;
      line-height: 0;

      background-color: hsla(0, 0%, 0%, 0.5);
      border-radius: 999px;
   }
</style>
