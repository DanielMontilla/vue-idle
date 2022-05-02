<script setup lang="ts">
   import { Store, Activities, Adventures } from '@/pages/_index';
   import { appStyle, contentStyle, PAGES } from '@/CONST';
   import { tabs } from '@/data';
   import { Tab } from '@/components/_index';
   import useInventory from './services/Inventory';
   import { onMounted } from 'vue';

   const { addEmpties } = useInventory();

   onMounted(() => {
      addEmpties(9 * 6);
   });
</script>

<template>
   <div class="app" :style="appStyle">
      <div class="app-bar"></div>
      <div class="content" :style="contentStyle">
         <div class="wallet"></div>
         <div class="tabs">
            <Tab v-for="(page, i) in PAGES" :name="page" :page="i" :color="tabs[page]" />
         </div>
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
      @include flex(end, center);

      min-width: 1280px;
      min-height: 900px;
      width: 1280px;
      height: 900px;
      .content {
         @include flex(start, center);

         flex-direction: column;
         .tabs {
            @include flex(start, center);

            &:first-child {
               border-radius: $window-rad 0 0 0;
            }

            &:last-child {
               $window-rad: 0 $window-rad 0 0;
            }
         }
         .page {
            @include fill;
            font-size: $t-3xl;
         }
      }
   }
</style>
