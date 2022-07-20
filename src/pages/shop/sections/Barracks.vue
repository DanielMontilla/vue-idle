<script setup lang="ts">
   import { Interval } from '@/classes/_index';
   import { useSave } from '@/services/_index';
   import { wholeDivide, getPath } from '#/utilities';
   import { DURATION } from '#/CONST';
   import { computed } from 'vue';

   /* 🔧 services */
   const {
      save: {
         shop: { barracks },
      },
   } = useSave();

   /* 🔗 reactive values */
   const { remaining } = new Interval({ time: DURATION['1d'] + DURATION['10s'] });

   /* 💬 computed & parsed values  */
   const timer = computed(() => {
      let ms = remaining.value;

      let [d, rh] = wholeDivide(ms, DURATION['1d']);
      let [h, rm] = wholeDivide(rh, DURATION['1h']);
      let [m, rs] = wholeDivide(rm, DURATION['1m']);
      let [s] = wholeDivide(rs, DURATION['1s']);

      let res: string[] = [];

      if (d) res.push(`${d}d`);
      if (res.length || h) res.push(`${h}h`);
      if (res.length || m) res.push(`${m}m`);
      res.push(`${s}s`);

      return res.join(' ');
   });

   /* 🔧 utility functions */
   const refresh = () => {
      console.log('hi');
   };

   /* 📅 event handlers */
   const refreshNow = () => {
      refresh();
   };
</script>

<template>
   <div class="barracks">
      <div class="refresh-timer">
         <div class="timer-text">
            {{ timer }}
         </div>
         <div class="refresh-button" @click="refreshNow">
            <img :src="getPath('icons/refresh')" />
         </div>
      </div>
      <div class="hero-list"></div>
      <div class="add-slot"></div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/index' as *;

   .barracks {
      @include fill;
      @include grid-area(auto, auto auto auto, 'refresh-timer' 'hero-list' 'add-slot');
   }

   .refresh-timer {
      grid-area: refresh-timer;

      @include flex;
      gap: var(--s-md);
      .timer-text {
         font-family: Syne Mono;
      }
      .refresh-button {
         @include square(var(--s-base));
         img {
            @include fill;
            filter: var(--f-primary);
         }
      }
   }
</style>
