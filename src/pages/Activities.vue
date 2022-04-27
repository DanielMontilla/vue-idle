<script setup lang="ts">
   import { Slot, Inventory } from '@/components/_index';
   import { Hero } from '@/classes/_index';
   import { useSlots } from '@/services/_index';
   import ActivityStation from '../components/activity/ActivityStation.vue';

   let slots = useSlots();
</script>

<template>
   <div class="activities-ctn">
      <div class="inventory">
         <Inventory />
      </div>
      <div class="activities">
         <ActivityStation activity="fishing" />
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
         @include flex-center;
         grid-area: inventory;
      }

      .activities {
         @include flex-center;
         grid-area: activities;
      }
   }
</style>
