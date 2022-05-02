<script setup lang="ts">
   import { Store, Activities, Adventures } from '@/pages/_index';
   import { appStyle, contentStyle } from '@/CONST';
</script>

<template>
   <div class="app" :style="appStyle">
      <div class="app-bar"></div>
      <div class="content" :style="contentStyle">
         <div class="wallet"></div>
         <div class="tabs"></div>
         <div class="page">
            <Store />
            <Activities />
            <Adventures />
         </div>
      </div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;

   .app {
      @include flex-end;

      min-width: 1280px;
      min-height: 900px;
      width: 1280px;
      height: 900px;
      // border: dashed rgba(255, 255, 255, 0.5) 1px;

      .content {
         .page {
            @include fill;
            font-size: $t-3xl;
         }
      }
   }
</style>
