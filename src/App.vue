<script setup lang="ts">
   import { Store, Activities, Adventures } from '@/pages/_index';
   import { appStyle, contentStyle, PAGES } from '@/CONST';
   import { tabs } from '@/data';
   import { Tab, Wallet } from '@/components/_index';
   import { useInventory, useFs } from '@/services/_index';
   import { onMounted } from 'vue';
   import { Hero } from '@/classes/_index';

   const { addEmpties, addRandoms, get, add, insert } = useInventory();
   const { load, save } = useFs();

   onMounted(() => {
      /* 🚀 Booting Global game state */
      addEmpties(9 * 6);
   });
</script>

<template>
   <div class="app" :style="appStyle">
      <div class="app-bar" :style="{ display: 'flex', gap: '5px' }">
         <div @click="save" :style="{ backgroundColor: `blue`, padding: `0px 2px` }">
            SAVE
         </div>
         <div @click="load" :style="{ backgroundColor: `red`, padding: `0px 2px` }">
            LOAD
         </div>
         <div
            @click="insert(Hero.Random())"
            :style="{ backgroundColor: `green`, padding: `0px 2px` }"
         >
            ADD
         </div>
      </div>
      <div class="content-area" :style="contentStyle">
         <div class="wallet-area">
            <Wallet />
         </div>
         <div class="tab-area">
            <Tab
               v-for="(page, i) in PAGES"
               :name="page"
               :page="i"
               :color="tabs[page]"
               class="tab"
            />
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
      flex-direction: column;

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

            .tab {
               &:first-child {
                  border-radius: $window-rad 0 0 0;
               }

               &:last-child {
                  border-radius: 0 $window-rad 0 0;
               }
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
