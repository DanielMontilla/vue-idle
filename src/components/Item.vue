<script setup lang="ts">
   import { items } from '@/CONST';
   import type { ItemData } from '@/types';

   interface ItemProps {
      data: ItemData;
   }

   let { data } = defineProps<ItemProps>();
   let { id, quantity } = data;
   let { imgSrc } = items[id];
</script>

<!-- :class="{ dragging: isDragging }" -->
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
