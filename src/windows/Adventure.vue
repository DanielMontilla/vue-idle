<script setup lang="ts">
   import { useSlots } from '@/services/_index';
   import { onMounted, ref } from 'vue';
   import Slot from '../components/slot/Slot.vue';

   const { createRandoms } = useSlots();
   const slots = createRandoms(150, 'none');
</script>

<template>
   <div class="adventure-ctn">
      <Slot v-for="slot in slots" :slot="slot" :debug="false" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventure-ctn {
      @include window-default($adventure-background);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
   }
</style>
