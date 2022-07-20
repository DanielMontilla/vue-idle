<script setup lang="ts">
   import {
      SOCKET_SIZE,
      BAR_HEIGHT,
      TAB_HEIGHT,
      INV_COLS,
      INV_ROWS,
      DEF_WINDOW_SIZE,
   } from '#/CONST';

   import { Shop, Activity } from '@/pages/_index';
   import { useInit, usePlayer, useTauri } from '@/services/_index';
   import { ref, shallowRef } from 'vue';

   /* 🔧 services */
   const { appInit } = useInit();
   const { wallet } = usePlayer();
   const { quit, minimize, expand } = useTauri();

   /* 🏁 initialization  */
   appInit();

   /* 🔗 reactive values */
   const pageIndex = ref(0);
   const pages = shallowRef<{ component: typeof Shop; label: string }[]>([
      { component: Shop, label: 'shop' },
      { component: Activity, label: 'activity' },
   ]);

   /* 📅 event handlers */
   const onQuit = quit;
   const onMinimize = minimize;
   const onExpand = expand;
   const changePage = (i: number) => (pageIndex.value = i);

   /** Initilizing global style 💅 variables */
   const styleVars = {
      '--window-height': `${DEF_WINDOW_SIZE.HEIGHT}px`,
      '--window-width': `${DEF_WINDOW_SIZE.WIDTH}px`,
      '--bar-height': `${BAR_HEIGHT}px`,
      '--tab-height': `${TAB_HEIGHT}px`,
      '--s-socket': `${SOCKET_SIZE}px`,
      '--inv-rows': `${INV_ROWS}`,
      '--inv-cols': `${INV_COLS}`,
   };
</script>

<template>
   <main :style="styleVars">
      <div data-tauri-drag-region class="app-bar">
         <div class="app-actions">
            <div class="bar-btn expand" @click="onExpand" />
            <div class="bar-btn minimize" @click="onMinimize" />
            <div class="bar-btn quit" @click="onQuit" />
         </div>
         <div class="player-wallet">
            <div
               class="currency-card"
               v-for="(amount, currency) in wallet"
               v-text="`${currency}: ${amount}`"
            />
         </div>
      </div>
      <div class="tabs">
         <div
            class="tab"
            v-for="(page, i) in pages"
            v-text="page.label"
            :style="{
               backgroundColor: pageIndex === i ? 'var(--c-bg-light)' : 'var(--c-bg)',
            }"
            @click="changePage(i)"
         />
      </div>
      <component
         class="page"
         v-for="(page, i) in pages"
         v-show="pageIndex === i"
         :is="page.component"
      />
   </main>
</template>

<style lang="scss">
   @use '@/styles/index' as *;
   @use '@/styles/base' as *;
   @use '@/styles/reset' as *;

   #app {
      @include grid;
      @include no-interact;
      height: 100vh;
      width: 100vw;
      background-color: var(--c-bg-darker);
   }

   main {
      overflow: hidden;
      @include size(var(--window-width), var(--window-height));
      background-color: var(--c-bg);
      border-radius: var(--s-sm);
      box-shadow: 0 0 48px rgba(0, 0, 0, 0.8);

      @include grid-area(
         1fr,
         var(--bar-height) var(--tab-height) auto,
         'app-bar' 'tabs' 'page'
      );
   }

   .app-bar {
      grid-area: app-bar;
      justify-self: end;
      background-color: var(--c-bg-dark);
      @include fill;
      @include grid-area(1fr 1fr, 1fr, 'player-wallet app-actions');
      padding: 0 8px;

      .app-actions {
         grid-area: app-actions;
         justify-self: end;
         @include flex;
         gap: 8px;

         .bar-btn {
            @include square(16px);
            border-radius: 50%;
         }

         .quit {
            background-color: var(--c-error);
         }

         .minimize {
            background-color: var(--c-warning);
         }

         .expand {
            background-color: var(--c-neutral);
         }
      }

      .player-wallet {
         justify-self: start;
         .currency-card {
            // font-family: Syne Mono;
            font-size: var(--s-lg);
         }
      }
   }

   .tabs {
      grid-area: tabs;
      justify-self: start;
      @include flex;
      @include fill;
      justify-content: start;
      background-color: var(--c-bg-dark);

      .tab {
         @include flex;
         font-size: var(--s-lg);
         height: 100%;
         padding: 0 var(--s-sm);

         --rad: var(--s-sx);

         &:last-child {
            border-top-right-radius: var(--rad);
         }
      }
   }

   .page {
      grid-area: page;
      @include fill;
      padding: var(--s-sx);
      background-color: var(--c-bg-light);
   }

   * {
      // computed constant variables
      --inv-width: calc(var(--s-socket) * var(--inv-cols));
      --inv-height: calc(var(--s-socket) * var(--inv-rows));
   }
</style>
