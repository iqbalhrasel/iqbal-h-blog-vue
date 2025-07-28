<template>
  <div>
    <h2 class="text-2xl mb-4 mt-2">Drafted Questions</h2>
    <div class="border-b mb-4"></div>

    <section class="space-y-4 mb-20">

      <div v-if="isLoading">Loading...</div>

      <div v-if="showDrafts">
        <div v-for="(qna, index) in draftedQnAs" class="flex items-center justify-between space-x-4 space-y-2">
          <div
            class="flex items-center justify-between text-white font-medium bg-greenColor py-2 px-4 rounded-lg w-full">
            <div>{{ qna.question }}</div>

            <div class="text-cyan-300">{{ qna.topicName }}</div>

            <div class="flex items-center space-x-4">
              <button class="hover:bg-green-500 p-2 rounded-lg" @click="openUpdateIqModal(qna.id)">
                <ico_pen />
              </button>

              <button class="hover:bg-green-500 p-2 rounded-lg" @click="openDeleteModal(qna, index)">
                <ico_trash />
              </button>
            </div>
          </div>

          <button class="bg-slate-600 hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg"
            @click="publishIq(qna.id, index)">Publish</button>
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
            <div><span class="font-semibold">"{{ questionTitle }}"</span> interview question.</div>
            <div>Are you sure?</div>
          </div>

          <div class="flex justify-evenly gap-x-3">
            <button @click="toggleDeleteModal"
              class="mt-4 bg-gray-200 hover:bg-opacity-80 text-gray-700 font-semibold tracking-wider py-3 px-5 rounded-full">No,
              Keep it.</button>

            <button @click="deleteIq"
              class="mt-4 bg-red-600 hover:bg-opacity-80 text-white font-semibold tracking-wider py-3 px-5 rounded-full">Yes,
              Delete!</button>
          </div>

        </div>
      </div>
    </section>

    <div
      class="bg-black bg-opacity-25 fixed top-0 bottom-0 left-0 right-0 overflow-y-scroll flex justify-center items-center"
      v-if="showUpdateIqModal" @click.self="toggleUpdateIqModal">
      <IqDraftUpdate class="bg-white mx-52 p-10" />
    </div>


  </div>
</template>

<script setup lang="ts">
import ico_trash from '@/assets/icons/ico_trash.vue';
import ico_pen from '@/assets/icons/ico_pen.vue';
import { onMounted, ref } from 'vue';
import { useInterviewQs } from '@/composables/useInterviewQs';
import { axiosApi } from '@/lib/axios';
import { useUserLogin } from '@/composables/useUserLogin';
import { useNotification } from '@/composables/useNotification';
import IqDraftUpdate from './IqDraftUpdate.vue';
import { useQuestionUpdate } from '@/composables/useQuestionUpdate';

const { draftedQnAs, fetchDraftedQnAs } = useInterviewQs()
const { refreshAccessToken } = useUserLogin()
const { showUpdateIqModal, toggleUpdateIqModal, editableQuestion } = useQuestionUpdate()

//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const openUpdateModalAttempt = ref(1)
async function openUpdateIqModal(id: number) {
  try {
    const response = await axiosApi.get(`/admin/iq/draft/${id}`)
    editableQuestion.value = response.data

    openUpdateModalAttempt.value = 1

    toggleUpdateIqModal()
  } catch (e) {
    if (openUpdateModalAttempt.value > 0) {

      await refreshAccessToken()
      openUpdateModalAttempt.value--

      return await openUpdateIqModal(id)
    } else {
      triggerError(e)
      openUpdateModalAttempt.value = 1
    }
  }

}


const showDeleteModal = ref(false)

function toggleDeleteModal() {
  showDeleteModal.value = !showDeleteModal.value
}

const questionTitle = ref('')
const questionId = ref(0)
const questionIndex = ref(-1)

function openDeleteModal(data, index) {
  questionTitle.value = data.question
  questionId.value = data.id
  questionIndex.value = index

  toggleDeleteModal()
}

const deleteAttempt = ref(1)
async function deleteIq() {
  try {
    await axiosApi.delete(`/admin/iq/${questionId.value}`)

    draftedQnAs.value?.splice(questionIndex.value, 1)
    deleteAttempt.value = 1

    toggleDeleteModal()

    triggerSuccess('Success! QnA deleted.')
  } catch (e) {
    if (deleteAttempt.value > 0) {

      await refreshAccessToken()

      deleteAttempt.value--

      return await deleteIq()
    } else {
      deleteAttempt.value = 1
      triggerError(e)
    }
  }
}

const publishAttempt = ref(1)

async function publishIq(id: number, index: number) {
  try {
    await axiosApi.post(`/admin/iq/draft/${id}/publish`)

    draftedQnAs.value?.splice(index, 1)
    publishAttempt.value = 1

    triggerSuccess('Success! QnA Published.')
  } catch (e) {
    if (publishAttempt.value > 0) {

      await refreshAccessToken()

      publishAttempt.value--

      return await publishIq(id, index)
    } else {
      publishAttempt.value = 1
      triggerError(e)
    }
  }
}


const isLoading = ref(false)
const showDrafts = ref(false)
onMounted(async () => {

  isLoading.value = true
  await fetchDraftedQnAs()
  isLoading.value = false
  showDrafts.value = true
})



</script>