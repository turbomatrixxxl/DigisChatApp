import { ref } from "vue";

export default function useToggle(initialValue = false) {
  const isOpen = ref(initialValue);

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return [isOpen, toggle] as const;
}
