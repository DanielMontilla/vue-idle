<script setup lang="ts">
   import Slot from './Slot.vue';
   // interface TrainingStationProps {}
   // const {} = defineProps<TrainingStationProps>();

   let hi = () => console.log('hi');
   let bye = () => console.log('bye');
</script>

<template>
   <div class="training-station-ctn">
      <Slot data="training" :onEnter="hi" :onLeave="bye" />
      <div class="progress-bar"></div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;
   .training-station-ctn {
   }
</style>
