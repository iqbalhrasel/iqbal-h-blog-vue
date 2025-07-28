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
          @click="updatePublishedIq">Update</button>

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
import type { InterviewQ } from '@/composables/useTypes';

const props = defineProps<{ iq: InterviewQ }>()
const emits = defineEmits(['saveUpdatedIq'])

const { topics } = useTopics()
const { refreshAccessToken } = useUserLogin()
//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const topicId = ref(0)
const id = ref(0)
const question = ref('');
const answer = ref('');

onMounted(() => {
  topicId.value = topics.value?.find(t => t.name === props.iq.topicName)?.id
  id.value = props.iq.id
  question.value = props.iq.question
  answer.value = props.iq.answer

})

const updateAttempt = ref(1)

async function updatePublishedIq() {
  try {
    await axiosApi.put(`/admin/iq/publish/${id.value}`, {
      topicId: topicId.value,
      question: question.value,
      answer: answer.value
    })

    updateAttempt.value = 1

    triggerSuccess('Success! QnA Updated.')

    setTimeout(() => {
      emits('saveUpdatedIq', {
        topicName: topics.value?.find(t => t.id === topicId.value)?.name,
        id: id.value,
        question: question.value,
        answer: answer.value
      })
    }, 1000)

  } catch (e) {

    if (updateAttempt.value > 0) {

      await refreshAccessToken()
      updateAttempt.value--

      return await updatePublishedIq()
    } else {
      triggerError(e)
      updateAttempt.value = 1
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