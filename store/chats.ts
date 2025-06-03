// stores/chats.ts
import { defineStore } from "pinia";
import axios from "axios";
import mockData from "~/data/mock-chats.json";

axios.defaults.baseURL = "https://dummyjson.com";

// Tipuri pentru mesaje și chat
interface Message {
  id: string;
  content: string;
  isInbox: boolean;
  sentAt: string;
  file?: string;
  fileType?: string;
}

interface User {
  id: string;
  avatar: string;
  isOnline?: boolean;
}

interface Chat {
  id: string;
  messages: Message[];
  user?: User;
}

export const useChatsStore = defineStore("chats", {
  state: () => ({
    activeChats: 0,
    chats: [] as Chat[],
    visitedChatIds: [] as string[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;

      // Detectăm dacă rulăm în mod static (generate) sau server-side
      const isStatic =
        process.env.NODE_ENV === "production" && typeof window === "undefined";

      try {
        if (isStatic) {
          // La build static, folosim doar mockData
          this.chats = mockData;
          console.log("Using mockData in static mode");
        } else {
          // În dev sau client-side, încercăm fetch-ul real
          const response = await axios.get("/c/5c9a-2b01-4cee-b469");
          this.chats = response.data;
        }
      } catch (error: any) {
        console.warn("API fetch failed, using mock data:", error.message);
        this.chats = mockData;
      } finally {
        this.loading = false;
      }
    },
    setChats(payload: Chat[]) {
      this.chats = payload;
    },
    updateChat(payload: { chatId: string; newMessages: Message[] }) {
      const { chatId, newMessages } = payload;
      const chat = this.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages.push(...newMessages);
      }
    },
    resetChats() {
      this.chats = [];
      this.activeChats = 0;
      this.visitedChatIds = [];
    },
    accessChat(payload: { chatId: string }) {
      const { chatId } = payload;
      if (!this.visitedChatIds.includes(chatId)) {
        this.visitedChatIds.push(chatId);
        this.activeChats += 1;
      }
    },
  },
  getters: {
    selectActiveChats: (state) => state.activeChats,
    selectChats: (state) => state.chats,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
    selectVisitedChatIds: (state) => state.visitedChatIds,
    selectChatById: (state) => {
      return (chatId: string) =>
        state.chats.find((c) => c.id === chatId) || null;
    },
  },
});
