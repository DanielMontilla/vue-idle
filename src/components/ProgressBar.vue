<script setup lang="ts">
   interface ProgressBarProps {
      isGo: boolean;
   }
   let { isGo } = defineProps<ProgressBarProps>();
</script>

<template>
   <div class="progress-bar-ctn">
      <div class="off" :style="{ backgroundColor: '#a7f59d' }">
         <div
            class="on"
            :style="{
               backgroundColor: '#2f9e21',
               animation: isGo ? 'anim 10s linear infinite' : ''
            }"
         ></div>
      </div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   @keyframes anim {
      0% {
         width: 0%;
      }
      100% {
         width: 100%;
      }
   }

   .progress-bar-ctn {
      @include fill;
      display: flex;
      align-items: center;
      border-radius: $s-4;
      .off {
         height: 50%;
         width: 100%;
         border-radius: $s-4;
         .on {
            height: 100%;
            width: 0%;
            border-radius: $s-4;
         }
      }
   }
</style>
