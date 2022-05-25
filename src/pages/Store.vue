<script setup lang="ts">
   import { useInterval, usePages } from '@/services/_index';
   import { Inventory, BarrackCard } from '@/components/_index';
   import { computed } from 'vue';

   const { register, current } = usePages();
   const { add } = useInterval();
   const index = register();

   const timer = add({ time: 1 * 60 * 60 * 1000 * 7, iterations: 'infinite' });

   const MS_IN_H = 1 * 60 * 60 * 1000;
   const MS_IN_M = 1 * 60 * 1000;
   const MS_IN_S = 1 * 1000;

   const formatedTime = computed(() => {
      let t = timer.remaining.value;

      let H = Math.floor(t / MS_IN_H).toString();
      let M = Math.floor((t % MS_IN_H) / MS_IN_M).toString();
      let S = Math.floor(((t % MS_IN_H) % MS_IN_M) / MS_IN_S).toString();

      const append0 = (n: string) => (n.length > 1 ? n : '0' + n);

      H = append0(H);
      M = append0(M);
      2;
      S = append0(S);
      return `${H} : ${M} : ${S}`;
   });
</script>

<template>
   <div v-show="index === current" class="store">
      <div class="upgrade-area"></div>
      <div class="barracks-area">
         <div class="refresh-time">
            {{ formatedTime }}
         </div>
         <div class="heros">
            <BarrackCard v-for="index in 3" />
         </div>
      </div>
      <div class="items-area"></div>
      <Inventory class="inventory-area" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .store {
      @include window-default($store-background);
      @include grid-align;

      grid-template-areas:
         'items barracks'
         'iventory upgrade';

      grid-template-columns: min-content auto;
      grid-template-rows: auto min-content;

      .upgrade-area {
         grid-area: upgrade;
      }
      .barracks-area {
         grid-area: barracks;
      }
      .items-area {
         grid-area: items;
      }
      .inventory-area {
         grid-area: iventory;
      }
   }
</style>
