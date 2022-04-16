<script setup lang="ts">
   import { type Item, Hero } from '@/classes/_index';
   import { getPath } from '@/utilities';
   import { ref } from 'vue';
   import { HeroTooltip } from '@/components/_index';
   interface ItemProps {
      item: Item;
      onDragStart: (e: DragEvent, dragElem: HTMLElement) => any;
      onDragEnd: (e: DragEvent) => any;
   }
   const { item, onDragStart, onDragEnd } = defineProps<ItemProps>();
   const dragElem = ref<HTMLElement>();
   let hover = ref<Boolean>(true);
   let dragging = ref<Boolean>(false);
</script>

<template>
   <div
      class="item-ctn"
      ref="dragElem"
      draggable="true"
      @dragstart="[onDragStart($event, dragElem), (dragging = true)]"
      @dragend="[onDragEnd, (dragging = false)]"
      @mouseover="hover = true"
      @mouseleave="hover = false"
   >
      <img :src="getPath(item.src)" />
      <div class="item-quantity-text">{{ item.quantity === 1 ? '' : item.quantity }}</div>
      <div v-if="hover && !dragging" class="tooltip">
         <!-- prettier-ignore -->
         <HeroTooltip v-if="(item instanceof Hero)" :hero="(item as Hero)" />
      </div>
   </div>
</template>

<style scoped lang="scss">
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
