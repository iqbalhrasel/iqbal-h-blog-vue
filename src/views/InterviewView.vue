<template>
  <div class="pt-28 lg:px-36 sm:px-16 px-12">
    <section>
      <div class="flex items-center space-x-5">
        <div class="flex items-center space-x-3">
          <p>Topic</p>

          <select v-model="selectedTopic" class="py-1 px-2 rounded-lg text-center bg-gray-200 border">
            <option value="0">Default</option>
            <option v-for="opt in topics" :value="opt.id">{{ opt.name }}</option>
          </select>
        </div>

        <button class=" bg-gray-700 text-white px-5 py-1 rounded-lg" @click="searchIqs">Search</button>
      </div>

    </section>

    <div class=" border-b-2 mt-5"></div>

    <div class="flex justify-center" v-if="showReloadButton">
      <ButtonReload @btn-click="handleReloadButton" icon-color="text-gray-400" class="bg-black text-white mt-6 mb-6" />
    </div>

    <section class="mb-10">
      <div class="grid md:grid-cols-2 grid-cols-1 justify-between gap-6 mt-7" v-if="showIqsLoading">
        <IqCardLoading class="w-full p-5 shadow rounded-lg" v-for="iq in 4" />
      </div>

      <!-- iq cards -->
      <div class="grid md:grid-cols-2 grid-cols-1 justify-between gap-6 mt-7" v-if="showIqsCards">
        <!-- loop -->
        <div v-for="(iq, index) in questions" class="w-full p-5 shadow rounded-lg">

          <div class="flex space-x-2 mb-5" v-if="isLoggedin && isAdmin">
            <button @click="openPublishedUpdateIqModal(index)"
              class="bg-black text-white px-4 py-1 rounded">Edit</button>
            <button @click="openDeleteModal(iq, index)"
              class="bg-red-600 font-medium text-white px-4 py-1 rounded">Delete</button>
          </div>

          <IqCard :iq="iq" />
        </div>

      </div>

      <div class="text-xl font-semibold text-red-600 text-center" v-if="showIqsError">Network error :(</div>
    </section>

    <!-- add pagination -->
    <section>
      <Pagination :total-pages="totalPages" :current-page="currentPage" @page-change="handlePageChange" class="my-20" />
    </section>

    <!-- update modal -->
    <section
      class="bg-black bg-opacity-25 fixed top-0 bottom-0 left-0 right-0 overflow-y-scroll flex justify-center items-center"
      v-if="showPublishedUpdateIqModal" @click.self="togglePublishedUpdateIqModal">
      <IqPublishedUpdate :iq="selectedQuestion" class="bg-white mx-52 p-10" @save-updated-iq="saveUpdatedIq" />
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
  </div>
</template>

<script setup lang="ts">
import ButtonReload from '@/components/ButtonReload.vue';
import IqCard from '@/components/IqCard.vue';
import IqCardLoading from '@/components/IqCardLoading.vue';
import IqPublishedUpdate from '@/components/IqPublishedUpdate.vue';
import Pagination from '@/components/Pagination.vue';
import { useAuthState } from '@/composables/useAuthState';
import { useInterviewQs } from '@/composables/useInterviewQs';
import { useNotification } from '@/composables/useNotification';
import { useTopics } from '@/composables/useTopics';
import { useUserLogin } from '@/composables/useUserLogin';
import { axiosApi } from '@/lib/axios';
import { onMounted, ref } from 'vue';

const { selectedTopic, searchIqs, showReloadButton, handleReloadButton, showIqsCards, showIqsError, showIqsLoading, questions, currentPage, totalPages, handlePageChange, fetchIqs } = useInterviewQs()

const { topics } = useTopics()
const { isAdmin, isLoggedin } = useAuthState()
const { triggerSuccess, triggerError } = useNotification()
const { refreshAccessToken } = useUserLogin()

const showPublishedUpdateIqModal = ref(false)

function togglePublishedUpdateIqModal() {
  showPublishedUpdateIqModal.value = !showPublishedUpdateIqModal.value
}

const selectedQuestion = ref()
const selectedIndex = ref(-1)
function openPublishedUpdateIqModal(index: number) {
  selectedIndex.value = index
  selectedQuestion.value = questions.value[index]
  togglePublishedUpdateIqModal()
}

function saveUpdatedIq(data) {
  questions.value?.splice(selectedIndex.value, 1, data)
  togglePublishedUpdateIqModal()
}

//delete
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

    questions.value?.splice(questionIndex.value, 1)
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

onMounted(async () => {
  document.title = 'Interview Questions'

  currentPage.value = 1;
  selectedTopic.value = 0;

  await fetchIqs();
})

</script>