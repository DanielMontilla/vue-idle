SKILL_ARRSTAT_ARR<script setup lang="ts">
   import type { Hero } from '@/classes/_index';
   import { getPath, capitalize } from '@/utilities';
   import { HeroSkill } from '@/components/_index';
   import { SKILL_ARR, STAT_ARR } from '@/CONST';
   import HeroStat from './HeroStat.vue';

   interface HeroToolTip {
      hero: Hero;
   }

   let { hero } = defineProps<HeroToolTip>();
</script>

<template>
   <div class="hero-tooltip">
      <div class="hero-info">
         <div class="hero-name">{{ hero.name }}</div>
         <div class="hero-raceNclass">
            {{ capitalize(hero.race) }} • {{ capitalize(hero.class) }}
         </div>
      </div>
      <div class="hero-value">
         <div class="hero-value">
            <img :src="getPath('icons/value-coin')" />
            {{ hero.value }}
         </div>
      </div>
      <div class="hero-detail">
         <div class="hero-stats">
            <HeroStat v-for="stat in STAT_ARR" :hero="hero" :stat="stat" />
         </div>
         <div class="hero-skills">
            <HeroSkill v-for="skill in SKILL_ARR" :hero="hero" :skill="skill" />
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .hero-tooltip {
      @include item-tooltip;

      display: grid;
      gap: 8px;
      align-items: center;
      grid-template-areas:
         'info value'
         'detail detail';
      grid-template-rows: auto auto;
      grid-template-columns: auto auto;

      line-height: 1;

      .hero-info {
         grid-area: info;

         display: grid;
         align-items: center;
         gap: 4px;
         grid-template-areas: 'name' 'raceNclass';
         grid-template-rows: auto auto;
         grid-template-columns: auto;

         .hero-name {
            grid-area: name;
            font-size: 32px;
            font-weight: bold;
         }

         .hero-raceNclass {
            grid-area: raceNclass;
            font-size: 18px;
            font-style: italic;
         }
      }

      .hero-value {
         grid-area: value;
         font-size: 24px;
         align-self: start;
         justify-self: end;
         padding: 1px;

         display: flex;
         flex-direction: row;
         gap: 4px;

         img {
            @include square(25px);
         }
      }

      .hero-detail {
         grid-area: detail;

         display: grid;
         align-items: center;
         column-gap: 16px;
         grid-template-areas: 'stats skills';
         grid-template-rows: auto auto;
         grid-template-columns: auto;

         .hero-stats {
            grid-area: stats;
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-template-rows: repeat(4, auto);
            column-gap: 8px;
            row-gap: 4px;
         }
         .hero-skills {
            grid-area: skills;
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-template-rows: repeat(4, auto);
            column-gap: 8px;
            row-gap: 4px;
         }
      }
   }
</style>
