<script setup lang="ts">
   import type { Hero } from '@/classes/_index';
   import { SKILL_ARR, STAT_ARR, RESOURCE_ARR } from '@/CONST';
   import { resource_color } from '@/data';
   import type { Resource, Skill } from '@/types';
   import { getPath, mapValue } from '@/utilities';

   interface HeroToolTip {
      hero: Hero;
   }

   const { hero } = defineProps<HeroToolTip>();
   const computeSkillWidth = (skill: Skill): number =>
      mapValue([0, hero.skillRequirements[skill]], [0, 100], hero.skills[skill].xp);
   const computeResourceWidth = (resource: Resource): number =>
      mapValue(
         [0, hero.resources[resource].total],
         [0, 100],
         hero.resources[resource].amount
      );
</script>

<template>
   <div class="hero-tooltip">
      <div class="info-area">
         <div class="name">{{ hero.name }}</div>
         <div class="class-n-race">{{ hero.race }} | {{ hero.class }}</div>
         <div class="resource-area">
            <div
               v-for="resource in RESOURCE_ARR"
               class="resource"
               :style="{ backgroundColor: resource_color[resource] }"
            >
               <div
                  class="amount"
                  :style="{
                     backgroundColor: resource_color[resource],
                     width: `${computeResourceWidth(resource)}px`,
                  }"
               />
            </div>
         </div>
      </div>
      <div class="value-area">
         <img src="" />
         <span class="value">{{ hero.value }}</span>
      </div>
      <div class="details">
         <div class="skills">
            <div v-for="skill in SKILL_ARR" class="skill">
               <img :src="getPath(`skills/${skill}`)" />
               <div class="level">{{ hero.skills[skill].level }}</div>
               <div class="bar">
                  <div
                     class="progress"
                     :style="{ width: `${computeSkillWidth(skill)}px` }"
                  />
                  <div class="xp">
                     <div class="current-xp">{{ hero.skills[skill].xp.toFixed(0) }}</div>
                     <div class="needed-xp">
                        &nbsp&nbsp/{{ hero.skillRequirements[skill].toFixed(0) }}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="stats">
            <div v-for="stat in STAT_ARR" class="stat">
               <img :src="getPath(`stats/${stat}`)" />
               <div class="level">{{ hero.stats[stat].toFixed(1) }}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .hero-tooltip {
      @include grid-center;
      background-color: $light-background;
      font-size: $t-st;
      padding: 8px;
      gap: 8px;

      border-radius: 8px;

      grid-template-areas:
         'info value'
         'details details';

      grid-template-rows: repeat(2, auto);
      grid-template-columns: min-content repeat(2, max-content);
      line-height: 1;

      .info-area {
         grid-area: info;
         justify-self: start;

         @include grid-center;
         column-gap: 6px;
         grid-template-areas:
            'name resource'
            'class-n-race resource';
         grid-template-rows: repeat(2, max-content);
         grid-template-columns: repeat(2, max-content);
         .name {
            grid-area: name;
            font-size: $t-xl;
            font-weight: bold;
         }
         .class-n-race {
            grid-area: class-n-race;
         }
         .resource-area {
            grid-area: resource;
            @include flex-center;
            flex-direction: column;
            gap: 4px;

            height: 100%;
            .resource {
               border-radius: 4px;
               overflow: hidden;
               width: 128px;
               height: 8px;

               .amount {
                  height: 100%;
                  filter: saturate(250%);
               }
            }
         }
      }
      .value-area {
         grid-area: value;
         justify-self: end;
         align-self: start;
      }
      .details {
         grid-area: details;

         @include grid-center;
         grid-template-areas: 'stats skill';
         grid-template-rows: repeat(1, auto);
         grid-template-columns: repeat(2, max-content);

         gap: 16px;

         @mixin this-grid {
            @include grid-center;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
         }

         img {
            @include square(32px);
         }

         .stats {
            grid-area: stats;

            @include this-grid;
            .stat {
               @include flex-label;
               height: 32px;
               gap: 4px;
            }
         }
         .skills {
            grid-area: skill;

            @include this-grid;
            .skill {
               @include grid-center;
               grid-template-areas:
                  'img level'
                  'img bar';
               grid-template-rows: repeat(1, auto);
               grid-template-columns: repeat(2, max-content);

               column-gap: 4px;
               row-gap: 2px;

               img {
                  grid-area: img;
               }

               .level {
                  grid-area: level;
                  justify-self: start;

                  font-size: $t-md;
               }

               .bar {
                  grid-area: bar;

                  background-color: rgb(145, 145, 145);
                  height: 12px;
                  width: 64px;
                  border-radius: 4px;

                  overflow: hidden;

                  .progress {
                     height: 100%;
                     background-color: rgb(109, 109, 109);
                  }

                  .xp {
                     position: absolute;
                     right: 0;
                     bottom: 0;
                     line-height: 1;
                     @include flex-label;
                     padding: 2px;

                     color: black;
                     font-weight: bold;
                     .current-xp {
                        font-size: 10px;
                     }
                     .needed-xp {
                        font-size: 8px;
                        align-self: end;
                     }
                  }
               }
            }
         }
      }
   }
</style>
