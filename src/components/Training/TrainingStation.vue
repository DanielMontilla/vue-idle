<script setup lang="ts">
   import { ref } from 'vue';
   import type { Hero, Item } from '@/classes/_index';
   import { useLoop } from '@/services/_index';
   import { TrainingProgressBar, Slot } from '@/components/_index';

   const hero = ref<Hero>();
   const loop = useLoop();

   let id: number;

   const enter = (newItem: Item) => {
      hero.value = newItem as Hero;
      id = loop.add((dt: number) => {
         hero.value?.addExp(dt * 50);
      });
   };
   const leave = () => {
      hero.value = undefined;
      loop.remove(id);
   };
</script>

<template>
   <div class="training-station-ctn">
      <Slot
         class="slot"
         data="training"
         :debug="false"
         :onEnter="enter"
         :onLeave="leave"
      />
      <div class="info-area">
         <img v-if="hero" :src="hero.getRaceIcon()" />
         <img v-else :src="`src/assets/icons/stop.svg`" />
         <div class="hero-name">
            <p v-if="hero">{{ hero.name }}</p>
            <p v-else>No Hero</p>
         </div>
         <div class="hero-level">
            <p v-if="hero">lv. {{ hero.level.level }}</p>
         </div>
      </div>
      <div class="progress-bar-area">
         <TrainingProgressBar v-if="hero" :progress="hero.progress" />
      </div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;
   .training-station-ctn {
      $ctn-padding: $s-1;
      $ctn-height: calc($slot-size + (2 * $s-1));
      $ctn-width: $slot-size * 5;
      $info-height: calc($ctn-height * 3 / 5 - $ctn-padding);
      $progress-height: calc($ctn-height * 2 / 5 - $ctn-padding);

      padding: $ctn-padding;
      display: grid;
      width: $ctn-width;
      height: $ctn-height;
      background-color: gray;
      grid-template-columns: $slot-size auto;
      grid-template-rows: $info-height $progress-height;
      grid-template-areas:
         'slot info'
         'slot bar';

      .slot {
         grid-area: slot;
      }
      .progress-bar-area {
         grid-area: bar;
         padding-left: $s-3;
         padding-right: $s-3;
         height: $progress-height;
      }
      .info-area {
         @include flex-label;
         gap: $s-3;
         padding-left: $s-3;
         grid-area: info;
         img {
            @include no-interact;
            $size: calc($info-height * 0.75);
            height: $size;
            width: $size;
         }
         p {
            display: inline;
         }
         .hero-name {
            font-size: calc($info-height * 0.75);
            font-weight: bold;
         }
         .hero-level {
         }
      }
   }
</style>
