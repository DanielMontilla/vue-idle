<script setup lang="ts">
   import { Slot } from '@/components/_index';
   import type { QuestRef } from '@/types';

   interface QuestCardProps {
      quest: QuestRef;
   }

   const { quest } = defineProps<QuestCardProps>();

   const onEnter = () => {};
</script>

<template>
   <div class="quest-content">
      <div class="hero">
         <Slot class="slot" slot="quest" />
         <div class="resources">
            <div class="health resource"></div>
            <div class="stamina resource"></div>
            <div class="mana resource"></div>
         </div>
      </div>
      <div class="zone">
         <div class="name"></div>
         <div class="controls">
            <div class="pause control-btn"></div>
            <div class="play control-btn"></div>
            <div class="foward control-btn"></div>
            <div class="return control-btn"></div>
         </div>
      </div>
      <div class="details">
         <div class="time"></div>
         <div class="distance"></div>
      </div>
      <div class="inventory"></div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .quest-content {
      @include grid-align;
      width: 100%;
      padding: 6px;
      grid-template-areas:
         'hero zone details'
         'inventory inventory inventory';
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(2, auto);

      .details {
         grid-area: details;
         @include grid-align;
         justify-items: end;
         grid-template-columns: repeat(1, auto);
         grid-template-columns: repeat(2, 1fr);
      }

      .hero {
         grid-area: hero;
         @include grid-align;
         grid-template-areas: 'slot resources';
         grid-template-columns: repeat(2, auto);
         grid-template-rows: repeat(1, auto);

         .slot {
            grid-area: slot;
         }
         .resources {
            grid-area: resources;
            width: calc(64px + 32px);
            height: 64px;
            @include grid-align;
            grid-template-areas:
               'health'
               'stamina'
               'mana';
            grid-template-columns: repeat(1, auto);
            grid-template-rows: repeat(3, 1fr);
            .resource {
            }
         }
      }

      .zone {
         grid-area: zone;
         @include grid-align;
         grid-template-areas:
            'name'
            'controls';
         grid-template-columns: repeat(1, auto);
         grid-template-rows: 2fr 1fr;
         .name {
            grid-area: name;
         }
         .controls {
            grid-area: controls;
            .control-btn {
               &:last-child {
               }
               &:first-child {
               }
            }
         }
      }
   }
</style>
