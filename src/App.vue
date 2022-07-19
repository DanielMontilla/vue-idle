<script setup lang="ts">
   import { WINDOW_SIZE } from '#/settings';
   import { SOCKET_SIZE, BAR_HEIGHT, TAB_HEIGHT, INV_COLS, INV_ROWS } from '#/CONST';

   import { Shop, Activity } from '@/pages/_index';
   import { useInventory } from '@/services/_index';
   import { onMounted, ref, shallowRef } from 'vue';
   import { Item } from '@/classes/_index';

   /* 🔧 services */
   const { addEmpty, insert } = useInventory();

   /* 🔗 reactive values */
   const pages = shallowRef<{ component: typeof Shop; label: string }[]>([
      { component: Shop, label: 'shop' },
      { component: Activity, label: 'activity' },
   ]);
   const pageIndex = ref(0);

   /* 🏁 initialization  */
   onMounted(() => {
      addEmpty(INV_COLS * 2);
      insert(
         Item.fromData({ type: 'hero', id: 1, quantity: 10, itemData: { name: 'x' } })
      );
   });

   /* 📅 event handlers */
   const onQuit = () => {};
   const onMinimize = () => {};
   const onExpand = () => {};

   const changePage = (i: number) => (pageIndex.value = i);

   /** Initilizing global style 💅 variables */
   const styleVars = {
      '--window-height': `${WINDOW_SIZE.HEIGHT}px`,
      '--window-width': `${WINDOW_SIZE.WIDTH}px`,
      '--bar-height': `${BAR_HEIGHT}px`,
      '--tab-height': `${TAB_HEIGHT}px`,
      '--s-socket': `${SOCKET_SIZE}px`,
      '--inv-rows': `${INV_ROWS}`,
      '--inv-cols': `${INV_COLS}`,
   };
</script>

<template>
   <main :style="styleVars">
      <div class="bar">
         <div class="bar-btn expand" @click="onExpand" />
         <div class="bar-btn minimize" @click="onMinimize" />
         <div class="bar-btn quit" @click="onQuit" />
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
   @use '@/styles/base' as *;
   @use '@/styles/index' as *;
   @use '@/styles/reset' as *;

   #app {
      @include grid;
      @include no-interact;
      overflow: hidden;

      background-color: var(--c-bg-darker);

      height: 100vh;
      width: 100vw;
   }

   main {
      overflow: hidden;
      @include size(var(--window-width), var(--window-height));
      background-color: var(--c-bg);
      border-radius: var(--s-sm);

      @include grid-area(
         1fr,
         var(--bar-height) var(--tab-height) auto,
         'bar' 'tabs' 'page'
      );

      box-shadow: 0 0 48px rgba(0, 0, 0, 0.8);
   }

   .bar {
      grid-area: bar;
      justify-self: end;
      @include flex;
      @include fill;
      justify-content: end;
      padding: 0 8px;
      gap: 8px;

      background-color: var(--c-bg-dark);

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
