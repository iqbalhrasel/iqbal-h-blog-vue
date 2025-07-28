<template>
  <div class=" pt-16">
    <!-- hero -->
    <section class="flex flex-col items-center py-20 lg:px-36 sm:px-16 px-12 bg-blue-50">
      <p class="text-red-500 font-semibold text-lg text-center mb-4">BLOGS</p>
      <h1 class="text-gray-700 font-semibold md:text-5xl text-3xl text-center max-w-96">Blogs on my tech stack &
        programming</h1>
    </section>

    <div class="lg:px-36 sm:px-16 px-12 mt-8">
      <section class="flex justify-center mb-5" v-if="showReloadButton">
        <ButtonReload @btn-click="handleReloadButton" class="bg-black text-white" icon-color="text-gray-400" />
      </section>
      <!-- news and inerests -->
      <section class="mb-32">
        <h2 class="blog-head-txt">News and Interests</h2>
        <div class=" border-b-2"></div>

        <!-- loading -->
        <div class="flex lg:flex-row flex-col gap-8 mt-7" v-if="showLoadings">
          <BlogCardMinLoading />
          <BlogCardMinLoading />
          <BlogCardMinLoading />
        </div>
        <!-- card container -->
        <div class="flex lg:flex-row flex-col gap-8 mt-7" v-if="showNewsContent">
          <BlogCardMin v-for="blogCard in allContent?.newsInterests" :blog-card="blogCard" />
        </div>
        <!-- error -->
        <div class="blog-load-error" v-if="showError">Network error :(</div>
      </section>

      <!-- recent -->
      <section class="mb-20">
        <h2 class="blog-head-txt">Recent Posts</h2>
        <div class=" border-b-2"></div>

        <!-- large card loading-->
        <div class="flex lg:flex-row flex-col justify-between rounded-2xl mt-7 animate-pulse" v-if="showLoadings">
          <div>
            <div
              class=" xl:w-[520px] sm:w-[420px]  aspect-[1.45] bg-gray-300 bg-contain bg-no-repeat bg-center mx-auto overflow-hidden rounded-2xl">

              <div class="w-full h-full flex justify-center items-center text-3xl  text-center px-24">
                <div class=" w-full">
                  <div class="bg-gray-100 py-3 rounded-full"></div>
                  <div class="bg-gray-100 py-3 mx-6 rounded-full mt-3"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-10 py-10 w-full">
            <div class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
              <div class="bg-gray-300 max-w-28 w-full py-3 rounded-full "></div>
              <div class="bg-gray-300 max-w-28 w-full py-3 rounded-full "></div>
            </div>

            <div class="mt-6">
              <div class="bg-gray-300 w-full py-3 rounded-full"></div>
              <div class="bg-gray-300 w-full py-3 rounded-full mt-3"></div>
            </div>

            <div class="mt-6">
              <div class="bg-gray-300 w-full py-2 rounded-full"></div>
              <div class="bg-gray-300 w-full py-2 rounded-full mt-3"></div>
              <div class="bg-gray-300 w-full maxw4 py-2 rounded-full mt-3"></div>
            </div>
          </div>
        </div>

        <div class="flex lg:flex-row flex-col gap-8 mt-10" v-if="showLoadings">
          <!-- cards loading -->
          <BlogCardMaxLoading v-for="i in 3" />
        </div>

        <!-- large card -->
        <div class="flex lg:flex-row flex-col rounded-2xl mt-7" v-if="firstBlog">
          <div>
            <div
              class=" xl:w-[520px] sm:w-[420px]  aspect-[1.45] bg-[url('src/assets/images/dark_backg.png')] bg-contain bg-no-repeat bg-center lg:mx-auto overflow-hidden rounded-2xl">
              <p class="w-full h-full flex justify-center items-center text-3xl text-gray-300 text-center p-6">
                {{ firstBlog?.title }}</p>
            </div>
          </div>

          <div class="lg:px-10 lg:py-10 py-4">
            <div class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
              <div class="bg-gray-100 px-4 py-1 rounded-full ">{{ firstBlog?.topicName }}</div>
              <div>-</div>
              <div>{{ formatDate(firstBlog?.createdAt) }}</div>
            </div>

            <div class="mt-6">
              <RouterLink :to="{ name: 'blog-details', params: { id: firstBlog?.id, url: firstBlog?.url } }"
                class="text-2xl text-gray-700 hover:text-opacity-70 font-semibold">{{ firstBlog?.title
                }}
              </RouterLink>
            </div>

            <p class="mt-4 text-gray-500 font-medium">{{ firstBlog?.metaText }}</p>
          </div>
        </div>

        <!-- card container -->
        <div class="flex lg:flex-row flex-col gap-8 mt-10" v-if="showBlogContent">
          <!-- cards -->
          <BlogCardMax v-for="blogCard in secondToRestBlogs" :blog-card="blogCard" class="lg:w-1/3" />

        </div>

        <div class="blog-load-error" v-if="showError">Network error :(</div>
      </section>

      <!-- interview q -->
      <section class="mb-20">
        <h2 class="blog-head-txt">Interview Questions</h2>
        <div class=" border-b-2"></div>


        <!-- card loading -->
        <div class="flex md:flex-row flex-col justify-between gap-8 mt-7" v-if="showLoadings">
          <IqCardLoading />
          <IqCardLoading />
          <IqCardLoading />
        </div>

        <!-- card container -->
        <div class="flex md:flex-row flex-col justify-between gap-8 mt-7" v-if="showIqContent">
          <IqCard v-for="iq in allContent?.latest3InterviewQuestion" :iq="iq" />
        </div>

        <div class="blog-load-error" v-if="showError">Network error :(</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogCardMax from '@/components/BlogCardMax.vue';
import BlogCardMaxLoading from '@/components/BlogCardMaxLoading.vue';
import BlogCardMin from '@/components/BlogCardMin.vue';
import BlogCardMinLoading from '@/components/BlogCardMinLoading.vue';
import ButtonReload from '@/components/ButtonReload.vue';
import IqCard from '@/components/IqCard.vue';
import IqCardLoading from '@/components/IqCardLoading.vue';
import type { AllContent, BlogCardInfo } from '@/composables/useTypes';
import { useUtility } from '@/composables/useUtility';
import { axiosPublicApi } from '@/lib/axios';
import { onMounted, ref } from 'vue';

const { formatDate } = useUtility()

const allContent = ref<AllContent>();

const firstBlog = ref<BlogCardInfo>()
const secondToRestBlogs = ref<BlogCardInfo[]>()

const showLoadings = ref(false)

const showNewsContent = ref(false)
const showBlogContent = ref(false)
const showIqContent = ref(false)

const showError = ref(false)

onMounted(async () => {
  document.title = 'StackTrip Blog | Home'

  await fetchAllContent()
})

async function fetchAllContent() {
  showLoadings.value = true

  try {
    const response = await axiosPublicApi.get(`/blogs/all-content`)
    allContent.value = await response.data;

    firstBlog.value = allContent.value?.latest4Blogs[0]
    secondToRestBlogs.value = allContent.value?.latest4Blogs.slice(1)

    showLoadings.value = false;

    showNewsContent.value = true
    showBlogContent.value = true
    showIqContent.value = true

    showError.value = false

    showReloadButton.value = false
  } catch (e) {
    console.log(e);

    showLoadings.value = false;
    showError.value = true
    showReloadButton.value = true
  }
}
const showReloadButton = ref(false)

async function handleReloadButton() {
  await fetchAllContent()
}
</script>