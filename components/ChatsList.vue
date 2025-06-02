<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useChatsStore } from "~/store/chats";

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
});

const chatsStore = useChatsStore();
const router = useRouter();
const route = useRoute();

const reloadMap = ref<Record<string, number>>({});

// Load chats on component mount
onMounted(() => {
  if (!chatsStore.chats.length) {
    chatsStore.fetchData();
  }
});

// Reload image on error with delay to avoid flickering
function handleImageError(chatId: string) {
  setTimeout(() => {
    reloadMap.value[chatId] = (reloadMap.value[chatId] || 0) + 1;
  }, 1000);
}

// Get last inbox message for a chat
function getLastInboxMessage(chat: (typeof chatsStore.chats)[0]) {
  const inboxMessages = chat.messages.filter((msg) => msg.isInbox);
  if (!inboxMessages.length) return null;
  return inboxMessages.reduce((latest, msg) =>
    new Date(msg.sentAt) > new Date(latest.sentAt) ? msg : latest
  );
}

// Filter chats by search term (user id)
const filteredChats = computed(() =>
  chatsStore.chats.filter((chat) =>
    chat.user?.id?.toLowerCase().includes(props.search.toLowerCase())
  )
);

function onChatClick(chatId: string) {
  chatsStore.accessChat({ chatId });
  router.push(`/chat/${chatId}`);
}
</script>

<template>
  <div class="flex flex-col overflow-auto">
    <div v-if="chatsStore.loading" class="p-4 text-center text-gray-600">
      Loading chats...
    </div>
    <div v-if="chatsStore.error" class="p-4 text-center text-red-600">
      Error loading chats: {{ chatsStore.error }}
    </div>

    <ul
      v-if="!chatsStore.loading && !chatsStore.error"
      class="flex flex-col gap-2 p-0 list-none w-full overflow-auto">
      <li
        v-for="chat in filteredChats"
        :key="chat?.id"
        @click="onChatClick(chat?.id)"
        :class="[
          'flex items-center gap-3 p-2 rounded-md cursor-pointer',
          route.params.chatId === chat?.id
            ? 'bg-gray-300'
            : 'bg-white hover:bg-gray-100',
        ]">
        <div class="relative flex items-center justify-center w-fit">
          <img
            :key="reloadMap[chat.id] || 0"
            :src="chat?.user?.avatar || ''"
            alt="User avatar"
            loading="lazy"
            @error="() => handleImageError(chat?.id)"
            class="w-11 h-11 rounded-full flex-shrink-0 object-cover" />
          <span
            class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-300"
            :class="
              chat?.user?.isOnline ? 'bg-green-500' : 'bg-red-500'
            "></span>
        </div>
        <div class="flex flex-col overflow-hidden w-full">
          <p
            class="text-gray-900 font-medium text-sm truncate"
            :title="chat?.user?.id || ''">
            {{ chat?.user?.id }}
          </p>
          <p
            class="text-gray-500 text-sm font-medium truncate"
            :title="getLastInboxMessage(chat)?.content || 'No messages yet'">
            {{ getLastInboxMessage(chat)?.content || "No messages yet" }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
