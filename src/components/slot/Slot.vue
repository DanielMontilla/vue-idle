Item
<script setup lang="ts">
   import { useSlots, usePlayer } from '@/services/_index';
   import type { Item } from '@/classes/_index';
   import { Item as MyItem, BuyableOverlay } from '@/components/_index';
   import type { SlotRef, SlotType } from '@/types';
   import { computed, ref } from 'vue';
   import { getPath } from '@/utilities';

   interface SlotProps {
      slot?: SlotRef | SlotType;
      debug?: boolean;
      onEnter?: (item: Item) => any;
      onLeave?: () => any;
   }

   const { slot, debug, onEnter, onLeave } = defineProps<SlotProps>();
   const slots = useSlots();
   const { player } = usePlayer();

   let mySlot: SlotRef =
      typeof slot === 'string'
         ? slots.create(slot)
         : slot
         ? slot
         : slots.createEmpty('none');

   const item = computed(() => mySlot.value.item);
   const price = computed(() => mySlot.value.price); // Price has to be saved onDragStart bc onDrop event happens before onDragEnd
   const iPrice = ref<number>(); // Price has to be saved onDragStart bc onDrop event happens before onDragEnd

   /* 📅 EVENT HANDLERS */
   const onClick = () => {};
   const onDragStart = ({ dataTransfer }: DragEvent, dragElem?: HTMLElement) => {
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

      if (mySlot.value.type === 'buy') {
         iPrice.value = (item.value as Item).value;
      }

      slots.setDragged(mySlot);
   };
   const onDrop = () => {
      // CONTEXT: THE SLOT BEING DROPPED
      if (!slots.handleDrop(mySlot, debug)) return;
      if (onEnter) onEnter(item.value as Item);
   };
   const onDragEnd = ({ dataTransfer }: DragEvent) => {
      // CONTEXT: THE SLOT BEING DRAGGED FROM
      if (!dataTransfer) return;
      if (dataTransfer.dropEffect !== 'none') {
         if (iPrice.value) {
            player.value.wallet.gold -= iPrice.value;
            iPrice.value = undefined;
         }
         if (onLeave) onLeave();
      }
      slots.clearDragged();
   };
</script>

<template>
   <div class="slot-ctn" @drop="onDrop" @dragenter.prevent @dragover.prevent>
      <MyItem
         v-if="item"
         class="item"
         :item="item"
         :onDragStart="onDragStart"
         :onDragEnd="onDragEnd"
      />
      <BuyableOverlay v-if="price" :slot="mySlot" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .slot-ctn {
      @include flex-center;
      width: $slot-size;
      height: $slot-size;
      min-height: $slot-size;
      min-width: $slot-size;
      background-color: hsla(0, 0%, 100%, 0.05);
      border: 1px solid rgb(25, 25, 25);
   }
</style>
