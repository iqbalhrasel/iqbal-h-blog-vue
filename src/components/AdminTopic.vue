<template>
  <div>
    <h1 class="text-center text-2xl pt-10">Topic Manager</h1>
    <div class="border-b mt-2"></div>

    <div class="mx-10 flex gap-x-14">
      <!-- add topic -->
      <section>
        <div class="mt-4 text-xl underline underline-offset-8 mb-4">Add Topic</div>

        <div class="flex flex-col">
          <input v-model="topic" type="text" placeholder="Topic name" class="p-2 border rounded-lg max-w-72">

          <div>
            <button class="bg-purple-700 px-7 py-2 rounded-lg text-white font-medium mt-4"
              @click="saveNewTopic">Add</button>
          </div>

        </div>
      </section>
      <!-- topic list -->
      <section>
        <div class="mt-4 text-xl underline underline-offset-8 mb-4">Topic List</div>

        <div class="space-y-4">
          <div v-for="(topic, index) in topics"
            class=" flex justify-between items-center min-w-72 bg-greenColor py-1 px-4 rounded text-white">
            <div>{{ topic.name }}</div>

            <div class="flex space-x-2">
              <button class="hover:bg-green-400 p-2 rounded-lg" @click="mountEditableTopic(topic, index)">
                <ico_pen />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- edit topic -->
      <section v-if="showEditTopic">
        <div class="mt-4 text-xl underline underline-offset-8 mb-4">Edit Topic</div>

        <div class="flex flex-col">
          <input v-model="editableTopicName" type="text" placeholder="Topic name"
            class="p-2 border rounded-lg max-w-72">

          <div>
            <button class="bg-orange-700 px-7 py-2 rounded-lg text-white font-medium mt-4"
              @click="saveEditableTopic">Edit</button>
          </div>

        </div>
      </section>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ico_pen from '@/assets/icons/ico_pen.vue';
import type { Topic } from '@/composables/useTypes';
import { useTopics } from '@/composables/useTopics';
import { useNotification } from '@/composables/useNotification';

const { topics, addTopic, updateTopic } = useTopics()
//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const showEditTopic = ref(false)
function toggleEditTopic() {
  showEditTopic.value = !showEditTopic.value
}

const editableTopicName = ref('')
const editableTopicId = ref(0)
const editableTopicIndex = ref(-1)

function mountEditableTopic(topic: Topic, index: number) {
  editableTopicName.value = topic.name
  editableTopicId.value = topic.id
  editableTopicIndex.value = index
  toggleEditTopic()
}

async function saveEditableTopic() {

  try {
    await updateTopic({ id: editableTopicId.value, name: editableTopicName.value }, editableTopicIndex.value)

    editableTopicName.value = ''

    toggleEditTopic()

    triggerSuccess('Success! Updated.')
  } catch (e) {
    triggerError(e)
  }
}

const topic = ref('')
async function saveNewTopic() {

  try {
    await addTopic(topic.value)
    topic.value = ''

    triggerSuccess('Success! Added')
  } catch (e) {
    triggerError(e)
  }
}




</script>