<script setup lang="ts">
   import { Hero, Item } from '@/classes/_index';
   import { Slot } from '@/components/_index';
   import type { QuestRef } from '@/types';
   import { mapValue, randInt, capitalize } from '@/utilities';
   import { computed } from 'vue';

   interface QuestCardProps {
      quest: QuestRef;
   }

   const { quest } = defineProps<QuestCardProps>();
   const hero = computed(() => quest.value.hero);
   const thisQuest = computed(() => quest.value);

   const computeProgress = ({ total, amount }: { total: number; amount: number }) =>
      mapValue([0, total], [0, 100], amount);

   const handleControl = (control: 'play' | 'return' | 'foward') => {
      switch (control) {
         case 'play':
            if (!quest.value.started) {
               quest.value.started = true;
            }
            quest.value.play = !quest.value.play;
            if (quest.value.foward) quest.value.foward = false;
            break;
         case 'return':
            if (!quest.value.started) return;
            quest.value.return = !quest.value.return;
            break;
         case 'foward':
            if (!quest.value.started) return;
            quest.value.foward = !quest.value.foward;
            break;
      }
   };

   const onEnter = (hero: Item) => {
      if (!(hero instanceof Hero)) return;
      quest.value.hero = hero;
   };

   const onLeave = () => {
      quest.value.hero = undefined;
   };
</script>

<template>
   <div class="quest-content">
      <Slot class="slot" slot="quest" :onEnter="onEnter" :onLeave="onLeave" />
      <Transition name="fade">
         <div v-if="!hero" class="pending">Insert Hero</div>
         <div v-else class="inserted">
            <div class="resources">
               <div class="health resource">
                  <div
                     class="health-on resource-on"
                     :style="{ width: `${computeProgress(hero.resources.health)}%` }"
                  />
               </div>
               <div class="stamina resource">
                  <div
                     class="stamina-on resource-on"
                     :style="{ width: `${computeProgress(hero.resources.stamina)}%` }"
                  />
               </div>
               <div class="mana resource">
                  <div
                     class="mana-on resource-on"
                     :style="{ width: `${computeProgress(hero.resources.mana)}%` }"
                  />
               </div>
            </div>
            <div class="zone">
               <div class="name">{{ capitalize(thisQuest.zone) }}</div>
               <div class="controls">
                  <div
                     @click="handleControl('return')"
                     :class="{ disabled: !thisQuest.started }"
                     class="return control-btn"
                  >
                     {{ thisQuest.return ? '↪️' : '↩️' }}
                  </div>
                  <div @click="handleControl('play')" class="play control-btn">
                     {{ thisQuest.play ? '⏸︎' : '▶️' }}
                  </div>
                  <div
                     class="foward control-btn"
                     @click="handleControl('foward')"
                     :class="{
                        disabled: !thisQuest.started,
                        pressed: thisQuest.foward,
                     }"
                  >
                     {{ thisQuest.return ? '⏪' : '⏩' }}
                  </div>
               </div>
            </div>
            <div class="details">
               <div class="time"></div>
               <div class="distance"></div>
            </div>
         </div>
      </Transition>
      <div class="inventory"></div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .disabled {
      filter: grayscale(90%);
      cursor: not-allowed;
   }

   .pressed {
      filter: brightness(65%);
   }

   .fade-enter-active,
   .fade-leave-active {
      transition: opacity 0.1s linear;
   }

   .fade-enter-from,
   .fade-leave-to {
      opacity: 0;
   }

   .quest-content {
      @include grid-align;
      width: 100%;
      padding: 6px;
      grid-template-areas:
         'slot other'
         'inventory inventory';
      grid-template-columns: min-content auto;
      grid-template-rows: repeat(2, auto);
      line-height: 1;

      .pending {
         grid-area: other;
         padding: 4px 8px;

         color: $text-alternate;
         align-self: start;
         text-align: start;
         font-size: $t-xl;
         font-weight: lighter;
         font-style: italic;
      }

      .inserted {
         grid-area: other;
         @include grid-align;
         grid-template-areas: 'resources zone details';
         grid-template-columns: min-content auto auto;
         grid-template-rows: repeat(1, auto);
         gap: 4px;

         .details {
            grid-area: details;
            @include grid-align;
            justify-items: end;
            grid-template-columns: repeat(1, auto);
            grid-template-columns: repeat(2, 1fr);
         }

         .slot {
            grid-area: slot;
         }
         .resources {
            grid-area: resources;
            width: calc(64px * 2.5);
            height: 64px;
            padding: 0px 4px;
            @include grid-align;
            grid-template-areas:
               'health'
               'stamina'
               'mana';
            grid-template-columns: repeat(1, auto);
            grid-template-rows: repeat(3, 1fr);

            $resource-height: 65%;
            .resource {
               width: 100%;
               height: $resource-height;
               overflow: hidden;
               border-radius: $s-4;

               display: flex;
               justify-items: start;
               align-items: center;
            }

            .health {
               background-color: $health-off;
            }
            .health-on {
               background-color: $health;
            }
            .stamina {
               background-color: $stamina-off;
            }
            .stamina-on {
               background-color: $stamina;
            }
            .mana {
               background-color: $mana-off;
            }
            .mana-on {
               background-color: $mana;
            }

            .resource-on {
               height: 100%;
               border-radius: $s-4;
            }
         }

         .zone {
            grid-area: zone;
            @include grid-align;
            grid-template-areas:
               'name'
               'controls';
            grid-template-columns: repeat(1, auto);
            grid-template-rows: 3fr 2fr;
            height: 100%;
            .name {
               grid-area: name;
               height: 100%;
               font-size: $t-xl;
            }
            .controls {
               height: 100%;
               grid-area: controls;
               display: flex;
               font-size: $t-lg;
               .control-btn {
                  &:last-child {
                  }
                  &:first-child {
                  }
               }
            }
         }
      }
   }
</style>
