<script setup lang="ts">
   import { type Item, Hero } from '@/classes/_index';
   import { HeroTooltip } from '@/components/_index';
   import { getPath } from '@/utilities';
   import { ref, computed } from 'vue';
   import { useMouse } from '@vueuse/core';

   interface ItemProps {
      item: Item;
      onDragStart: (e: DragEvent, dragElem?: HTMLElement) => any;
      onDragEnd: (e: DragEvent) => any;
   }

   const { item, onDragStart, onDragEnd } = defineProps<ItemProps>();
   const { x, y } = useMouse();
   const dragElem = ref<HTMLElement>();
   const hover = ref<Boolean>(false);
   const dragging = ref<Boolean>(false);
   const tooltip = ref<HTMLDivElement>();
   const draggable = computed(() => item.isDraggable());
   const position = computed(() => {
      if (!tooltip.value) return { x: 0, y: 0 };
      const [height, width] = [tooltip.value.clientHeight, tooltip.value.clientWidth];
      const [midX, midY] = [window.innerWidth / 2, window.innerHeight / 2];
      const [ox, oy] = [16, 16];
      let [right, bottom] = [false, false];
      let [mx, my] = [x.value + ox, y.value + oy];
      if (x.value > midX) right = true;
      if (y.value > midY) bottom = true;
      if (right && bottom) {
         // mouse is br => display tl
         mx = x.value - width - ox;
         my = y.value - height - oy;
      } else if (!right && bottom) {
         // mouse is bl => display tr
         mx = x.value + ox;
         my = y.value - height - oy;
      } else if (right && !bottom) {
         // mouse is tr => display bl
         mx = x.value - width - ox;
         my = y.value + oy;
      } else {
         // mouse is tl => display br
         mx = x.value + ox;
         my = y.value + oy;
      }
      return { x: mx, y: my };
   });
</script>

<template>
   <div class="item">
      <div
         class="item-content"
         ref="dragElem"
         :draggable="draggable"
         :style="{ cursor: draggable ? 'grab' : 'not-allowed' }"
         @dragstart="[onDragStart($event, dragElem), (dragging = true)]"
         @dragend="[onDragEnd($event), (dragging = false)]"
         @mouseover="hover = true"
         @mouseleave="hover = false"
      >
         <img :src="getPath(item.src)" />
         <div class="item-quantity-text">
            {{ item.quantity === 1 ? '' : item.quantity }}
         </div>
      </div>
      <div
         v-if="hover && !dragging"
         class="tooltip"
         ref="tooltip"
         :style="{ left: `${position.x}px`, top: `${position.y}px` }"
      >
         <!-- prettier-ignore -->
         <HeroTooltip v-if="(item instanceof Hero)" :hero="(item as Hero)" />
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .item {
      @include fill;
      .item-content {
         @include flex-center;
         @include fill;
         z-index: 1;
         img {
            @include no-interact;
            height: 85%;
            width: 85%;
         }
      }
      .tooltip {
         position: fixed;
         z-index: 2;
      }
   }
   .item-quantity-text {
      position: absolute;
      bottom: 0;
      right: 2px;
      font-size: 16px;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
   }
</style>
