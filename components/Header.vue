<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ActiveChatModal from "~/components/ActiveChatModal";

import { useChatsStore } from "~/store/chats";

// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Adaugă iconița în librărie
library.add(faEllipsisH);

const route = useRoute();
const chatId = computed(() => route.params.chatId);

const chatsStore = useChatsStore();
const chats = computed(() => chatsStore.chats);

const selectedChat = computed(() =>
  chats.value.find((chat) => chat.id === chatId.value)
);

const showModal = ref(false);
const toggleModal = () => (showModal.value = !showModal.value);
</script>

<template>
  <div class="relative">
    <header
      class="flex items-center justify-between px-7 h-[88px] border-b"
      :style="{
        borderColor: 'var(--Stroke)',
        background: 'transparent',
        width: '-webkit-fill-available',
      }">
      <div v-if="selectedChat" class="flex gap-2.5">
        <img
          :src="selectedChat.user.avatar"
          alt="Avatar"
          class="rounded-full w-[52px] h-[52px] flex-shrink-0" />
        <div class="flex flex-col justify-end">
          <span
            class="text-[var(--Dark,#1c2434)] font-satoshi font-medium text-[16px] leading-[24px]">
            {{ selectedChat.user.id }}
          </span>
          <span
            class="text-[var(--Text-color,#64748b)] font-satoshi font-medium text-[14px] leading-[22px]">
            Reply to message
          </span>
        </div>
      </div>

      <button
        @click="toggleModal"
        class="ml-auto flex items-center justify-center cursor-pointer bg-transparent border-none w-fit h-fit">
        <!-- folosește FontAwesome -->
        <FontAwesomeIcon
          :icon="['fas', 'ellipsis-h']"
          class="fill-[var(--Text-color,#64748b)]"
          style="width: 16px; height: 16px" />
      </button>
    </header>

    <ActiveChatModal
      v-if="showModal"
      :chats="chats"
      :closeModal="toggleModal" />
  </div>
</template>
