<template>
  <div class="bg-gray-200 h-4 rounded-full ">
    <div class="progress" :style="`width: ${progress}%`"></div>
  </div>
</template>

<script setup lang="ts">
const { progress = 0 } = defineProps({
  progress: Number
})
</script>

<style>
@keyframes progress {
  0% {
    @apply bg-green-300
  }

  50% {
    @apply bg-green-300
  }

  75% {
    @apply bg-green-300
  }

  100% {
    @apply bg-green-300
  }
}

@-webkit-keyframes progress {
  0% {
    @apply bg-green-300
  }

  50% {
    @apply bg-green-300
  }

  75% {
    @apply bg-green-300
  }

  100% {
    @apply bg-green-300
  }
}

.progress {
  @apply h-full rounded-full transition-all ease-in-out duration-150;
  animation: progress 2s infinite linear;
}
</style>