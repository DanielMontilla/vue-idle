<script setup lang="ts">
   import useInterval from '@/services/Interval';

   const { add, toggle } = useInterval();
   const interval = add({
      time: 5,
      callback: () => console.log('hi'),
      onComplete: () => console.log('completed'),
      iterations: 10,
   });
</script>

<template>
   <div class="adventure-ctn">
      <div class="time">time: {{ interval.seconds(2) }}</div>
      <div class="iterations">iterations: {{ interval.iterationsRemaining }}</div>
      <div class="pause" @click="toggle(interval)" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventure-ctn {
      @include window-default($adventure-background);
      display: flex;
      flex-direction: column;
      .time {
         font-size: 80px;
         font-weight: bold;
      }
      .iterations {
         font-size: 60px;
         font-weight: normal;
      }

      .pause {
         @include square(30px);
         border-radius: 999px;
         background-color: rgb(25, 218, 41);
      }
   }
</style>
