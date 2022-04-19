<script setup lang="ts">
   import type { Label } from '@/classes/_index';

   interface LabelProps {
      label: Label;
      active: boolean;
   }

   const { label, active } = defineProps<LabelProps>();
</script>

<template>
   <div
      class="content"
      :class="{
         notActive: !active,
      }"
      :style="{
         backgroundColor: label.color,
      }"
   >
      {{ label.name }}
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .notActive {
      opacity: 65%;
   }
   .content {
      @include flex-center;

      z-index: 1;
      min-width: 80px;
      height: $s-6;
      padding: 0 $s-2;
      border-radius: $s-2 $s-2 0 0;
      font-weight: 600;

      transition: opacity 0.25s;
   }
</style>
