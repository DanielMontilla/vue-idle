Item
<script setup lang="ts">
   import { useSlots, usePlayer } from '@/services/_index';
   import type { Item } from '@/classes/_index';
   import { Item as MyItem } from '@/components/_index';
   import type { SlotRef, SlotType } from '@/types';
   import { computed, ref } from 'vue';
   import { getPath } from '@/utilities';

   interface SlotProps {
      data?: SlotRef | SlotType;
      debug?: boolean;
      onEnter?: (item: Item) => any;
      onLeave?: () => any;
   }
   const { data, debug, onEnter, onLeave } = defineProps<SlotProps>();
   const manager = useSlots();
   const player = usePlayer();

   let slot: SlotRef;
   if (typeof data === 'string') {
      slot = manager.add(data);
   } else if (data) {
      slot = data;
   } else {
      slot = manager.addEmpty('none');
   }

   const item = computed(() => slot.value.item);
   const price = ref<number>(); // Price has to be saved onDragStart bc onDrop event happens before onDragEnd

   const onDragStart = ({ dataTransfer }: DragEvent, dragElem: HTMLElement) => {
      // CONTEXT: THE SLOT BEING DRAGGED FROM
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

      if (slot.value.type === 'buy') {
         price.value = (item.value as Item).value;
      }

      manager.setDragged(slot);
   };
   const onDrop = () => {
      // CONTEXT: THE SLOT BEING DROPPED
      manager.handleDrop(slot, debug);
      if (onEnter) onEnter(item.value as Item);
   };
   const onDragEnd = ({ dataTransfer }: DragEvent) => {
      // CONTEXT: THE SLOT BEING DRAGGED FROM
      if (!dataTransfer) return;
      if (dataTransfer.dropEffect !== 'none') {
         if (price.value) {
            player.value.wallet.gold -= price.value;
            price.value = undefined;
         }
         if (onLeave) onLeave();
      }
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

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .slot-ctn {
      @include flex-center;
      display: block;
      width: $slot-size;
      height: $slot-size;
      min-height: $slot-size;
      min-width: $slot-size;
      background-color: hsla(0, 0%, 100%, 0.05);
      border: $s-1 solid rgb(25, 25, 25);
   }
</style>
