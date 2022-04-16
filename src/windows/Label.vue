<script setup lang="ts">
   interface LabelProps {
      title: string;
      active: boolean;
      onColor: string;
      offColor: string;
      callback: () => void;
   }

   let { title, active, onColor, offColor, callback } = defineProps<LabelProps>();
</script>

<template>
   <div
      class="label-ctn"
      :class="active ? 'active' : 'not-active'"
      @click="callback()"
      :style="{
         backgroundColor: active ? onColor : offColor,
         fontStyle: active ? 'italic' : 'normal'
      }"
   >
      {{ title }}
   </div>
</template>

<style lang="scss">
   @use '@/styles/global' as *;

   .label-ctn {
      @include flex-center;

      z-index: 0;
      color: $text-normal;
      width: 70px;
      height: $s-6;
      padding: 0 $s-2;
      border-radius: $s-2 $s-2 0 0;

      transition: color 0.25s;
   }

   .active {
      color: $text-normal;
      font-weight: bold;
   }

   .not-active {
      color: $text-alternative;
      font-weight: 500;
   }
</style>
