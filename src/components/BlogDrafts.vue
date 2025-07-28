<template>
  <div>
    <h2 class="text-2xl mb-4 mt-2">Drafted blogs</h2>
    <div class="border-b mb-4"></div>

    <section class="space-y-4 mb-20">
      <div v-if="isLoading">Loading</div>
      <!-- drafted blogs -->
      <div v-if="showDraftedBlogs" class="space-y-2">
        <div v-for="(draft, index) in draftedBlogs" class="flex items-center justify-between space-x-4">
          <div
            class="flex items-center justify-between text-white font-medium bg-greenColor py-2 px-4 rounded-lg w-full">
            <div>{{ draft.title }}</div>
            <div class="text-cyan-300">{{ draft.topicName }}</div>

            <div class="flex items-center space-x-4">
              <button class="hover:bg-green-500 p-2 rounded-lg" @click="editBlog(draft)">
                <ico_pen />
              </button>

              <button class="hover:bg-green-500 p-2 rounded-lg" @click="openDeleteModal(draft, index)">
                <ico_trash />
              </button>
            </div>
          </div>

          <button class="bg-slate-600 hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg"
            @click="publishBlog(draft.id, index)">Publish</button>
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
            <div><span class="font-semibold">"{{ blogTitle }}"</span> blog.</div>
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
</template>

<script setup lang="ts">
import ico_trash from '@/assets/icons/ico_trash.vue';
import ico_pen from '@/assets/icons/ico_pen.vue';
import { useBlogUpdate } from '@/composables/useBlogUpdate';
import { useAdminPanel } from '@/composables/useAdminPanel';
import { onMounted, ref } from 'vue';
import { axiosApi } from '@/lib/axios';
import type { BlogDraft } from '@/composables/useTypes';
import { useUserLogin } from '@/composables/useUserLogin';
import { useNotification } from '@/composables/useNotification';

const { toggleUpdateBlog, editableBlog } = useBlogUpdate()
const { draftedBlogs, fetchDraftedBlogs } = useAdminPanel()
const { refreshAccessToken } = useUserLogin()

//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const editAttempt = ref(1)

async function editBlog(draft: BlogDraft) {
  try {
    const response = await axiosApi.get(`/admin/blogs/draft/${draft.id}`)

    editableBlog.value = response.data
    toggleUpdateBlog()
    editAttempt.value = 1
  } catch (e) {

    if (editAttempt.value > 0) {

      await refreshAccessToken()
      editAttempt.value--

      return await editBlog(draft)
    } else {

      editAttempt.value = 1
      triggerError(e)
    }
  }

}

const blogTitle = ref('')
const blogId = ref(0)
const blogIndex = ref(-1)
const showDeleteModal = ref(false)

function toggleDeleteModal() {
  showDeleteModal.value = !showDeleteModal.value
}

function openDeleteModal(data, index) {
  blogTitle.value = data.title
  blogId.value = data.id
  blogIndex.value = index

  toggleDeleteModal()
}

const deleteAttempt = ref(1)
async function deleteBlog() {
  try {
    await axiosApi.delete(`/admin/blogs/${blogId.value}`)

    toggleDeleteModal()
    deleteAttempt.value = 1
    draftedBlogs.value?.splice(blogIndex.value, 1)

    triggerSuccess('Success! Deleted')
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

const isLoading = ref(false)
const showDraftedBlogs = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true

    await fetchDraftedBlogs()

    isLoading.value = false
    showDraftedBlogs.value = true
  } catch (e) {
    console.log(e);

  }

})


const publishAttempt = ref(1)
async function publishBlog(id: number, index: number) {
  try {
    await axiosApi.post(`/admin/blogs/draft/${id}/publish`)

    draftedBlogs.value?.splice(index, 1)
    publishAttempt.value = 1

    triggerSuccess('Success! Published.')
  } catch (e) {
    if (publishAttempt.value > 0) {

      await refreshAccessToken()
      publishAttempt.value--

      return await publishBlog(id, index)
    } else {
      triggerError(e)
      publishAttempt.value = 1
    }
  }
}




</script>