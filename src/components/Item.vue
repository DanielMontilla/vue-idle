<script setup lang="ts">
   import { type Item, Hero } from '@/classes/_index';
   import { getPath } from '@/utilities';
   import { inject, ref } from 'vue';
   import { HeroTooltip } from '@/components/_index';
   import { computed } from '@vue/reactivity';
   import type { PlayerRef } from '@/types';
   import { usePlayer } from '@/services/_index';

   interface ItemProps {
      item: Item;
      onDragStart: (e: DragEvent, dragElem: HTMLElement) => any;
      onDragEnd: (e: DragEvent) => any;
   }
   const player = usePlayer();
   const { item, onDragStart, onDragEnd } = defineProps<ItemProps>();
   const dragElem = ref<HTMLElement>();
   const hover = ref<Boolean>(false);
   const dragging = ref<Boolean>(false);

   const draggable = computed(() => {
      if (item.isLocked) return false;
      if (item.slotType === 'buy') {
         return player.value.wallet.gold >= item.value;
      }
      return true;
   });
</script>

<template>
   <div
      class="content"
      ref="dragElem"
      :draggable="draggable"
      :style="{ cursor: draggable ? 'grab' : 'not-allowed' }"
      @dragstart="[onDragStart($event, dragElem), (dragging = true)]"
      @dragend="[onDragEnd($event), (dragging = false)]"
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
   .content {
      @include flex-center;
      @include fill;
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
