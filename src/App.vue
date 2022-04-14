<script setup lang="ts">
   import { provide, ref, type Ref } from 'vue';
   import type { PlayerData, Tab } from '@/types';
   import { WINDOW_SIZE, INVENTORY, PLAYER } from '@/CONST';
   import Label from './tabs/Label.vue';
   import Training from './tabs/Training.vue';
   import Shop from './tabs/Shop.vue';
   import useSlots from './classes/SlotManager';

   // Global State
   const slots = useSlots();
   const player = ref<PlayerData>({ wallet: { diamond: 0, gold: 10 } });

   provide(INVENTORY, [
      slots.add('inventory', { id: 1, quantity: 1 }),
      ...slots.addEmpties(9 * 6 - 1, 'inventory')
   ]);
   provide(PLAYER, player);

   let currentTab = ref<number>(0);

   const switchTab = (to: number): void => {
      currentTab.value = to;
   };
   const isCurrent = (component: string) => tabs.value[currentTab.value].label.title === component;
   // Starting tabs
   let tabs = ref<Tab[]>([
      {
         label: {
            title: 'training',
            onColor: 'hsl(219, 18%, 45%)',
            offColor: 'hsl(219, 35%, 40%)'
         }
      },
      {
         label: {
            title: 'shop',
            onColor: 'hsl(250, 18%, 40%)',
            offColor: 'hsl(325, 35%, 25%)'
         }
      }
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
               height: `${WINDOW_SIZE.HEIGHT}px`,
               width: `${WINDOW_SIZE.WIDTH}px`,
               maxHeight: `${WINDOW_SIZE.HEIGHT}px`,
               maxWidth: `${WINDOW_SIZE.WIDTH}px`
            }"
         >
            <div class="tab-label-area">
               <Label
                  v-for="({ label }, i) in tabs"
                  :title="label.title"
                  :active="currentTab === i"
                  :onColor="label.onColor"
                  :offColor="label.offColor"
                  :callback="() => switchTab(i)"
               />
            </div>
            <div class="tab-page-area" :style="{ backgroundColor: tabs[currentTab].label.onColor }">
               <Training :show="isCurrent('training')" />
               <Shop :show="isCurrent('shop')" />
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
      border-color: $white-soft;
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

   .tab-label-area {
      display: flex;
      align-items: end;
      background-color: $background;
   }

   .tab-page-area {
      @include flex-center;
      width: 100%;
      height: 100%;
      border-top-right-radius: $s-3;
   }
</style>
