<script setup lang="ts">
   import Inventory from '../components/Inventory.vue';
   interface TrainingProps {
      show: boolean;
   }

   const { show } = defineProps<TrainingProps>();
</script>

<template>
   <div class="training-ctn" :class="{ hide: !show }">
      <Inventory />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .training-ctn {
      @include window-default;
   }
</style>
