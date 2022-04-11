<script setup lang="ts">
   interface TabLabelProps {
      title: string;
      active: boolean;
      onColor: string;
      offColor: string;
      callback: () => void;
   }

   let { title, active, onColor, offColor, callback } = defineProps<TabLabelProps>();
</script>

<template>
   <div
      class="tab-ctn"
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

<style lang="sass">

   .tab-ctn
      @include flex-center

      z-index: 0
      color: $text-normal
      width: 70px
      height: $s6
      padding: 0 $s2
      border-radius: $s2 $s2 0 0

      transition: color .25s

   .active
      color: $text-normal
      font-weight: bold
   .not-active
      color: $text-alternative
      font-weight: 500
</style>
