<script setup lang="ts">
   import { items } from '@/CONST';
   interface ItemProps {
      id: number;
      quantity: number;
   }
   let { id, quantity } = defineProps<ItemProps>();
   let { imgSrc } = items[id];
</script>

<template>
   <div class="item-ctn" draggable="true">
      <img :src="`src/assets/${imgSrc}.svg`" />
      <div class="item-quantity-text">{{ quantity === 1 ? '' : quantity }}</div>
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;
   .item-ctn {
      @include flex-center;
      width: 100%;
      height: 100%;
      cursor: grab;
      img {
         @include no-interact;
         height: 75%;
         width: 75%;
      }
   }
   .item-quantity-text {
      position: absolute;
      bottom: 0;
      right: $s-1;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
   }
</style>
