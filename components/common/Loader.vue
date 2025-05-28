<!-- <template>
  <div
    class="flex justify-center items-center h-full w-full bg-gradient-to-r from-[#2e1746] via-[#2e225f] to-[#2e225f] relative overflow-hidden">
    <PulseLoader :size="80" color="#8b5cf6" />
  </div>
</template>

<script setup>
import { PulseLoader } from "vue3-spinner";
</script> -->

<template>
  <div
    class="flex justify-center items-center h-full w-full bg-gradient-to-r from-[#2e1746] via-[#2e225f] to-[#2e225f] relative overflow-hidden">
    <div class="pulse-loader"></div>
  </div>
</template>

<style scoped>
.pulse-loader {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #8b5cf6;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
