<script setup lang="ts">
   import { ref } from 'vue';
   import { Socket } from '@/classes/_index';

   const socket = ref(new Socket(0));

   const onClick = () => {
      socket.value.n++;
   };
</script>

<template>
   <div class="socket">
      <div class="text">{{ socket.n }}</div>
      <div class="btn" @click="onClick"></div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/reset' as *;
   @use '@/styles/global' as *;

   .socket {
      @include flex-center;
      flex-direction: column;
      font-size: 5rem;
   }

   .btn {
      min-height: 50px;
      min-width: 100px;
      background-color: darkslateblue;
      border-radius: 8px;
   }
</style>
