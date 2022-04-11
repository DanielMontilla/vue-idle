<script setup lang="ts">
   defineProps();
</script>

<template>
   <div class="training-ctn">
      <!-- <div class="side-area">D</div>
      <div class="barracks-area">B</div>
      <div class="inventory-area">C</div> -->
   </div>
</template>

<style lang="sass">
   @import '../styles/sizes'
   .training-ctn
      width: 100%
      height: 100%
      padding: $s1

      display: grid
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr

   // .side-area
   //    grid-row: 0 / 1
   //    background-color: blue
   //    width: 100%
   //    height: 100%
   // .barracks-area
   //    grid-area: b
   //    background-color: red
   //    width: 100%
   //    height: 100%
   // .inventory-area
   //    grid-area: i
   //    background-color: yellow
   //    width: 100%
   //    height: 100%
</style>
11
