<script setup lang="ts">
   import type { PlayerData, PlayerRef } from '@/types';
   import { Inventory, TrainingStation } from '@/components/_index';
   import { inject } from 'vue';
   import { usePlayer } from '@/services/_index';

   // interface TrainingProps {
   //    show: boolean;
   // }
   // const { show } = defineProps<TrainingProps>();

   let player = usePlayer();
</script>

<template>
   <div class="training-ctn">
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
      @include window-default();
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
