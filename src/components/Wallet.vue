<script setup lang="ts">
   import { usePlayer } from '@/services/_index';
   import { getPath } from '@/utilities';
   import { computed } from 'vue';

   let { player } = usePlayer();
   const gold = computed(() => player.value.wallet.gold);
</script>

<template>
   <div class="wallet">
      <div class="gold">
         <img :src="getPath('icons/gold')" />
         <div class="text">{{ gold }}</div>
      </div>
      <div class="diamond">
         <img :src="getPath('icons/diamond')" />
         <div class="text">{{ player.wallet.diamond }}</div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
   @use '@/styles/global' as *;

   @mixin currency($color) {
      @include flex-label;
      gap: 4px;
      padding: 2px 3px;

      transition: border 0.1s linear;

      &:hover {
         border-radius: 0 0 4px 4px;
         border-bottom: solid $color 2px;
      }
   }

   .wallet {
      @include flex(end, start);
      width: max-content;
      $height: $tab-height;
      height: $height;
      $label-height: calc($height * 0.75);
      gap: 16px;

      .text {
         line-height: 1;
         font-size: $t-lg;
         height: $label-height;
      }

      img {
         @include square($label-height);
      }

      .gold {
         @include currency($gold);
      }

      .diamond {
         @include currency($diamond);
      }
   }
</style>
