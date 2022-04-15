<script setup lang="ts">
   interface ItemProps {
      quantity: number;
      src: string;
   }
   let { quantity, src } = defineProps<ItemProps>();
</script>

<template>
   <div class="item-ctn" draggable="true">
      <img :src="`src/assets/${src}.svg`" />
      <div class="item-quantity-text">{{ quantity === 1 ? '' : quantity }}</div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;
   .item-ctn {
      @include flex-center;
      @include fill;
      cursor: grab;
      img {
         @include no-interact;
         height: 85%;
         width: 85%;
      }
   }
   .item-quantity-text {
      position: absolute;
      bottom: 0;
      right: $s-1;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
   }
</style>
