<script setup lang="ts">
   import { getPath } from '@/utilities';
   import type { Slot } from '@/classes/_index';
   import { ref, computed } from 'vue';
   import usePlayer from '@/services/Player';

   interface BuyableTooltipProps {
      slot: Slot;
   }

   const { slot } = defineProps<BuyableTooltipProps>();
   const price = computed(() => slot.price as number);
   const { canPurchase } = usePlayer();
   const hover = ref<Boolean>(false);
   const canBuy = computed(() => canPurchase(price.value, 'gold'));

   /* 📅 EVENT HANDLERS */
   const onClick = () => {
      if (canBuy.value) {
         slot.buy();
      }
   };
</script>

<template>
   <div
      class="buyable"
      @click="onClick"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :style="{ cursor: canBuy ? 'pointer' : 'not-allowed' }"
   >
      <img class="lock" :src="getPath('icons/lock')" />
      <div v-if="hover" class="price">
         <img :src="getPath('icons/gold')" />
         <div class="price-text">{{ price }}</div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;
   .buyable {
      @include fill;
      @include flex-center;
      display: absolute;
      z-index: 2;
      background-color: hsla(0, 0%, 0%, 0.5);

      img {
         @include no-interact;
      }
      .lock {
         @include square(50%);
         filter: opacity(10%);
      }
      .price {
         @include flex-label;
         position: absolute;

         filter: drop-shadow();

         img {
            @include square(20px);
         }

         .price-text {
            line-height: 1;
            font-size: 20px;
            font-weight: bold;
         }
      }
   }
</style>
