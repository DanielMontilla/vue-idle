<script setup lang="ts">
   import { getPath, randArrPick, mapValue } from '@/utilities';
   import type { Skill } from '@/types';
   import type { Hero } from '@/classes/_index';
   import { computed } from 'vue';

   interface HeroTooltipSkillProps {
      hero: Hero;
      skill: Skill;
   }

   const { hero, skill } = defineProps<HeroTooltipSkillProps>();
   const data = computed(() => hero.getSkillData(skill));
</script>

<template>
   <div class="hero-skill">
      <img :src="getPath(`skills/${skill}`)" />
      <div class="skill-level">{{ data.level }}</div>
      <div class="skill-progress-bar">
         <div class="bar-off">
            <div class="xp">
               <div class="current-xp">{{ data.current.toFixed(0) + ' /' }}</div>
               <div class="total-xp">{{ data.total.toFixed(0) }}</div>
            </div>
            <div class="bar-on" :style="{ width: `${data.progress}%` }"></div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .hero-skill {
      display: grid;
      column-gap: 0px;
      row-gap: 2px;
      align-items: center;
      grid-template-areas:
         'icon level'
         'icon progress';
      grid-template-columns: 32px auto;
      grid-template-rows: auto auto;

      img {
         grid-area: icon;
         @include square(26px);
         justify-self: center;
      }
      .skill-level {
         grid-area: level;
         font-size: 20px;
         font-weight: bold;
      }

      .skill-progress-bar {
         height: 18px;
         width: 80px;
         grid-area: progress;
         .bar-off {
            background-color: hsla(0, 0%, 45%, 1);
            height: 100%;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;

            .xp {
               position: absolute;
               height: 100%;
               width: 100%;
               z-index: 2;
               padding-left: 6px;
               display: flex;
               align-items: center;
               overflow: visible;

               .current-xp {
                  font-size: 12px;
                  display: inline;
                  font-weight: bolder;
               }
               .total-xp {
                  font-size: 10px;
                  display: inline;
                  font-style: italic;
               }
            }
            .bar-on {
               background-color: hsla(0, 0%, 10%, 1);
               height: 100%;
               border-radius: $s-4;
            }
         }
      }
   }
</style>
