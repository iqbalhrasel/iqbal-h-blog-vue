import { ref } from "vue";
import type { Topic } from "./useTypes";
import { axiosApi, axiosPublicApi } from "@/lib/axios";
import { useUserLogin } from "./useUserLogin";

const { refreshAccessToken } = useUserLogin()

const topics = ref<Topic[]>()

async function fetchTopics() {
  try {
    const response = await axiosPublicApi.get(`/topics`)
    if (response.data) {
      topics.value = response.data
    }
  } catch (e) {
    console.log(e);

  }
}

const addTopicAttempt = ref(1)
async function addTopic(name: string) {
  try {
    const response = await axiosApi.post(`/admin/topics`, {
      name: name
    })

    if (response.data) {
      topics.value?.push(response.data)
    }

    addTopicAttempt.value = 1
  } catch (e) {

    if (addTopicAttempt.value > 0) {
      await refreshAccessToken()

      addTopicAttempt.value--

      return await addTopic(name)
    } else {

      addTopicAttempt.value = 1
      throw e
    }
  }
}

const updateTopicAttempt = ref(1)
async function updateTopic(topic: Topic, index: number) {
  try {
    const response = await axiosApi.put(`/admin/topics/${topic.id}`, { name: topic.name })

    if (response.data) {
      topics.value?.splice(index, 1, topic)
    }

    updateTopicAttempt.value = 1

  } catch (e) {

    if (updateTopicAttempt.value > 0) {
      await refreshAccessToken()

      updateTopicAttempt.value--

      return await updateTopic(topic, index)
    } else {

      updateTopicAttempt.value = 1
      throw e
    }
  }
}

export function useTopics() {
  return { topics, fetchTopics, addTopic, updateTopic }
}