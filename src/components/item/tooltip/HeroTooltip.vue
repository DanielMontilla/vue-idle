<script setup lang="ts">
   import type { Hero } from '@/classes/_index';
   import { getPath, capitalize } from '@/utilities';
   import { SKILL_ARR, STAT_ARR, RESOURCE_ARR } from '@/CONST';
   import { resource_color } from '@/data';
   import type { Resource } from '@/types';

   interface HeroToolTip {
      hero: Hero;
   }

   let { hero } = defineProps<HeroToolTip>();
</script>

<template>
   <div class="hero-tooltip">
      <div class="info">
         <div class="name">{{ hero.name }}</div>
         <div class="class-n-race">{{ hero.class }} | {{ hero.race }}</div>
      </div>
      <div class="resources">
         <div
            v-for="resource in RESOURCE_ARR"
            class="resource"
            :style="{ backgroundColor: resource_color[resource] }"
         />
      </div>
      <div class="value"></div>
      <div class="details">
         <div class="skills">
            <div v-for="skill in SKILL_ARR" class="skill" />
         </div>
         <div class="stats">
            <div v-for="stat in STAT_ARR" class="stat" />
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .hero-tooltip {
   }
</style>
