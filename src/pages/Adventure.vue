<script setup lang="ts">
   import { Inventory, QuestCard } from '@/components/_index';
   import useQuests from '@/services/Quests';

   const { boot, get } = useQuests();

   const quests = boot(1);
   const newQuest = () => quests.value.push(get());
</script>

<template>
   <div class="adventure-page">
      <div class="terminal"></div>
      <Inventory class="inventory" />
      <div class="quests">
         <div class="add" @click="newQuest">+</div>
         <div class="quest-list">
            <QuestCard v-for="quest in quests" :quest="quest" />
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .adventure-page {
      @include window-default($adventure-background);
      display: grid;
      grid-template-areas:
         'terminal adventures'
         'inventory adventures';
      grid-template-columns: min-content auto;
      grid-template-rows: auto min-content;
      gap: 6px;

      .inventory {
         grid-area: inventory;
      }
      .terminal {
         grid-area: terminal;
         background-color: blue;
      }
      .quests {
         grid-area: adventures;
         display: flex;
         flex-direction: column;
         justify-content: start;
      }
   }
</style>
