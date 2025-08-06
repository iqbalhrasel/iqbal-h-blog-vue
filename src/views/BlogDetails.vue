<template>
  <div class="pt-20">
    <!-- loading -->
    <div v-if="showLoading">
      <div class="flex items-center justify-center w-full h-96 bg-gray-50 ">
        <div role="status">
          <svg aria-hidden="true" class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-300 fill-red-500"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
        </div>
      </div>

    </div>

    <!-- blog -->
    <div class=" lg:px-80 sm:px-16 px-12" v-if="showContent">
      <div class="mt-8 space-x-1">
        <RouterLink :to="{ name: 'blog' }" class="text-slate-600 hover:text-opacity-80">
          blog
        </RouterLink>
        <span class="text-gray-400">>></span>
        <RouterLink :to="{ name: 'blog-all' }" class="text-slate-600 hover:text-opacity-80">
          posts
        </RouterLink>
      </div>

      <!-- hero -->
      <div class="flex flex-col items-center md:py-8 py-7">
        <div class=" text-sm font-semibold text-gray-500 bg-gray-100 mx-auto px-4 py-1 rounded-full">{{ blog?.topic.name
        }}
        </div>
        <h1 class="md:w-2/3 w-96 text-4xl font-semibold text-center mt-6 text-gray-700">{{ blog?.title }}
        </h1>

        <div class=" flex items-center gap-x-2 mt-5">
          <img src="../assets/images/profile.jpg" alt="" class="size-6 rounded-full border-gray-400 border-2">

          <div>
            <span class="text-gray-400">By </span>
            <span class=" text-slate-600 ">{{ blog?.authorName }}</span>
          </div>
        </div>
        <div class="flex text-gray-400 text-sm gap-x-3 mt-3">
          <div>Added: {{ formatDate(blog?.createdAt) }},</div>
          <div>Last modified: {{ formatDate(blog?.lastModified) }}</div>
        </div>

        <!-- edit delete button -->
        <div v-if="isAdmin && isLoggedin" class="flex justify-center space-x-4">
          <button class="bg-black hover:bg-opacity-80 px-10 py-1 text-white mt-4 rounded"
            @click="editPublishedBlog">Edit</button>

          <button class="bg-red-700 hover:bg-opacity-80 px-8 py-1 text-white font-medium mt-4 rounded"
            @click="toggleDeleteModal">Delete</button>
        </div>

      </div>

      <div class=" border-b-2 mt-3"></div>

      <!-- body -->
      <section class="mt-6 text-gray-700" v-html="safeContent" id="blog-body"></section>

      <div class=" border-b-2 mt-5"></div>
      <!-- add comment -->
      <section class="mt-2">
        <div class="text-xl font-medium text-gray-700 mb-3">Write your comment</div>

        <div>
          <div ref="formContainer" class="flex flex-col space-y-2">
            <input type="text" v-model="name" ref="nameInput" placeholder="Name" class="border p-2 rounded-lg" required>

            <input type="email" v-model="email" ref="emailInput" placeholder="Email" class="border p-2 rounded-lg"
              required>

            <textarea v-model="content" ref="contentInput" placeholder="Write your comment"
              class="border p-2 rounded-lg" required></textarea>
          </div>

          <div class="text-sm flex items-center space-x-1 mt-4">

            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>

            <span class="text-gray-500">Comment is encrypted with 2-step validation.</span>
          </div>

          <button @mousedown="startPress" @touchstart="startPress" @mouseup="cancelPress" @touchend="cancelPress"
            class="bg-greenColor rounded-xl hover:bg-opacity-95 mt-1">
            <ProgressBar :progress="progress" v-if="showProgress" class="mx-3 mt-2" />
            <div class=" text-sm font-semibold text-white px-20 py-3 ">
              {{ comment }}
            </div>
          </button>
        </div>
      </section>

      <!-- comment list -->
      <section class="mb-10">
        <div class="text-2xl font-medium text-gray-700 mt-5 underline underline-offset-8">{{ comments?.length }}
          Comments</div>

        <!-- comment container -->
        <div class="mt-4 space-y-4">
          <!-- comment card -->
          <div v-for="comment in comments" class="shadow p-4 rounded-xl">
            <div class="flex space-x-3">
              <div class="w-10">
                <div class="bg-purple-400 size-10 rounded-full text-center text-xl text-white font-bold pt-1 mt-2">{{
                  comment.name.charAt(0).toString().toUpperCase() }}
                </div>
              </div>

              <div>
                <div class="flex items-center space-x-2">
                  <div class="text-purple-700 font-semibold">{{ comment.name }}</div>
                  <div class="text-gray-300 text-xl">•</div>
                  <div class="text-slate-500 font-semibold">{{ formatDateTime(comment.createdAt) }}</div>
                </div>

                <div class="mt-1">{{ comment.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- delete modal -->
      <section class="fixed right-0 left-0 top-0 bottom-0 flex items-center bg-black bg-opacity-25"
        @click.self="toggleDeleteModal" v-if="showDeleteModal">
        <!-- modal -->

        <div class="bg-white lg:w-1/3 md:w-1/2 flex flex-col px-8 py-6 rounded-2xl mx-auto">
          <div class="flex flex-col">

            <div class="flex justify-center mb-4">
              <div class="bg-red-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="size-7 text-red-600">
                  <path fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <div class="text-2xl text-gray-700 font-semibold mb-2 text-center">Delete Blog</div>

            <div class="text-center text-lg space-y-1">
              <div>You're going to delete the</div>
              <div><span class="font-semibold">"{{ blog?.title }}"</span> blog.</div>
              <div>Are you sure?</div>
            </div>

            <div class="flex justify-evenly gap-x-3">
              <button @click="toggleDeleteModal"
                class="mt-4 bg-gray-200 hover:bg-opacity-80 text-gray-700 font-semibold tracking-wider py-3 px-5 rounded-full">No,
                Keep it.</button>

              <button @click="deleteBlog"
                class="mt-4 bg-red-600 hover:bg-opacity-80 text-white font-semibold tracking-wider py-3 px-5 rounded-full">Yes,
                Delete!</button>
            </div>

          </div>
        </div>
      </section>

    </div>

    <div class="bg-black bg-opacity-25 fixed top-0 bottom-0 left-0 right-0 overflow-y-scroll" v-if="showUpdateBlogModal"
      @click.self="toggleUpdateBlogModal">
      <BlogPublishedUpdate class="bg-white mx-52 p-10" :blog="blog" @save-blog="saveBlog" />
    </div>

  </div>

</template>

<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import type { Blog } from '@/composables/useTypes';
import { useUtility } from '@/composables/useUtility';
import { onMounted, ref } from 'vue';
import DOMPurify from 'dompurify';
import { useCommentService } from '@/composables/useCommentService';
import { useRouter } from 'vue-router';
import { axiosApi, axiosPublicApi } from '@/lib/axios';
import { useAuthState } from '@/composables/useAuthState';
import BlogPublishedUpdate from '@/components/BlogPublishedUpdate.vue';
import { useUserLogin } from '@/composables/useUserLogin';
import { useNotification } from '@/composables/useNotification';

const props = defineProps(['id', 'url'])

const { startPress, cancelPress, progress, showProgress, comment, name, email, content, blogId, comments, nameInput, emailInput, contentInput } = useCommentService()

const { formatDate, formatDateTime } = useUtility()
const { isAdmin, isLoggedin } = useAuthState()
const { refreshAccessToken } = useUserLogin()
//notif pop up
const { triggerError, triggerSuccess } = useNotification()

const blog = ref<Blog>()
const safeContent = ref<string>('')

const showLoading = ref(false)
const showContent = ref(false)

const router = useRouter();

onMounted(async () => {
  showLoading.value = true

  try {
    const response = await axiosPublicApi.get(`/blogs/${props.id}`)

    blog.value = await response.data
    blogId.value = blog.value?.id
    comments.value = response.data.comments

    const rawHtml = blog.value?.content || ''

    safeContent.value = DOMPurify.sanitize(rawHtml)

    showLoading.value = false
    showContent.value = true

  } catch (e) {

    if (e.response?.status === 404) {
      router.push({ name: 'not-found' })
    }
    else {
      router.push({ name: 'error' })
    }
  }
})

const showUpdateBlogModal = ref(false)
function toggleUpdateBlogModal() {
  showUpdateBlogModal.value = !showUpdateBlogModal.value
}

function saveBlog(data) {

  blog.value.topic.id = data.topicId
  blog.value.topic.name = data.topicName
  blog.value.url = data.url
  blog.value.title = data.title
  blog.value.metaText = data.metaText

  const rawContent = data.content
  safeContent.value = DOMPurify.sanitize(rawContent)
  toggleUpdateBlogModal()

}

async function editPublishedBlog() {
  toggleUpdateBlogModal()
}


const showDeleteModal = ref(false)

function toggleDeleteModal() {
  showDeleteModal.value = !showDeleteModal.value
}

const deleteAttempt = ref(1)
async function deleteBlog() {
  try {
    await axiosApi.delete(`/admin/blogs/${blog.value?.id}`)

    toggleDeleteModal()
    deleteAttempt.value = 1

    triggerSuccess('Success! Blog deleted.')
    setTimeout(() => router.push({ name: 'blog' }), 1000)

  } catch (e) {

    if (deleteAttempt.value > 0) {

      await refreshAccessToken()
      deleteAttempt.value--

      return await deleteBlog()
    } else {
      triggerError(e)
      deleteAttempt.value = 1
    }
  }
}



</script>

<style>
#blog-body h2 {
  @apply font-bold mt-8 mb-1 text-2xl
}

#blog-body h3 {
  @apply font-bold mt-3 mb-1 text-xl text-gray-600
}

#blog-body h4 {
  @apply font-bold mt-2 mb-1 text-lg text-gray-500
}

#blog-body p {
  @apply mb-2 text-lg leading-8
}

#blog-body ul {
  @apply list-disc mx-10
}

#blog-body blockquote {
  @apply bg-gray-100 text-gray-600 font-medium pl-10 pt-2 pb-1 mt-2 italic border-l-8 rounded-l-md border-l-gray-300
}

#blog-body p code {
  @apply bg-gray-200 px-2 rounded
}

#blog-body pre code {
  @apply block relative bg-slate-800 text-slate-100 font-mono text-sm leading-relaxed p-6 rounded-xl shadow-md whitespace-pre overflow-x-auto;

  @apply max-w-full;

  /* @apply block relative bg-slate-800 text-slate-100 font-mono text-sm leading-relaxed p-6 rounded-lg shadow-md overflow-x-auto whitespace-pre; */
}
</style>