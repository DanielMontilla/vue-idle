<script setup lang="ts">
   import type { Hero } from '@/classes/_index';
   import { getPath, capitalize } from '@/utilities';
   import { onMounted, ref } from 'vue';

   interface HeroToolTip {
      hero: Hero;
   }

   let { hero } = defineProps<HeroToolTip>();
</script>

<template>
   <div class="content">
      <div class="header">
         <img :src="getPath(hero.src)" />
         <div class="info">
            <div class="name">{{ hero.name }}</div>
            <div class="sub">
               {{ capitalize(hero.race) }}
               <p style="font-weight: bold; display: inline">•</p>
               {{ capitalize(hero.class) }}
            </div>
         </div>
         <div class="level">
            {{ hero.level.level }}
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   $header-height: calc($slot-size * 0.8);

   .content {
      @include item-tooltip;
      display: grid;
      align-items: center;
      width: max-content;
      grid-template-rows: $header-height;
      grid-template-columns: auto;
      grid-template-areas: 'header';

      .header {
         grid-area: header;
         display: grid;
         grid-template-rows: auto;
         grid-template-columns: auto auto;
         grid-template-areas: 'img info level';
         align-items: center;
         line-height: 1;

         $img-size: calc($header-height * 0.9);

         img {
            grid-area: img;
            height: $img-size;
            width: $img-size;
            border-radius: 999px;
            margin-right: $s-3;
         }

         .info {
            grid-area: info;
            display: grid;
            grid-template-rows: auto auto;
            grid-template-columns: auto;
            grid-template-areas:
               'name'
               'sub';

            .name {
               $height: calc($img-size * 3 / 5);
               height: $height;
               font-size: calc($height * 0.9);
               font-weight: bold;
               text-align: left;
            }

            .sub {
               $height: calc($img-size * 2 / 5);
               height: $height;
               font-size: calc($height * 0.9);
               text-align: left;
            }
         }

         .level {
            grid-area: level;
            justify-self: end;
            font-size: $img-size;
         }
      }
   }
</style>
