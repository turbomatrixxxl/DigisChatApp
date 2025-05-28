<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useChatsStore } from "~/store/chats";

const props = defineProps<{
  closeModal: () => void;
}>();

const modalRef = ref<HTMLElement | null>(null);
const chatsStore = useChatsStore();
const router = useRouter();

const activeChats = computed(() =>
  chatsStore.chats.filter((chat) => chatsStore.visitedChatIds.includes(chat.id))
);

function handleClickOutside(event: MouseEvent) {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    props.closeModal();
  }
}

function goToChat(chatId: string) {
  router.push(`/chat/${chatId}`);
  props.closeModal();
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <div ref="modalRef" class="active-chat-modal">
    <p v-if="activeChats.length === 0" class="noActive">
      There are no active chats !
    </p>
    <ul v-else class="chatList">
      <li v-for="chat in activeChats" :key="chat.id" class="chatListItem">
        <a href="#" @click.prevent="goToChat(chat.id)">
          <img
            :src="chat.user?.avatar"
            alt="Avatar"
            loading="lazy"
            class="avatar" />
          <div class="usersInfo">
            <span class="userName">{{ chat.user?.id }}</span>
            <span class="reply">Reply to message</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import "~/assets/styles/variables.css";

.chatList {
  background: var(--Gray);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 210px;
  list-style: none;
  margin-left: 20px;
  overflow-y: auto;
  padding: 5px;
  position: absolute;
  z-index: 1000;
  width: fit-content;
}

.noActive {
  background: var(--Gray);
  border-radius: 8px;
  color: var(--Red);
  font-weight: 700;
  margin-left: 20px;
  padding: 5px;
  position: absolute;
  z-index: 1000;
  width: fit-content;
  height: fit-content;
}

.chatListItem > a {
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 5px 10px;
  text-decoration: none;
}

.avatar {
  border-radius: 52px;
  flex-shrink: 0;
  height: 52px;
  width: 52px;
  object-fit: cover;
}

.usersInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.userName {
  color: var(--Dark, #1c2434);
  font-family: Satoshi;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.reply {
  color: var(--Text-color, #64748b);
  font-family: Satoshi;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
</style>
