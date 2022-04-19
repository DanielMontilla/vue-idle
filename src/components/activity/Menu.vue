<script setup lang="ts"></script>

<template>
   <div class="menu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .menu {
      width: 16;
      height: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bar {
         width: 100%;
         height: 2px;

         background-color: hsla(0, 0%, 77%, 1);
         border-radius: 2px;
      }
   }
</style>
