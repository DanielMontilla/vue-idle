<script setup lang="ts">
   import { Socket } from '@/components/_index';
   import { useSockets } from '@/services/_index';
   import { onMounted } from 'vue';

   const { createRandomRef } = useSockets();
   const socket = createRandomRef('none');
   const s = () => socket;
   socket.value.isLocked = true;
</script>

<template>
   <div class="barrack-card">
      <Socket :socket="s()" />
   </div>
</template>

<style scoped lang="scss">
   @use '@/styles/global' as *;

   .barrack-card {
   }
</style>
.
