<script setup lang="ts">
   interface ProgressBarProps {
      progress: number;
   }

   let { progress } = defineProps<ProgressBarProps>();
</script>

<template>
   <div class="content">
      <div class="bar-off" :style="{ backgroundColor: '#a7f59d' }">
         <div
            class="bar-on"
            :style="{
               backgroundColor: '#2f9e21',
               width: `${progress}%`,
            }"
         ></div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .content {
      @include fill;
      display: flex;
      align-items: center;
      border-radius: $s-4;
      .bar-off {
         height: 50%;
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
