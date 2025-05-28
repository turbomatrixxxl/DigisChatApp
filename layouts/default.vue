<template>
  <div class="flex flex-col h-full">
    <div
      class="flex justify-center h-full rounded border border-slate-200 bg-white shadow-md">
      <aside class="flex flex-col h-full border-r border-slate-200 w-[27%]">
        <header
          class="flex items-center justify-between gap-[58px] h-[88px] px-[25px] pr-[30px] border-b border-slate-200">
          <p
            class="text-slate-800 text-[20px] font-medium leading-[1.3] h-[26px]">
            Active Conversations
          </p>
          <div
            class="inline-flex items-start gap-[10px] rounded border border-slate-200 bg-slate-100 text-slate-800 text-[14px] font-medium leading-[22px] px-[10px] py-[3px]">
            {{ activeChats }}
          </div>
        </header>
        <div
          class="flex flex-col gap-[25px] justify-between overflow-hidden p-[30px] pb-[84px] pl-[25px]">
          <Input
            v-model="search"
            class="text-slate-500 text-[14px] font-medium leading-[22px] py-[12px] pr-[40px] pl-[18px] relative hover:bg-slate-100 focus:bg-slate-100 transition duration-300"
            placeholder="Search...">
            <button
              class="absolute right-[13px] top-1/2 transform -translate-y-1/2 bg-transparent border-none outline-none">
              <FontAwesomeIcon
                :icon="['fas', 'magnifying-glass']"
                class="w-[18px] h-[18px] text-slate-500" />
            </button>
          </Input>
          <div class="flex flex-col h-[430px] overflow-y-auto">
            <ChatsList :search="search" />
          </div>
        </div>
      </aside>

      <!-- Aici se încarcă conținutul paginilor index.vue sau [chatId].vue -->
      <div class="flex flex-col flex-grow h-full">
        <Header />
        <main class="flex-grow bg-transparent">
          <slot />
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useChatsStore } from "~/store/chats";

import Input from "@/components/common/Input.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ChatsList from "@/components/ChatsList.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);

const search = ref("");
const chatsStore = useChatsStore();
const { selectActiveChats: activeChats } = storeToRefs(chatsStore);
</script>
