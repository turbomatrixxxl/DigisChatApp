<script setup lang="ts">
import { onMounted } from "vue";
import { useChatsStore } from "~/store/chats";
import Loader from "~/components/common/Loader.vue";

const chatsStore = useChatsStore();

onMounted(() => {
  chatsStore.fetchData();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <template #fallback>
      <Loader />
    </template>
  </NuxtLayout>
</template>
