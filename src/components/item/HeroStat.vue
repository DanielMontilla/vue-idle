<script setup lang="ts">
   import type { Stat } from '@/types';
   import type { Hero } from '@/classes/_index';
   import { computed } from 'vue';
   import { getPath } from '@/utilities';

   interface HeroTooltipSkillProps {
      hero: Hero;
      stat: Stat;
   }

   const { hero, stat } = defineProps<HeroTooltipSkillProps>();
   const data = computed(() => hero.getStatData(stat));
</script>

<template>
   <div class="hero-stat">
      <img :src="getPath(`stats/${stat}`)" />
      <div class="stat-value">{{ data.current.toFixed(0) }}</div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .hero-stat {
      display: grid;
      align-items: center;
      height: 40px;
      grid-template-areas: 'icon level';
      grid-template-columns: max-content auto;
      grid-template-rows: auto;
      padding-left: 4px;
      padding-right: 4px;
      column-gap: 1px;

      img {
         grid-area: icon;
         @include square(26px);
         justify-self: center;
      }
      .stat-value {
         grid-area: level;
         font-size: 20px;
         font-weight: bold;
      }
   }
</style>
