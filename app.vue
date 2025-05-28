<script setup lang="ts">
import { onMounted } from "vue";
import { useChatsStore } from "~/store/chats";

const chatsStore = useChatsStore();

onMounted(() => {
  chatsStore.fetchData();
});
</script>

<template>
  <Suspense>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<script lang="ts">
import Loader from "~/components/common/Loader.vue";
</script>
