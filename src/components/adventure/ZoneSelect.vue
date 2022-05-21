<script setup lang="ts">
   import type { Zone } from '@/types';
   import { ZONE_ARR } from '@/CONST';
   import { getPath } from '@/utilities';
   import { ref } from 'vue';

   interface ZoneSelectProps {
      zone: Zone | undefined;
      changeZone: (zone: Zone) => void;
   }

   const { zone, changeZone } = defineProps<ZoneSelectProps>();
   const expanded = ref<boolean>(false);
</script>

<template>
   <div class="zone-select">
      <img
         :src="getPath('icons/drop_down')"
         @click="expanded = !expanded"
         :class="{ up: expanded }"
      />
      <div v-if="expanded" class="drop-down">
         <div
            class="item"
            v-for="z in ZONE_ARR"
            :class="{ current: z === zone }"
            @click="
               () => {
                  changeZone(z);
                  expanded = false;
               }
            "
         >
            {{ z }}
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .zone-select {
      img {
         @include square(32px);
         align-self: end;
         min-width: 32px;
         color: white;

         transform: rotate(0deg);
         transition: transform 0.1s ease-in-out;

         filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(332deg) brightness(103%)
            contrast(101%);
      }

      .up {
         transform: rotate(180deg);
      }
      .drop-down {
         @include grid-center;
         width: max-content;
         position: absolute;
         height: auto;

         z-index: 3;

         grid-template-columns: 1fr;

         line-height: 1;

         background: rgba(31, 31, 31, 0.5);
         border-radius: 2px;
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
         backdrop-filter: blur(10px);
         border: 1px solid rgba(255, 255, 255, 0.1);

         .current {
            background-color: rgba(255, 255, 255, 0.1);
         }
         .item {
            width: 100%;
            font-size: $t-md;
            font-weight: 600;
            padding: 8px 6px;
            white-space: nowrap;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            text-align: start;

            &:last-child {
               border-bottom: 0px;
            }

            &:hover {
               background-color: rgba(255, 255, 255, 0.1);
            }
         }
      }
   }
</style>
