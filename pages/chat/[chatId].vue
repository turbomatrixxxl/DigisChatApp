<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
// import { useRoute } from "vue-router";
import { useChatsStore } from "~/store/chats";
// const router = useRoute();
// router.push("/chat");

const file = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const emojiPickerRef = ref<HTMLElement | null>(null);

const filePreviewUrl = computed<string | undefined>(() => {
  if (!file.value) return undefined;
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(file.value);
});

const chatsStore = useChatsStore();
const route = useRoute();
const chatId = route.params.chatId as string;

const message = ref("");
const showEmojiPicker = ref(false);
const emojiPickerReady = ref(false);

const selectedChat = computed(() => {
  return chatsStore.selectChatById(chatId) ?? null;
});

// onMounted(async () => {
//   if (!selectedChat.value) {
//     await chatsStore.fetchData();
//   }
//   await import("emoji-picker-element");
//   emojiPickerReady.value = true;
// });

// function onEmojiClick(event: any) {
//   const emoji = event.detail.emoji;
//   message.value += emoji;
// }

function formatTimestamp(timestamp: string) {
  let date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    const fixedTimestamp = timestamp.replace(
      /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):(\d{2})\.(\d{3})Z$/,
      "$1:59.$3Z"
    );
    date = new Date(fixedTimestamp);
  }
  if (isNaN(date.getTime())) return "";

  if (date.getSeconds() > 59) date.setSeconds(59);

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}-${formattedTime}`;
}

function handleSendMsg() {
  if (!message.value.trim() && !file.value) return;

  const content = message.value.trim();

  const fileUrl =
    typeof window !== "undefined" && file.value
      ? URL.createObjectURL(file.value)
      : null;

  const messageId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(); // fallback ID

  chatsStore.updateChat({
    chatId,
    newMessages: [
      {
        id: messageId,
        content,
        file: fileUrl ?? undefined,
        fileType: file.value?.type ?? undefined,
        isInbox: false,
        sentAt: new Date().toISOString(),
      },
    ],
  });

  message.value = "";
  showEmojiPicker.value = false;
  file.value = null;
}

function handleAttachClick() {
  fileInputRef.value?.click();
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files?.[0] ?? null;
  if (selectedFile) {
    file.value = selectedFile;
  }
}

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}
</script>

<template>
  <div>
    <div v-if="selectedChat" class="chatPage">
      <!-- Conținutul chat-ului tău -->
      <ul class="messageList">
        <li
          v-for="msg in selectedChat.messages"
          :key="msg.id"
          :class="[msg.isInbox ? 'outbox' : 'inbox']">
          <!-- conținutul mesajelor -->
          <template v-if="msg.isInbox">
            <span class="ownerName">Radu Bogdan</span>
            <span class="msgOutboxContent">{{ msg.content }}</span>
            <span v-if="msg.file" class="filePreview">
              <img
                v-if="msg.fileType?.startsWith('image/')"
                :src="msg.file"
                alt="Preview"
                class="imagePreview" />
              <a v-else :href="msg.file" target="_blank">{{ msg.file }}</a>
            </span>
            <span class="timestampOutbox">
              {{
                msg.sentAt ? formatTimestamp(msg.sentAt) : "Time not available"
              }}
            </span>
          </template>
          <template v-else>
            <span class="msgInboxContent">{{ msg.content }}</span>
            <span v-if="msg.file" class="filePreview">
              <img
                v-if="msg.fileType?.startsWith('image/')"
                :src="msg.file"
                alt="Preview"
                class="imagePreview" />
              <a v-else :href="msg.file" target="_blank">{{ msg.file }}</a>
            </span>
            <span class="timestampInbox">
              {{
                msg.sentAt ? formatTimestamp(msg.sentAt) : "Time not available"
              }}
            </span>
          </template>
        </li>

        <li v-if="file" class="filePreview">
          <img
            v-if="file.type.startsWith('image/')"
            :src="filePreviewUrl"
            alt="File Preview"
            class="imagePreview" />
          <span v-else>{{ file.name }}</span>
        </li>
      </ul>

      <div class="sendMsgCont">
        <input
          v-model="message"
          type="text"
          placeholder="Type something here..."
          class="sendMsgInput"
          @keydown.enter.prevent="handleSendMsg" />
        <button type="button" class="writeMsgButton" @click="handleAttachClick">
          <!-- SVG atașament -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--Text-color)"
            width="18"
            height="18"
            viewBox="0 0 24 24">
            <path
              d="M16.5 6a3 3 0 0 0-4.15 0L7 11.4a1.75 1.75 0 0 0 2.46 2.46l4.95-4.95a1.25 1.25 0 1 1 1.76 1.76l-5.65 5.66a3.75 3.75 0 1 1-5.3-5.3L11.2 5.1a5 5 0 0 1 7.08 7.07l-6.3 6.3a6.25 6.25 0 0 1-8.83-8.83l7.2-7.2a3.75 3.75 0 0 1 5.3 5.3L9.25 15.3" />
          </svg>
        </button>
        <input
          type="file"
          class="hidden"
          ref="fileInputRef"
          @change="handleFileChange" />
        <button type="button" class="emojiButton" @click="toggleEmojiPicker">
          😊
        </button>

        <!-- <ClientOnly>
          <emoji-picker
            v-if="emojiPickerReady"
            ref="emojiPickerRef"
            style="position: absolute; bottom: 55px; right: 15px"
            @emoji-click="onEmojiClick" />
        </ClientOnly> -->
      </div>
    </div>

    <IndexPage v-else />
  </div>
</template>
