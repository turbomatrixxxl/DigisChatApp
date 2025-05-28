<script setup>
import { ref } from "vue";
import ModalFooter from "~/components/ModalFooter.vue";

const modalOpen = ref(false);
const openModal = () => {
  modalOpen.value = true;
};
const closeModal = () => {
  modalOpen.value = false;
};
</script>

<template>
  <footer
    @click="openModal"
    class="border border-white/20 text-center px-3 py-3 cursor-pointer text-white/60 bg-gradient-to-r from-[#2e1746] to-[#2e225f] transition-colors duration-300 ease-in-out hover:text-[#ff868d]"
    :style="{ borderColor: 'rgba(255,255,255,0.2)' }">
    <div
      class="md:flex md:flex-row md:justify-center md:gap-2"
      style="transition: all 0.3s ease 0s">
      <p>℗ &amp; © Digis 2025</p>
      <p class="md:ml-2">Powered by Radu Bogdan Naramzoiu</p>
    </div>

    <ModalFooter v-if="modalOpen" :closeModal="closeModal" />
  </footer>
</template>
