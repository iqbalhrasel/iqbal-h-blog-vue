import { ref } from "vue"

interface EditableBlog {
  topicId: number;
  blogId: number;
  url: string;
  title: string;
  metaText: string;
  content: string;
}
const editableBlog = ref<EditableBlog>()

const showUpdateBlog = ref(false)
function toggleUpdateBlog() {
  showUpdateBlog.value = !showUpdateBlog.value
}

export function useBlogUpdate() {
  return { showUpdateBlog, toggleUpdateBlog, editableBlog }
}