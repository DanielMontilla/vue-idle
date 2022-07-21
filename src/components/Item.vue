<script setup lang="ts">
   import { Item } from '@/classes/_index';
   import { getPath } from '#/utilities';
   import { ref, computed } from 'vue';

   /* 🎈 props & default values */
   const { item, onDragStart, onDragEnd } = defineProps<{
      item: Item;
      onDragStart: (e: DragEvent) => any;
      onDragEnd: (e: DragEvent) => any;
   }>();

   /* 🔗 reactive values */
   const hovering = ref(false);
   const dragging = ref(false);

   /* 💬 computed & parsed values  */
   const source = computed(() => getPath(`items/${item.src}`));

   /* 📅 event handlers */
   const onMouseOver = (e: MouseEvent) => {};
   const onMouseLeave = (e: MouseEvent) => {};
</script>

<template>
   <div
      class="item"
      :draggable="true"
      @dragstart="[onDragStart($event), (dragging = true)]"
      @dragend="[onDragEnd($event), (dragging = false)]"
      @mouseover="[onMouseOver($event), (hovering = true)]"
      @mouseleave="[onMouseLeave($event), (hovering = false)]"
   >
      <img class="item-img" :src="source" />
      <div v-if="item.quantity > 1" class="item-quantity">{{ item.quantity }}</div>
      <!-- <component class="item-tooltip" v-if="hovering" /> -->
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/index' as *;

   .item {
      @include square(44px);
      position: relative;
   }

   .item-img {
      @include no-interact;
      @include fill;
   }

   .item-quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 50%;
      background-color: hsla(var(--c-bg-darker-v), 0.75);
      padding: 2px;

      font-size: 14px;
      font-weight: bold;
   }
</style>
2
