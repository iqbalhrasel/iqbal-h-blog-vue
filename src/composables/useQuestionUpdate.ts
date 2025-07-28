import { ref } from "vue"

interface EditableQuestion {
  topicId: number;
  id: number;
  question: string;
  answer: string;
}
const editableQuestion = ref<EditableQuestion>()

const showUpdateIqModal = ref(false)
function toggleUpdateIqModal() {
  showUpdateIqModal.value = !showUpdateIqModal.value
}

export function useQuestionUpdate() {
  return { showUpdateIqModal, toggleUpdateIqModal, editableQuestion }
}