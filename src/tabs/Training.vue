<script setup lang="ts">
   import { PLAYER } from '@/CONST';
   import type { PlayerData, PlayerRef } from '@/types';
   import { inject } from 'vue';
   import Inventory from '../components/Inventory.vue';
   import TrainingStation from '../components/TrainingStation.vue';
   interface TrainingProps {
      show: boolean;
   }

   let player = inject(PLAYER) as PlayerRef;
   const { show } = defineProps<TrainingProps>();
</script>

<template>
   <div class="training-ctn" :class="{ hide: !show }">
      <div class="inventory-area">
         <Inventory />
      </div>
      <div class="stations-area">
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
         <TrainingStation />
      </div>
      <div class="other-area"></div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .training-ctn {
      @include page-default;
      display: grid;
      grid-template-columns: $inv-width auto;
      grid-template-rows: auto $inv-height;
      grid-template-areas:
         'station station'
         'inv     other';

      .inventory-area {
         grid-area: inv;
      }

      .stations-area {
         grid-area: station;
         display: flex;
         flex-direction: row;
         flex-wrap: wrap;
      }

      .other-area {
         grid-area: other;
      }
   }
</style>
