<script setup lang="ts">
   import { computed } from "vue";
   import { DURATION } from "#/CONST";
   import { wholeDivide, getPath } from "#/utilities";
   import { Socket } from "@/components/_index";
   import { usePages } from "@/services/_index";
   import { Hero } from "@/classes/_index";
   import { SocketRef } from "@/types";

   /* 🔧 services */
   const {
      shop: {
         barracks: { refreshInterval, sockets },
      },
   } = usePages();

   /* 🔗 reactive values */
   const { remaining } = refreshInterval;

   /* 💬 computed & parsed values  */
   const timer = computed(() => {
      // TODO: this is a pretty heavy computation... must implement event based callback emmits
      let ms = remaining.value;

      let [d, rh] = wholeDivide(ms, DURATION["1d"]);
      let [h, rm] = wholeDivide(rh, DURATION["1h"]);
      let [m, rs] = wholeDivide(rm, DURATION["1m"]);
      let [s] = wholeDivide(rs, DURATION["1s"]);

      let res: string[] = [];

      if (d) res.push(`${d}d`);
      if (res.length || h) res.push(`${h < 10 ? 0 : ""}${h}h`);
      if (res.length || m) res.push(`${m < 10 ? 0 : ""}${m}m`);
      res.push(`${s < 10 ? 0 : ""}${s}s`);

      return res.join(" ");
   });

   /* 🔧 utility functions */
   const refresh = () => {
      console.log("hi");
   };

   const getHeroInfo = (socket: SocketRef, prop: keyof Hero) => {
      if (!socket.value.item) return;
      if (!(socket.value.item instanceof Hero)) return;

      return socket.value.item[prop];
   };

   /* 📅 event handlers */
   const refreshNow = () => {
      refresh();
   };
</script>

<template>
   <div class="barracks">
      <div class="refresh-timer">
         <div class="timer-text" v-text="timer" />
         <div class="refresh-button" @click="refreshNow">
            <img :src="getPath('icons/refresh')" />
         </div>
      </div>
      <div class="hero-list">
         <div class="card" v-for="socket in sockets">
            <Socket class="socket" :socket="socket" />
            <div v-if="socket.value.item" class="info">
               <div class="name" v-text="`${getHeroInfo(socket, 'name')} ${getHeroInfo(socket, 'genderSymbol')}`" />
               <div class="other" v-text="`${getHeroInfo(socket, 'race')} | ${getHeroInfo(socket, 'class')}`" />
               <div class="level" v-text="`${getHeroInfo(socket, 'level')}`" />
            </div>

            <div v-if="!socket.value.item" class="sold-banner">
               <div class="sold-text" v-text="'sold!'" />
            </div>
         </div>
      </div>
      <div class="add-slot"></div>
   </div>
</template>

<style scoped lang="scss">
   @use "@/styles/index" as *;

   .barracks {
      @include fill;
      @include grid-area(auto, auto auto auto, "refresh-timer" "hero-list" "add-slot");
   }

   .refresh-timer {
      grid-area: refresh-timer;

      @include flex;
      gap: var(--s-md);
      .timer-text {
         font-family: Syne Mono;
      }
      .refresh-button {
         @include square(var(--s-base));
         img {
            @include fill;
            filter: var(--f-primary);
         }
      }
   }

   .hero-list {
      grid-area: hero-list;
      --card-padding: var(--s-sx);
      .card {
         position: relative;
         @include grid-area(min-content auto, 1fr, "socket info");
         @include size(256px, 64px);
         border: var(--b-app);
         margin-bottom: var(--s-sm);
         padding: var(--card-padding);
         &:last-child {
            margin: 0;
         }

         .socket {
            grid-area: socket;
         }

         .info {
            grid-area: info;
            @include fill;
            padding: var(--s-sx) var(--s-sm);
            @include grid-area(max-content auto, min-content auto, "name level" "other level");

            .name {
               grid-area: name;
               justify-self: start;
               align-self: start;
               font-size: var(--s-lg2);
               font-weight: bold;
            }

            .other {
               grid-area: other;
               justify-self: start;
               align-self: end;
            }

            .level {
               grid-area: level;
               justify-self: end;
               font-size: var(--s-xl);
               font-family: Syne Mono;
            }
         }
      }
      .sold-banner {
         position: absolute;
         @include flex;
         @include size(calc(100% + var(--card-padding)), calc(100% + var(--card-padding)));
         backdrop-filter: blur(1px);
         top: calc(-0.5 * var(--card-padding));
         left: calc(-0.5 * var(--card-padding));
         .sold-text {
            font-size: var(--s-xl2);
            font-family: Syne Mono;
            transform: rotate(8deg);
            color: var(--c-error);
            text-shadow: 0px 0px 15px var(--c-error);
         }
      }
   }
</style>
