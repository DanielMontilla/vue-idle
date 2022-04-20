<script setup lang="ts">
   import type { PlayerData } from '@/types';
   import { VIEWPORT_SIZE, INVENTORY } from '@/CONST';
   import { Label, Shop, Training } from '@/windows/_index';
   import { useSlots, useLabels, usePlayer } from '@/services/_index';
   import { computed, inject, provide, ref } from 'vue';
   import { Hero } from '@/classes/_index';
   import { STARTING_LABELS } from '@/data';
   import Activities from './windows/Activities.vue';

   // Global State
   const slots = useSlots();
   const { labels, getActive, isActive, setActive } = useLabels(1, STARTING_LABELS);
   const player = usePlayer();

   provide(INVENTORY, [
      slots.add('inventory', Hero.random()),
      ...slots.addRandoms(9 * 6 - 1, 'inventory'),
   ]);
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
            <div class="window-area" :style="{ backgroundColor: getActive().color }">
               <Training v-show="isActive('training')" />
               <Shop v-show="isActive('shop')" />
               <Activities v-show="isActive('activities')" />
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
         gap: $s-2;
         align-items: center;
         height: 100%;
         .gold-icon {
            @include square($s-8);
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
