<script setup lang="ts">
   import { getPath, randArrPick, mapValue } from '@/utilities';
   import type { Skill } from '@/types';
   import type { Hero } from '@/classes/_index';
   import { computed } from 'vue';

   interface HeroTooltipSkillProps {
      hero: Hero;
      skill: Skill;
   }

   let { hero, skill } = defineProps<HeroTooltipSkillProps>();
   const progress = computed(() =>
      mapValue([0, hero.skillRequirements[skill]], [0, 100], hero.skills[skill].xp)
   );
</script>

<template>
   <div class="hero-skill">
      <img :src="getPath(`stats/${skill}`)" />
      <div class="skill-level">{{ hero.skills[skill].level }}</div>
      <div class="skill-progress-bar">
         <div class="bar-off">
            <div class="bar-on" :style="{ width: `${progress}%` }"></div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .hero-skill {
      display: grid;
      gap: 4px;
      align-items: center;
      grid-template-areas:
         'icon level'
         'icon progress';
      grid-template-columns: 32px 80px;
      grid-template-rows: auto 12px;

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
         height: 12px;
         width: 100%;
         grid-area: progress;
         .bar-off {
            background-color: hsla(0, 0%, 45%, 1);
            height: 100%;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            .bar-on {
               background-color: hsla(0, 0%, 10%, 1);
               height: 100%;
               border-radius: $s-4;
            }
         }
      }
   }
</style>
