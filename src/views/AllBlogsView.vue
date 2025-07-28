<template>
  <div class="pt-28 lg:px-36 sm:px-16 px-12">

    <section>
      <div class="flex items-center space-x-5">

        <div class="flex items-center space-x-3">
          <p>Topic</p>

          <select v-model="selectedTopic" class="py-1 px-4 rounded-lg text-center bg-gray-200 border">
            <option value="0">Default</option>
            <option v-for="opt in topics" :value="opt.id">{{ opt.name }}</option>
          </select>
        </div>

        <button class=" bg-gray-700 text-white px-5 py-1 rounded-lg" @click="searchBlogs">Search</button>
      </div>

    </section>

    <div class=" border-b-2 mt-5"></div>

    <!-- reload button (default)-->
    <div class="flex justify-center mt-4 mb-6" v-if="showReloadButton">
      <ButtonReload @btn-click="handleReloadButton" icon-color="text-gray-400" class="text-white bg-black" />
    </div>



    <section class="my-7">
      <div class="grid md:grid-cols-2 gap-6 " v-if="showBlogsLoading">
        <!-- blog card loading-->
        <div class=" rounded-2xl py-4 px-6 animate-pulse" v-for="n in 4">
          <BlogCardMinLoading />
          <div class="mt-4">
            <div class="bg-gray-300 py-2 rounded-full"></div>
            <div class="bg-gray-300 py-2 rounded-full mt-2"></div>
            <div class="bg-gray-300 py-2 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 " v-if="showBlogsCards">
        <!-- blog card -->
        <div class=" rounded-2xl py-4 px-6 shadow hover:bg-blue-50" v-for="blog in blogs">
          <BlogCardMin :blog-card="blog" />
          <p>{{ blog.metaText }}</p>
        </div>
      </div>


      <!-- show error -->
      <div v-if="showError">
        <div class="text-xl text-red-600 text-center">Network error :(</div>
      </div>

    </section>

    <!-- add pagination -->
    <section>
      <Pagination :total-pages="totalPages" :current-page="currentPage" @page-change="handlePageChange" class="my-20" />
    </section>
  </div>
</template>

<script setup lang="ts">
import BlogCardMin from '@/components/BlogCardMin.vue';
import BlogCardMinLoading from '@/components/BlogCardMinLoading.vue';
import ButtonReload from '@/components/ButtonReload.vue';
import Pagination from '@/components/Pagination.vue';
import { useAllBlogs } from '@/composables/useAllBlogs';
import { useTopics } from '@/composables/useTopics';
import { onMounted } from 'vue';


const { currentPage, selectedTopic, fetchBlogs, totalPages, handlePageChange, showBlogsCards, blogs, showError, showReloadButton, handleReloadButton, showBlogsLoading, searchBlogs } = useAllBlogs()

const { topics } = useTopics()

onMounted(async () => {
  document.title = 'All Blogs'

  currentPage.value = 1;
  selectedTopic.value = 0;

  await fetchBlogs()
})

</script>