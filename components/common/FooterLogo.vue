<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "default",
  },
});

const baseClasses = "flex flex-col items-center no-underline";
</script>

<template>
  <NuxtLink :to="'/'" :class="[baseClasses, variant]">
    <span
      :class="{
        'text-white font-normal capitalize': true,
        'text-[12.84px] leading-[19.26px] md:text-[17.1px] md:leading-[25.65px]':
          variant === 'navbarLogo',
        'text-[19.11px] leading-[28.67px] md:text-[26.96px] md:leading-[40.44px]':
          variant === 'formLogo',
      }">
      Sandbox
    </span>
  </NuxtLink>
</template>
