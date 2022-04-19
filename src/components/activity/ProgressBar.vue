<script setup lang="ts">
   import { mapValue } from '@/utilities';
   import { computed, toRef } from '@vue/reactivity';

   interface ProgressBarProps {
      current: number;
      total: number;
   }

   const props = defineProps<ProgressBarProps>();
   const current = toRef(props, 'current');
   const total = toRef(props, 'total');

   const progress = computed(() => mapValue([0, total.value], [0, 100], current.value));
</script>

<template>
   <div class="progress-bar">
      <div class="bar-off" :style="{ backgroundColor: 'hsla(0, 0%, 45%, 1)' }">
         <div
            class="bar-on"
            :style="{
               backgroundColor: 'hsla(0, 0%, 10%, 1)',
               width: `${progress}%`,
            }"
         ></div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .progress-bar {
      @include fill;
      display: flex;
      align-items: center;
      border-radius: $s-4;
      .bar-off {
         height: 100%;
         width: 100%;
         border-radius: $s-4;
         overflow: hidden;
         .bar-on {
            height: 100%;
            border-radius: $s-4;
         }
      }
   }
</style>
