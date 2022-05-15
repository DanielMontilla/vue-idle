<script setup lang="ts">
   import { Hero, Item, Quest } from '@/classes/_index';
   import { Socket } from '@/components/_index';
   import useSockets from '@/services/Sockets';
   import {
      mapValue,
      capitalize,
      formatTime,
      formatDistance,
      computeProgress,
   } from '@/utilities';
   import { computed, ref, type Ref } from 'vue';

   interface QuestCardProps {
      quest: Quest;
   }
   const { quest: q } = defineProps<QuestCardProps>();
   const { createRef } = useSockets();

   const quest = ref(q);
   const hero = computed(() => quest.value.hero);
   const time = computed(() => formatTime(quest.value.time));
   const distance = computed(() => formatDistance(quest.value.distance));

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
   <div class="quest">
      <Socket
         class="socket"
         :socket="createRef('quest')"
         :onEnter="onEnter"
         :onLeave="onLeave"
      />
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
               <div class="name">{{ capitalize(quest.zone) }}</div>
               <div class="controls">
                  <div
                     @click="handleControl('return')"
                     :class="{ disabled: !quest.started }"
                     class="return control-btn"
                  >
                     {{ quest.return ? '↪️' : '↩️' }}
                  </div>
                  <div @click="handleControl('play')" class="play control-btn">
                     {{ quest.play ? '⏸︎' : '▶️' }}
                  </div>
                  <div
                     class="foward control-btn"
                     @click="handleControl('foward')"
                     :class="{
                        disabled: !quest.started,
                        pressed: quest.foward,
                     }"
                  >
                     {{ quest.return ? '⏪' : '⏩' }}
                  </div>
               </div>
            </div>
            <div class="details">
               <div class="time">{{ time }}</div>
               <div class="distance">{{ distance }}</div>
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
   .quest {
      @include grid-align;
      width: 100%;
      padding: 6px;
      grid-template-areas:
         'slot other'
         'inventory inventory';
      grid-template-columns: min-content auto;
      grid-template-rows: repeat(2, auto);
      line-height: 1;
      border: dashed white 1px;
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
         grid-template-columns: min-content min-content 1fr;
         grid-template-rows: repeat(1, auto);
         gap: 4px;
         .details {
            grid-area: details;
            @include grid-center;
            justify-items: end;
            justify-self: end;
            grid-template-areas: 'time' 'distance';
            grid-template-columns: repeat(1, auto);
            grid-template-rows: repeat(2, 1fr);

            font-size: $t-xl;

            .time {
               grid-area: time;
            }

            .distance {
               grid-area: distance;
            }
         }
         .socket {
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
               border-radius: 8px;
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
               border-radius: 8px;
            }
         }
         .zone {
            grid-area: zone;
            @include grid-center;
            justify-items: start;
            grid-template-areas:
               'name'
               'controls';
            grid-template-columns: repeat(1, auto);
            grid-template-rows: 3fr 2fr;
            height: 100%;
            justify-self: start;
            .name {
               grid-area: name;
               // height: 100%;
               font-size: $t-xl;
            }
            .controls {
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
