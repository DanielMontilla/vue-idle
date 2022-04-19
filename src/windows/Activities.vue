<script setup lang="ts">
   import { Slot, Inventory } from '@/components/_index';
   import { Hero } from '@/classes/_index';
   import { useSlots } from '@/services/_index';
   import ActivityStation from '../components/activity/ActivityStation.vue';

   let slots = useSlots();
</script>

<template>
   <div class="content">
      <div class="inventory">
         <Slot :data="slots.add('inventory', Hero.random())" />
      </div>
      <div class="activities">
         <ActivityStation activity="fishing" />
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .content {
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
