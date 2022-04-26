<script setup lang="ts">
   import { APP_SIZE, APP_PADDING, CONTENT_SIZE } from '@/CONST';
   import { Label, Shop, Adventure } from '@/windows/_index';
   import { useLabels, usePlayer } from '@/services/_index';
   import { onMounted, type StyleValue } from 'vue';
   import { STARTING_LABELS } from '@/data';
   import Activities from './windows/Activities.vue';
   import useInventory from './services/Inventory';

   // App Initialization
   const appStyle: StyleValue = {
      height: `${APP_SIZE.HEIGHT}px`,
      width: `${APP_SIZE.WIDTH}px`,
      maxHeight: `${APP_SIZE.HEIGHT}px`,
      maxWidth: `${APP_SIZE.WIDTH}px`,
      padding: `${APP_PADDING}px`,
   };

   const contentStyle: StyleValue = {
      height: `${CONTENT_SIZE.HEIGHT}px`,
      width: `${CONTENT_SIZE.WIDTH}px`,
      maxHeight: `${CONTENT_SIZE.HEIGHT}px`,
      maxWidth: `${CONTENT_SIZE.WIDTH}px`,
   };

   // Global State
   const { labels, getActive, isActive, setActive } = useLabels(2, STARTING_LABELS);
   const { player } = usePlayer();
   const inventory = useInventory();

   const close = () => {
      window.close();
   };

   onMounted(() => {
      inventory.addEmpties(9);
   });
</script>

<template>
   <div class="app" :style="appStyle">
      <div class="app-bar">
         <div class="close" @click="close">x</div>
      </div>
      <div class="content" :style="contentStyle">
         <div class="wallet-area">
            <div class="gold-area">
               <img class="gold-icon" src="src/assets/icons/gold.svg" />
               <div class="gold-text">
                  {{ player.wallet.gold }}
               </div>
            </div>
         </div>
         <div class="label-area">
            <Label
               v-for="label in labels"
               :label="label"
               :active="isActive(label)"
               @click="setActive(label)"
            />
         </div>
         <div
            class="window"
            :style="{
               backgroundColor: getActive().color,
            }"
         >
            <Shop v-show="isActive('shop')" />
            <Activities v-show="isActive('activities')" />
            <Adventure v-show="isActive('adventure')" />
         </div>
      </div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;

   .app {
      @include flex-center;
      align-items: end;
   }

   .wallet-area {
      z-index: 1;
      position: absolute;
      height: $s-9;
      right: $s-2;
      top: $s-0;
      .gold-area {
         display: inline-flex;
         gap: 6px;
         align-items: center;
         height: 100%;
         img {
            @include square(28px);
         }
         .gold-text {
            font-size: $s-6;
         }
      }
   }

   .content {
      z-index: 0;
      display: grid;
      background-color: $background;
      grid-template-rows: $s-9 auto;
   }

   .label-area {
      display: flex;
      align-items: end;
      justify-content: start;
      background-color: $background;
   }

   .window {
      @include flex-center;
      width: 100%;
      height: 100%;
      @include page-radius;
   }
</style>
