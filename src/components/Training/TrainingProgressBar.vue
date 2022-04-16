<script setup lang="ts">
   interface ProgressBarProps {
      progress: number;
   }

   let { progress } = defineProps<ProgressBarProps>();
</script>

<template>
   <div class="training-progress-bar-ctn">
      <div class="off" :style="{ backgroundColor: '#a7f59d' }">
         <div
            class="on"
            :style="{
               backgroundColor: '#2f9e21',
               width: `${progress}%`
            }"
         ></div>
      </div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .training-progress-bar-ctn {
      @include fill;
      display: flex;
      align-items: center;
      border-radius: $s-4;
      .off {
         height: 50%;
         width: 100%;
         border-radius: $s-4;
         overflow: hidden;
         .on {
            height: 100%;
            border-radius: $s-4;
         }
      }
   }
</style>
