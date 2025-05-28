<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['emoji-select'])

function onEmojiSelect(event: any) {
  emit('emoji-select', event.detail.unicode)
}
</script>

<template>
  <emoji-picker @emoji-click="onEmojiSelect" />
</template>
