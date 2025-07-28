<template>
  <div>
    <h2 class="text-2xl mb-4 mt-2">Add new question</h2>
    <div class="border-b mb-4"></div>
    <section>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <p>Topic</p>

          <select v-model="selectedTopic" class="py-2 px-4 rounded-lg" required>
            <option :value="topic.id" v-for="topic in topics">{{ topic.name }}</option>
          </select>

        </div>

        <input type="text" ref="questionInput" v-model="question" placeholder="Question" required
          class="border p-2 w-full rounded-lg ">

        <textarea ref="answerInput" v-model="answer" placeholder="Answer" required class="border p-2 w-full rounded-lg "
          rows="5"></textarea>
      </div>



      <div class="mb-20 mt-10 space-x-10">
        <button class="bg-greenColor px-4 py-2 text-white font-semibold rounded-lg hover:bg-opacity-90"
          @click="saveIqDraft">Save
          Draft</button>
        <button class="bg-purple-600 px-4 py-2 text-white font-semibold rounded-lg hover:bg-opacity-90"
          @click="publishIq">Publish</button>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { useTopics } from '@/composables/useTopics';
import { ref } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { useUserLogin } from '@/composables/useUserLogin';
import { axiosApi } from '@/lib/axios';
import { useInterviewQs } from '@/composables/useInterviewQs';

const { topics } = useTopics()
const { refreshAccessToken } = useUserLogin()
const { draftedQnAs } = useInterviewQs()
//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const questionInput = ref(null)
const answerInput = ref(null)

function validateInput() {
  questionInput.value.reportValidity()
  answerInput.value.reportValidity()
}


const selectedTopic = ref(0)
const question = ref('')
const answer = ref('')

const draftAttempt = ref(1)
async function saveIqDraft() {
  validateInput()

  try {
    const response = await axiosApi.post('/admin/iq/draft', {
      topicId: selectedTopic.value,
      question: question.value,
      answer: answer.value
    })

    draftedQnAs.value?.push(response.data)

    draftAttempt.value = 1

    question.value = ''
    answer.value = ''

    triggerSuccess('Success! QnA Draft added.')
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
async function publishIq() {
  validateInput()

  try {
    await axiosApi.post('/admin/iq/publish', {
      topicId: selectedTopic.value,
      question: question.value,
      answer: answer.value
    })

    publishAttempt.value = 1

    question.value = ''
    answer.value = ''

    triggerSuccess('Success! QnA Published.')
  } catch (e) {
    if (publishAttempt.value > 0) {
      await refreshAccessToken()

      publishAttempt.value--

      return await publishIq()
    } else {
      triggerError(e)
      publishAttempt.value = 1
    }
  }

}

</script>
