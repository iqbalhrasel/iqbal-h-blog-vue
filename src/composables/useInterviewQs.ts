
import { ref } from "vue"
import type { InterviewQ, InterviewQDraft } from "./useTypes"
import { axiosApi, axiosPublicApi } from "@/lib/axios"
import { useUserLogin } from "./useUserLogin"

const { refreshAccessToken } = useUserLogin()

const selectedTopic = ref(0)

const questions = ref<InterviewQ[]>()
const totalPages = ref(0)

const showIqsLoading = ref(false)
const showIqsCards = ref(false)
const showIqsError = ref(false)

const showReloadButton = ref(false)
async function handleReloadButton() {
  fetchIqs()
}

async function fetchIqs() {
  showIqsLoading.value = true
  showIqsCards.value = false
  showReloadButton.value = false

  try {
    const response = await axiosPublicApi.get(`/iq?pageNo=${currentPage.value}&topicId=${selectedTopic.value}`)

    if (response.data) {
      questions.value = response.data.questions
      totalPages.value = response.data.totalPages
    }

    showIqsLoading.value = false
    showIqsCards.value = true
    showIqsError.value = false

    showReloadButton.value = false
  } catch (e) {
    showIqsLoading.value = false
    showIqsError.value = true

    showReloadButton.value = true
  }
}

async function searchIqs() {
  currentPage.value = 1;
  fetchIqs()
}

const currentPage = ref(1);

async function handlePageChange(page: number) {
  showIqsLoading.value = true
  showIqsCards.value = false

  currentPage.value = page;

  try {
    const response = await axiosPublicApi.get(`/iq?pageNo=${currentPage.value}&topicId=${selectedTopic.value}`)

    if (response.data) {
      questions.value = response.data.questions
      totalPages.value = response.data.totalPages
    }

    showIqsLoading.value = false
    showIqsCards.value = true
  } catch (e) {
    console.log(e);

  }
}

const draftedQnAs = ref<InterviewQDraft[]>()

const fetchDraftedQAttempt = ref(1)

async function fetchDraftedQnAs() {
  try {
    const response = await axiosApi.get('/admin/iq')
    draftedQnAs.value = response.data

    fetchDraftedQAttempt.value = 1
  } catch (e) {
    if (fetchDraftedQAttempt.value > 0) {

      await refreshAccessToken()

      fetchDraftedQAttempt.value--

      return await fetchDraftedQnAs()
    } else {
      fetchDraftedQAttempt.value = 1
    }
  }
}

export function useInterviewQs() {
  return { currentPage, selectedTopic, fetchIqs, totalPages, handlePageChange, showIqsCards, questions, showIqsError, showReloadButton, handleReloadButton, showIqsLoading, searchIqs, draftedQnAs, fetchDraftedQnAs }
}