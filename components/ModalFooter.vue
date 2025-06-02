<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMediaQuery } from "@vueuse/core";

import ModalLogo from "~/components/common/FooterLogo.vue";
import FormButton from "~/components/common/FormButton.vue";

import Radu from "~/assets/images/Radu.webp";

const { closeModal } = defineProps({
  closeModal: {
    type: Function,
    required: true,
  },
});

const modalContentRef = ref(null);

const handleClickOutside = (event) => {
  setTimeout(() => {
    if (
      modalContentRef.value &&
      !modalContentRef.value.contains(event.target)
    ) {
      closeModal();
    }
  }, 50); // întârziere minimă
};

const handleEsc = (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", handleEsc);
  window.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
  window.removeEventListener("keydown", handleEsc);
  window.removeEventListener("mousedown", handleClickOutside);
});

const isDesktop = useMediaQuery("(min-width: 768px)");
const animationClasses = "animate__animated animate__fadeInDown animate__slow";
</script>

<template>
  <div
    class="fixed inset-0 z-[150] cursor-default transition-all duration-300 ease-in-out bg-[rgba(34,13,91,0.23)] backdrop-blur-sm flex items-center justify-center">
    <div
      ref="modalContentRef"
      class="flex flex-col items-center gap-2 w-[333px] p-4 pt-2 sm:w-[533px] sm:rounded-lg sm:p-5 bg-[var(--primary-color)] shadow-[0_4px_60px_rgba(0,0,0,0.25)] backdrop-blur-[50px]">
      <ModalLogo v-if="isDesktop" variant="formLogo" />

      <h2 class="text-white text-xl font-semibold">Fullstack Developer:</h2>

      <div class="w-full flex flex-col items-center gap-6">
        <div
          :class="[
            'flex items-center justify-between p-2 w-full',
            animationClasses,
          ]"
          class="sm:grid sm:grid-cols-[60px_170px_180px_50px] sm:items-center"
          style="animation-delay: 0.5s">
          <img :src="Radu" alt="Radu" class="w-[60px] rounded-full" />
          <span class="ml-4 text-white text-center sm:text-left sm:ml-8">
            Naramzoiu Radu Bogdan
          </span>
          <em class="text-white text-center sm:text-left">
            Fullstack Developer
          </em>
          <div class="flex ml-4 sm:ml-0 gap-4 text-white text-2xl">
            <a
              href="https://github.com/turbomatrixxxl"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#ff868d] active:text-[#ff868d] transition-colors duration-300">
              <font-awesome-icon icon="fa-brands fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/radu-bogdan-naramzoiu-fullstack-developer/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#ff868d] active:text-[#ff868d] transition-colors duration-300">
              <font-awesome-icon icon="fa-brands fa-linkedin" />
            </a>
          </div>
        </div>
      </div>

      <FormButton
        type="button"
        text="Thank You"
        variant="whiteButton"
        :handlerFunction="closeModal"
        class="mt-4" />
    </div>
  </div>
</template>
