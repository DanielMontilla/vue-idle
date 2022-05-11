<script setup lang="ts">
   import { Quest } from '@/classes/_index';
   import { Inventory, QuestCard } from '@/components/_index';
   import { usePages } from '@/services/_index';
   import { forceCast } from '@/utilities';
   import { onMounted, ref, type Ref } from 'vue';

   const { register, current } = usePages();
   const index = register();

   const quests: Ref<Quest[]> = ref([]);
   onMounted(() => {
      quests.value.push(new Quest());
   });
</script>

<template>
   <div v-show="index === current" class="adventures">
      <Inventory class="inventory-area" />
      <div class="log-area"></div>
      <div class="quests-area">
         <QuestCard v-for="quest in quests" :quest="quest" />
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventures {
      @include window-default($adventure-background);
      @include grid-align;

      grid-template-areas:
         'log quests'
         'inventory quests';
      grid-template-columns: min-content 1fr;
      grid-template-rows: auto min-content;

      gap: 4px;

      .inventory-area {
         grid-area: inventory;
      }
      .log-area {
         grid-area: log;
      }
      .quests-area {
         grid-area: quests;
      }
   }
</style>
