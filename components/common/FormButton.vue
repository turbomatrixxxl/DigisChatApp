<script setup lang="ts">
import type { PropType } from "vue";

// Props
const props = defineProps({
  type: {
    type: String as PropType<"button" | "reset" | "submit">,
    default: "button",
  },
  text: {
    type: String,
    required: true,
  },
  handlerFunction: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true, // 🔒 Obligă să trimiți funcția
  },
  variant: {
    type: String as PropType<string>,
    default: "",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

// Stiluri de bază
const baseClasses =
  "w-[280px] md:w-[300px] h-[50px] rounded-[20px] shadow-lg border-0 cursor-pointer px-0 flex justify-center items-center uppercase text-[18px] font-normal leading-[27px] tracking-[0.1em] transition-all duration-500 ease-in-out";

// Variante vizuale
const multiColorClasses = `
  text-white
  bg-gradient-to-r from-[#ffc727] via-[#9e40ba] to-[#7000ff]
  hover:scale-105
  hover:bg-[length:200%_100%]
  hover:bg-right
  active:scale-110
`;

const whiteButtonClasses = `
  text-[#623f8b]
  bg-[#fcfcfc]
  hover:scale-105
  hover:bg-gradient-to-r hover:from-white hover:via-[#623f8b] hover:to-white
  hover:bg-[length:200%_100%]
  hover:bg-right
  active:scale-110
`;

// Returnează clasele în funcție de variantă
const getVariantClasses = (variant: string) => {
  if (variant === "multiColorButton") return multiColorClasses;
  if (variant === "whiteButton") return whiteButtonClasses;
  return "";
};

// Safe emit
// const emitClick = (e: MouseEvent) => {
//   console.log("Button clicked");

//   if (props.handlerFunction) props.handlerFunction(e);
// };

const emitClick = (e: MouseEvent) => {
  props.handlerFunction(e);
};
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    @click="emitClick"
    :class="`${baseClasses} ${getVariantClasses(variant)}`">
    {{ text }}
  </button>
</template>
