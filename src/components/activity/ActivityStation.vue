<script setup lang="ts">
   import { ref } from 'vue';
   import { Hero, type Item } from '@/classes/_index';
   import { useLoop } from '@/services/_index';
   import { Slot } from '@/components/_index';
   import type { Activity } from '@/types';
   import { getPath } from '@/utilities';
   import ProgressBar from './ProgressBar.vue';
   import Info from './Info.vue';
   import Menu from './Menu.vue';

   interface ActivityStationProps {
      activity: Activity;
   }

   const { activity } = defineProps<ActivityStationProps>();
   const hero = ref<Hero>();
   const total = 100;
   const current = ref<number>(0);

   const loop = useLoop();

   let id: number = -1;

   const addXP = (amount: number) => {
      let step = current.value + amount;
      if (step >= total) {
         let r = step - total;
         current.value = r;
      } else {
         current.value += amount;
      }
   };

   const onEnter = (item: Item) => {
      if (!(item instanceof Hero)) return;
      hero.value = item;
      id = loop.add((dt: number) => {
         let amount = (hero.value as Hero).activityInfo[activity].rate * dt;
         (hero.value as Hero).addXP(amount, activity);
         addXP(amount);
      });
   };
   const onLeave = () => {
      loop.remove(id);
      hero.value = undefined;
   };

   const onClick = () => {
      if (hero.value) {
         addXP(3);
         hero.value.addXP(3, activity);
      }
   };
</script>

<template>
   <div class="station">
      <img class="icon-area" :src="getPath(`activities/${activity}`)" @click="onClick" />
      <Slot class="slot-area" slot="activity" :onEnter="onEnter" :onLeave="onLeave" />
      <div class="data-area">
         <div class="info-area">INFO</div>
         <div class="progress-area">
            <ProgressBar :total="total" :current="current" />
         </div>
         <div class="menu-area">
            <Menu />
         </div>
         <div class="extra-area">
            <Info />
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .station {
      $stroke-width: 2px;
      $stroke-color: hsla(0, 0%, 10%, 1);
      $padding: 6px;
      $background-color: hsla(0, 0%, 30%, 1);

      padding: calc($stroke-width + $padding);
      border: solid $stroke-color $stroke-width;
      // border-radius: 4px;
      background: $background-color;

      display: grid;
      gap: $padding;
      align-items: center;
      grid-template-areas: 'icon slot data';
      grid-template-columns: auto auto auto;
      grid-template-rows: auto;

      .icon-area {
         grid-area: icon;
         @include square($slot-size);
      }
      .slot-area {
         grid-area: slot;
      }
      .data-area {
         grid-area: data;
         height: 100%;

         display: grid;
         gap: $padding;
         grid-template-areas: 'info menu' 'progress extra';
         grid-template-columns: auto auto;
         grid-template-rows: auto auto;

         .info-area {
            grid-area: info;
         }

         .progress-area {
            grid-area: progress;
            align-self: end;
            height: 20px;
            width: 192px;
         }

         .menu-area {
            grid-area: menu;
         }

         .extra-area {
            grid-area: extra;
            align-self: end;
            height: 20px;
            width: 20px;
         }
      }
   }
</style>
