<script setup lang="ts">
   import { Slot, Inventory, ActivityStation } from '@/components/_index';
   import { ACTIVITY_ARR } from '@/CONST';
   import { Hero } from '@/classes/_index';
   import { useSlots } from '@/services/_index';

   let slots = useSlots();
</script>

<template>
   <div class="activities-ctn">
      <div class="inventory">
         <Inventory />
      </div>
      <div class="activities">
         <ActivityStation v-for="activity in ACTIVITY_ARR" :activity="activity" />
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .activities-ctn {
      @include window-default($activity-background);
      display: grid;
      grid-template-areas: 'inventory activities';
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;

      .inventory {
         grid-area: inventory;
         @include flex-center;
      }

      .activities {
         grid-area: activities;
         @include flex-center;
         flex-direction: column;
      }
   }
</style>
