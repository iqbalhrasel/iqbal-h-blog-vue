import { ref } from "vue";
import type { BlogCardInfo } from "./useTypes";
import { axiosPublicApi } from "@/lib/axios";

const selectedTopic = ref(0)

const blogs = ref<BlogCardInfo[]>()
const totalPages = ref(0)

const showBlogsLoading = ref(false)
const showBlogsCards = ref(false)

const showError = ref(false)
const showReloadButton = ref(false)


async function fetchBlogs() {
  showBlogsLoading.value = true
  showBlogsCards.value = false
  showReloadButton.value = false

  try {
    const response = await axiosPublicApi.get(`/blogs?pageNo=${currentPage.value}&topicId=${selectedTopic.value}`)

    if (response.data) {
      blogs.value = response.data.blogs
      totalPages.value = response.data.totalPages
    }

    showBlogsLoading.value = false
    showBlogsCards.value = true

    showError.value = false
    showReloadButton.value = false

  } catch (e) {
    showBlogsLoading.value = false
    showError.value = true

    showReloadButton.value = true
  }
}

const currentPage = ref(1);
async function handlePageChange(page: number) {

  currentPage.value = page;

  await fetchBlogs();
}

async function searchBlogs() {
  currentPage.value = 1;

  await fetchBlogs()
}

async function handleReloadButton() {
  // fetchTopics()
  fetchBlogs()
}

export function useAllBlogs() {
  return { currentPage, selectedTopic, fetchBlogs, totalPages, handlePageChange, showBlogsCards, blogs, showError, showReloadButton, handleReloadButton, showBlogsLoading, searchBlogs }
}