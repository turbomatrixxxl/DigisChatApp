<template>
  <div class="contents">
    <div class="relative p-[20px] h-full w-full bg-transparent">
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full text-center">
        <div class="relative h-[170px] z-[-1]">
          <h1
            class="text-gradient absolute left-1/2 -translate-x-1/2 font-montserrat font-extrabold text-[160px]">
            Oops!
          </h1>
        </div>
        <h2
          class="font-montserrat text-black text-xl font-bold uppercase mt-9 mb-5">
          404 - Page not found
        </h2>
        <p class="font-montserrat text-black text-sm italic mb-10 mt-0">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <NuxtLink
          to="/chat/"
          class="font-montserrat text-sm uppercase bg-[#264061] text-white font-bold rounded-full px-8 py-4 inline-block shadow-[0_4px_15px_-5px_#0046d5] transition-opacity hover:opacity-90 hover:scale-105 active:opacity-80 active:scale-110 active:text-black">
          Go To Homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
// dacă vrei să adaugi ceva JS, dar aici nu e cazul
definePageMeta({
  layout: "default",
});
</script> -->

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

/* font Montserrat disponibilă */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}
</style>
