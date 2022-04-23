<script setup lang="ts">
   import type { Currency } from '@/types';
   import { getPath } from '@/utilities';
   import { computed, ref } from 'vue';

   interface UpgradeProps {
      name: string;
      description: string;
      price: number;
      currency: Currency;
      onBuy: () => boolean;
   }

   const { name, description, price, currency, onBuy } = defineProps<UpgradeProps>();
   const shake = ref<boolean>(false);
   const duration = 800;

   const onClick = () => {
      if (!shake.value) {
         let toggle = () => (shake.value = !shake.value);
         if (!onBuy()) {
            toggle();
            setTimeout(toggle, duration);
         }
      }
   };
</script>

<template>
   <div class="upgrade-ctn" @click="onClick">
      <!-- <img class="icon" :src="path" /> -->
      <div class="name">{{ name }}</div>
      <div class="description">{{ description }}</div>
      <div
         class="price"
         :style="{ animation: shake ? `shake ${duration}ms linear` : '' }"
      >
         <img class="currency-icon" :src="getPath(`icons/${currency}`)" />
         <div class="price-text">{{ price }}</div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .upgrade-ctn {
      display: grid;
      align-items: center;
      row-gap: 8px;
      line-height: 1;
      grid-template-areas:
         'name price'
         'description description';
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      padding: 16px 8px;
      padding-top: 8px;
      background-color: hsla(0, 0%, 100%, 0.025);
      transition: background-color 0.1s ease-out;

      &:hover {
         background-color: hsla(0, 0%, 100%, 0.075);
      }

      .name {
         grid-area: name;
         font-weight: bold;
         font-size: $t-2xl;
      }
      .description {
         grid-area: description;
         color: $text-subtitle;
         font-size: $t-md;
      }
      .price {
         grid-area: price;
         @include flex-label;
         gap: 4px;
         justify-self: end;
         align-self: start;

         font-size: $t-md;
         font-weight: 700;

         .currency-icon {
            @include square(24px);
         }
      }
   }
</style>
