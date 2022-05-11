<script setup lang="ts">
   import { Store, Activities, Adventures } from '@/pages/_index';
   import { appStyle, contentStyle, PAGES } from '@/CONST';
   import { tabs } from '@/data';
   import { Tab, Wallet } from '@/components/_index';
   import { useInventory, usePlayer } from '@/services/_index';
   import { onMounted } from 'vue';

   const { addEmpties, addRandoms, get } = useInventory();
   const { randomize, player } = usePlayer();

   onMounted(() => {
      /* 🚀 Booting Global app state */
      // TODO: Fetch player data from save file and set state
      randomize();
      addRandoms(9 * 6);
   });
</script>

<template>
   <div class="app" :style="appStyle">
      <div class="app-bar"></div>
      <div class="content-area" :style="contentStyle">
         <div class="wallet-area">
            <Wallet />
         </div>
         <div class="tab-area">
            <Tab v-for="(page, i) in PAGES" :name="page" :page="i" :color="tabs[page]" />
         </div>
         <div class="page-area">
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
      @include flex(center, end);

      min-width: 1280px;
      min-height: 900px;
      width: 1280px;
      height: 900px;
      .content-area {
         @include flex(end, start);

         flex-direction: column;
         .tab-area {
            @include flex(start, end);
            flex-wrap: wrap;
            min-height: $tab-height;

            &:first-child {
               border-radius: $window-rad 0 0 0;
            }

            &:last-child {
               $window-rad: 0 $window-rad 0 0;
            }
         }
         .page-area {
            @include fill;
            font-size: $t-3xl;
         }

         .wallet-area {
            @include flex(end, center);
            height: $tab-height;
            width: max-content;
            position: absolute;
            top: 0;
            right: 0;
         }
      }
   }
</style>
