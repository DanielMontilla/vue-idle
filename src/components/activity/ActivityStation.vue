<script setup lang="ts">
   import { ref } from 'vue';
   import { Hero, type Item } from '@/classes/_index';
   import { useLoop } from '@/services/_index';
   import { Slot } from '@/components/_index';
   import ProgressBar from '../ProgressBar.vue';
   import type { Activity } from '@/types';

   interface ActivityStationProps {
      activity: Activity;
   }

   const { activity } = defineProps<ActivityStationProps>();
   const hero = ref<Hero>();
   const progress = ref<number>(0);
   const loop = useLoop();

   const total = 100;
   let id: number = -1;

   const onEnter = (item: Item) => {
      if (!(item instanceof Hero)) return;
      hero.value = item;
      id = loop.add((dt: number) => {
         let rate = (hero.value as Hero).activityInfo[activity].rate * dt;
         (hero.value as Hero).addXP(rate, activity);

         let step = progress.value + rate;
         if (step >= total) {
            let r = step - total;
            progress.value = r;
            console.log(`${activity} completed!`);
         } else {
            progress.value += rate;
         }
      });
   };
   const onLeave = () => {
      loop.remove(id);
      hero.value = undefined;
   };
</script>

<template>
   <div class="contenti">
      <div class="click"></div>
      <Slot class="slot" data="activity" :onEnter="onEnter" :onLeave="onLeave" />
      <div class="info">
         <ProgressBar v-if="hero" :progress="progress" />
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .contenti {
      padding: $s-2;

      display: grid;
      grid-template-areas: 'click slot info';
      grid-template-columns: auto auto auto;
      grid-template-rows: auto;

      .click {
         grid-area: click;

         background-color: rgba($color: #0000004f, $alpha: 1);
      }
      .slot {
         grid-area: slot;
      }
      .info {
         grid-area: info;
         width: 300px;
         padding-left: $s-3;
         padding-right: $s-3;
      }
   }
</style>
