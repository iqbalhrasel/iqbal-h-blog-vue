<template>
  <button class="flex items-center space-x-2  px-4 py-2 rounded-lg" @click="handleClick">
    <span>Reload</span>
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-5 " :class="[{ 'animate-spin': spin }, iconColor]">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>

    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const spin = ref(false)

const emits = defineEmits(['btnClick'])
defineProps(['iconColor'])

function handleClick() {
  emits('btnClick')
  spin.value = true
}
</script>