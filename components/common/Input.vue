<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// import type { FocusEvent, Event } from "vue";

const props = defineProps({
  type: { type: String, default: "text" },
  placeholder: String,
  required: { type: [Boolean, String], default: false },
  variant: String,
  className: String,
  name: String,
  handleChange: Function as PropType<(e: Event) => void>,
  handleBlur: Function as PropType<(e: FocusEvent) => void>,
  width: [Number, String],
  value: [String, Number],
  paddingLeft: String,
  autoComplete: [Boolean, String],
  children: null,
});

// Normalize required to boolean
const normalizedRequired = computed(() => {
  if (typeof props.required === "string") {
    return props.required.toLowerCase() === "true";
  }
  return props.required;
});
</script>

<template>
  <div
    class="relative flex items-center rounded-md border h-fit"
    :style="{
      width: props.width || 'auto',
      backgroundColor: 'var(--Gray)',
      borderColor: 'var(--Stroke)',
    }">
    <input
      :autoComplete="props.autoComplete ?? 'off'"
      :style="{ paddingLeft: props.paddingLeft ?? '0px' }"
      @input="props.handleChange"
      @blur="props.handleBlur"
      :name="props.name"
      :class="[
        'bg-transparent border-none w-full outline-none',
        props.variant === 'center' ? 'font-semibold text-center' : '',
        props.className,
      ]"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="normalizedRequired"
      :value="props.value" />
    <slot />
  </div>
</template>
