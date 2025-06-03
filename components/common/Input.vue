<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  modelValue: [String, Number], // <-- corect
  type: { type: String, default: "text" },
  placeholder: String,
  required: { type: [Boolean, String], default: false },
  variant: String,
  className: String,
  name: String,
  handleChange: Function as PropType<(e: Event) => void>,
  handleBlur: Function as PropType<(e: FocusEvent) => void>,
  width: [Number, String],
  paddingLeft: String,
  autoComplete: [Boolean, String],
  children: null,
});

const emit = defineEmits(["update:modelValue"]);

const normalizedRequired = computed(() => {
  if (typeof props.required === "string") {
    return props.required.toLowerCase() === "true";
  }
  return props.required;
});

const onInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
  props.handleChange?.(e);
};
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
      @input="onInput"
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
      :value="props.modelValue" />
    <slot />
  </div>
</template>
