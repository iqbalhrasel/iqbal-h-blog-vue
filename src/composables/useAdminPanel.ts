import { ref } from "vue"
import type { BlogDraft } from "./useTypes"
import { axiosApi } from "@/lib/axios"
import { useUserLogin } from "./useUserLogin"

const { refreshAccessToken } = useUserLogin()

const selectedTopic = ref()

const url = ref('')
const urlInput = ref(null)
const title = ref('')
const titleInput = ref(null)

const metaText = ref('')
const metaTextInput = ref(null)

function validateInput() {
  urlInput.value.reportValidity()
  titleInput.value.reportValidity()
  metaTextInput.value.reportValidity()
}

//admin protect
async function addBlogDraft(bodyText: string, attempt = 1) {
  validateInput()

  try {
    const response = await axiosApi.post(`/admin/blogs/draft`, {
      topicId: selectedTopic.value,
      url: url.value,
      title: title.value,
      metaText: metaText.value,
      content: bodyText
    })

    draftedBlogs.value?.push(response.data)
    url.value = ''
    title.value = ''
    metaText.value = ''
  } catch (e) {

    if (e.response.status === 403 || e.response.status === 401) {
      if (attempt > 0) {

        await refreshAccessToken()
        return await addBlogDraft(bodyText, attempt - 1)
      } else {
        throw e
      }
    }
  }
}

const publishBlogAttempt = ref(1)
async function addBlogPublish(bodyText: string) {
  validateInput()
  try {
    await axiosApi.post(`/admin/blogs/publish`, {
      topicId: selectedTopic.value,
      url: url.value,
      title: title.value,
      metaText: metaText.value,
      content: bodyText
    })

    publishBlogAttempt.value = 1
    url.value = ''
    title.value = ''
    metaText.value = ''
  } catch (e) {

    if (publishBlogAttempt.value > 0) {

      await refreshAccessToken()
      publishBlogAttempt.value--

      return await addBlogPublish(bodyText)
    } else {

      publishBlogAttempt.value = 1
      throw e
    }

  }
}

const fetchDraftsAttempt = ref(1)

const draftedBlogs = ref<BlogDraft[]>()

async function fetchDraftedBlogs() {
  try {
    const response = await axiosApi.get('/admin/blogs/draft')
    draftedBlogs.value = response.data
    fetchDraftsAttempt.value = 1
  } catch (e) {

    if (fetchDraftsAttempt.value > 0) {

      await refreshAccessToken()
      fetchDraftsAttempt.value--

      return await fetchDraftedBlogs()
    } else {

      fetchDraftsAttempt.value = 1
      throw e
    }

  }
}

export function useAdminPanel() {
  return { selectedTopic, url, urlInput, title, titleInput, metaText, metaTextInput, addBlogDraft, addBlogPublish, draftedBlogs, fetchDraftedBlogs }
}