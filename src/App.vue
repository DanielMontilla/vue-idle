<script setup lang="ts">
   import { VIEWPORT_SIZE } from '@/CONST';
   import { Label, Shop, Adventure } from '@/windows/_index';
   import { useLabels, usePlayer } from '@/services/_index';
   import { onMounted } from 'vue';
   import { STARTING_LABELS } from '@/data';
   import Activities from './windows/Activities.vue';
   import useInventory from './services/Inventory';

   // Global State
   const { labels, getActive, isActive, setActive } = useLabels(2, STARTING_LABELS);
   const { player } = usePlayer();
   const inventory = useInventory();

   onMounted(() => {
      inventory.addEmpties(9);
   });
</script>

<template>
   <main>
      <div class="temp-border">
         <div class="wallet-area">
            <div class="gold-area">
               <img class="gold-icon" src="src/assets/icons/gold.svg" />
               <div class="gold-text">
                  {{ player.wallet.gold }}
               </div>
            </div>
         </div>
         <div
            class="window"
            :style="{
               height: `${VIEWPORT_SIZE.HEIGHT}px`,
               width: `${VIEWPORT_SIZE.WIDTH}px`,
               maxHeight: `${VIEWPORT_SIZE.HEIGHT}px`,
               maxWidth: `${VIEWPORT_SIZE.WIDTH}px`,
            }"
         >
            <div class="label-area">
               <Label
                  v-for="label in labels"
                  :label="label"
                  :active="isActive(label)"
                  @click="setActive(label)"
               />
            </div>
            <div
               class="window-area"
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
   </main>
</template>

<style lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;

   main {
      @include flex-center;
      height: 100vh;
      width: 100vw;
   }

   .temp-border {
      box-sizing: content-box;
      border-style: solid;
      border-width: $s-2;
      border-radius: $s-0;
      border-color: $text-default;
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

   .window {
      z-index: 0;
      background-color: $background;
      display: grid;
      grid-template-rows: $s-9 auto;
   }

   .label-area {
      display: flex;
      align-items: end;
      justify-content: start;
      background-color: $background;
   }

   .window-area {
      @include flex-center;
      width: 100%;
      height: 100%;
      border-top-right-radius: $s-3;
   }
</style>
