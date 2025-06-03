<template>
  <ClientOnly>
    <ChatsList :search="search" />
  </ClientOnly>
</template>

<script setup lang="ts">
import ChatsList from "./ChatsList.vue";

defineProps<{ search: string }>();
</script>
