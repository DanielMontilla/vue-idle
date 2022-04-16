Item
<script setup lang="ts">
   import { useSlots } from '@/services/_index';
   import type { Item } from '@/classes/_index';
   import { Item as MyItem } from '@/components/_index';
   import type { SlotRef, SlotType } from '@/types';
   import { computed } from 'vue';
   import { getPath } from '@/utilities';

   interface SlotProps {
      data?: SlotRef | SlotType;
      debug?: boolean;
      onEnter?: (item: Item) => any;
      onLeave?: () => any;
   }

   const { data, debug, onEnter, onLeave } = defineProps<SlotProps>();
   const manager = useSlots();
   let slot: SlotRef;
   if (typeof data === 'string') {
      slot = manager.add(data);
   } else if (data) {
      slot = data;
   } else {
      slot = manager.addEmpty('none');
   }

   let item = computed(() => slot.value.item);

   const onDragStart = ({ dataTransfer }: DragEvent, dragElem: HTMLElement) => {
      if (!dataTransfer) return;
      dataTransfer.effectAllowed = 'move';
      dataTransfer.dropEffect = 'move';
      if (item.value) {
         let size = 64 * 0.85;
         let img = document.createElement('img');
         img.src = getPath(item.value.src);
         img.style.width = `${size}px`;
         img.style.height = `${size}px`;
         let div = document.createElement('div');
         div.appendChild(img);
         div.style.position = 'absolute';
         document.querySelector('body')?.appendChild(div);
         dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
      }
      dataTransfer.setDragImage(document.createElement('div'), 0, 0);
      manager.setDragged(slot);
   };
   const onDrop = () => {
      manager.handleDrop(slot, debug);
      if (onEnter) onEnter(item.value as Item);
   };
   const onDragEnd = ({ dataTransfer }: DragEvent) => {
      if (!dataTransfer) return;
      if (dataTransfer.dropEffect !== 'none' && onLeave) onLeave();
      manager.clearDragged();
   };
</script>

<template>
   <div class="slot-ctn" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <MyItem
         v-if="item"
         :item="item"
         :onDragStart="onDragStart"
         :onDragEnd="onDragEnd"
      />
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;
   .slot-ctn {
      @include flex-center;
      display: block;
      width: $slot-size;
      height: $slot-size;
      min-height: $slot-size;
      min-width: $slot-size;
      background-color: hsla(0, 0%, 0%, 0.1);
      border: $s-1 solid black;
   }
</style>
