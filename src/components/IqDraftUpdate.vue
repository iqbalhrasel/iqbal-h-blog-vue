<template>
  <div class="rounded-xl">
    <h2 class="text-2xl">Update Interview Question</h2>
    <div class="border-b mb-4"></div>
    <section>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <p>Topic</p>

          <select v-model="topicId" class="py-2 px-4 rounded-lg" required>
            <option :value="topic.id" v-for="topic in topics">{{ topic.name }}</option>
          </select>

        </div>

        <input type="text" ref="questionInput" v-model="question" placeholder="Question" required
          class="border p-2 w-full rounded-lg ">

        <textarea ref="answerInput" v-model="answer" placeholder="Answer" required class="border p-2 w-full rounded-lg "
          rows="5"></textarea>
      </div>

      <div class=" mt-10 space-x-10">
        <button class="bg-greenColor px-4 py-2 text-white font-semibold rounded-lg hover:bg-opacity-90"
          @click="saveIqDraft">Save
          Draft</button>
        <button class="bg-purple-600 px-4 py-2 text-white font-semibold rounded-lg hover:bg-opacity-90"
          @click="publishDraftIq">Publish</button>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { axiosApi } from '@/lib/axios'
import { useUserLogin } from '@/composables/useUserLogin'
import { useTopics } from '@/composables/useTopics'

import { useNotification } from '@/composables/useNotification';
import { useQuestionUpdate } from '@/composables/useQuestionUpdate'
import { useInterviewQs } from '@/composables/useInterviewQs'

const { topics } = useTopics()
const { refreshAccessToken } = useUserLogin()
//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const { editableQuestion, toggleUpdateIqModal } = useQuestionUpdate()

const topicId = ref(0)
const id = ref(0)
const question = ref('');
const answer = ref('');

onMounted(() => {
  topicId.value = editableQuestion.value?.topicId
  id.value = editableQuestion.value?.id
  question.value = editableQuestion.value?.question
  answer.value = editableQuestion.value?.answer

})

const { draftedQnAs } = useInterviewQs()

const draftAttempt = ref(1)

async function saveIqDraft() {
  try {
    const response = await axiosApi.put(`/admin/iq/draft/${id.value}`, { //change url to admin
      topicId: topicId.value,
      question: question.value,
      answer: answer.value
    })

    const index = draftedQnAs.value?.findIndex(item => item.id === id.value)
    if (index) {
      draftedQnAs.value?.splice(index, 1, response.data)
    }

    draftAttempt.value = 1

    triggerSuccess('Success! draft saved.')

    setTimeout(() => toggleUpdateIqModal(), 1000)

  } catch (e) {

    if (draftAttempt.value > 0) {

      await refreshAccessToken()
      draftAttempt.value--

      return await saveIqDraft()
    } else {
      triggerError(e)
      draftAttempt.value = 1
    }
  }
}


const publishAttempt = ref(1)
async function publishDraftIq() {
  try {
    await axiosApi.post(`/admin/iq/draft/${id.value}/publish-content`, {
      topicId: topicId.value,
      question: question.value,
      answer: answer.value
    })

    const index = draftedQnAs.value?.findIndex(item => item.id === id.value)
    if (index) {
      draftedQnAs.value?.splice(index, 1)
    }

    publishAttempt.value = 1

    triggerSuccess('Success! QnA Published.')

    setTimeout(() => toggleUpdateIqModal(), 1000)

  } catch (e) {

    if (publishAttempt.value > 0) {

      await refreshAccessToken()
      publishAttempt.value--

      return await publishDraftIq()
    } else {
      triggerError(e)
      publishAttempt.value = 1

    }
  }
}




</script>

<style>
.is-active {
  @apply bg-gray-200 rounded-md px-2 py-1
}

.tiptap h1 {
  @apply text-3xl font-semibold
}

.tiptap h2 {
  @apply text-2xl font-semibold
}

.tiptap h3 {
  @apply text-xl font-semibold
}

.tiptap h4 {
  @apply text-lg font-semibold
}

.tiptap ul {
  @apply list-disc
}

.tiptap ol {
  @apply list-decimal
}

.tiptap blockquote {
  @apply bg-green-100
}

.tiptap pre {
  @apply bg-slate-600 text-purple-50
}
</style>