<script setup lang="ts">
   import { useSlots, useInventory } from '@/services/_index';
   import { Hero } from '@/classes/_index';
   import { Slot, Inventory } from '@/components/_index';
   import Upgrade from '../components/shop/Upgrade.vue';

   const slots = useSlots();
   const { slotPrice, buySlot } = useInventory();
</script>

<template>
   <div class="shop-page">
      <div class="recruitment-area">
         <Slot :slot="slots.create('buy', Hero.random())" />
      </div>
      <div class="item-area"></div>
      <div class="inventory-area">
         <Inventory />
      </div>
      <div class="upgrades-area">
         <Upgrade
            name="Inventory Slot"
            description="increase your inventory capacity by buying more space!"
            :price="slotPrice"
            currency="gold"
            :onBuy="buySlot"
         />
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .shop-page {
      @include window-default($shop-background);
      display: grid;
      gap: 6px;
      grid-template-columns: $inv-width auto;
      grid-template-rows: auto $inv-height;
      grid-template-areas:
         'upgrades   recruit'
         'inv        items';
   }

   .recruitment-area {
      grid-area: recruit;
   }

   .item-area {
      grid-area: items;
   }

   .inventory-area {
      grid-area: inv;
   }

   .upgrades-area {
      grid-area: upgrades;
      border: solid $border-default 6px;
      border-radius: 4px;
      background: hsl(260, 53%, 24%);
   }
</style>
