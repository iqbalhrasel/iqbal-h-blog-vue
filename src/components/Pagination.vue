<template>
  <div>
    <div class="flex flex-col md:flex-row gap-x-3 justify-center items-center space-y-3 md:space-y-0">
      <div class="space-x-2">
        <button class="btn-page"
          :class="{ 'border-blue-500': currentPage !== 1, 'btn-page-disabled': currentPage === 1 }" @click="goToPage(1)"
          :disabled="currentPage === 1">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
        <button class="btn-page"
          :class="{ 'border-blue-500': currentPage !== 1, 'btn-page-disabled': currentPage === 1 }"
          @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
      </div>

      <div class="space-x-3">
        <button class="btn-page border-blue-500" :class="{ active: page === currentPage }" v-for="page in visiblePages"
          :key="page" @click="goToPage(page)">{{ page }}</button>
      </div>


      <div class="space-x-2">
        <button class="btn-page "
          :class="{ 'border-blue-500': currentPage !== totalPages, 'btn-page-disabled': currentPage === totalPages }"
          @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
        <button class="btn-page"
          :class="{ 'border-blue-500': currentPage !== totalPages, 'btn-page-disabled': currentPage === totalPages }"
          @click="goToPage(totalPages)" :disabled="currentPage === totalPages">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface PageProps {
  totalPages: number;
  currentPage: number
}

const props = defineProps<PageProps>()
const emit = defineEmits(['pageChange'])

const visiblePages = computed(() => {
  const pages = []

  let start = Math.max(1, props.currentPage === props.totalPages ? props.currentPage - 4 : props.currentPage === props.totalPages - 1 ? props.currentPage - 3 : props.currentPage - 2)
  let end = Math.min(props.totalPages, props.currentPage === 1 ? props.currentPage + 4 : props.currentPage === 2 ? props.currentPage + 3 : props.currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit("pageChange", page);
  }
}
</script>

<style>
.btn-page {
  @apply px-4 py-1 rounded-full hover:bg-blue-300 hover:border-blue-300 hover:text-white font-bold border
}

.btn-page-disabled {
  @apply cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400 border-gray-400
}

.active {
  @apply bg-blue-500 text-white font-bold
}
</style>