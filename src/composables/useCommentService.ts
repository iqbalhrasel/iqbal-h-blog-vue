
import { ref } from "vue";
import { axiosPublicApi } from "@/lib/axios";
import { useNotification } from "./useNotification";

const { triggerError } = useNotification()

const comment = ref('Comment');

const progress = ref(0);
const showProgress = ref(false);

const intervalTimer = ref<ReturnType<typeof setInterval> | null>(null);

function startPress(): void {
  progress.value = 0;
  comment.value = 'Hold button for 4 seconds'
  showProgress.value = true;

  onLongPress()
}

function onLongPress(): void {

  intervalTimer.value = setInterval(() => {
    progress.value += 20

    if (progress.value >= 100) {
      if (intervalTimer.value !== null) {
        clearInterval(intervalTimer.value)
        intervalTimer.value = null
        validateCommentProcess()
      }
    }

  }, 1000)
}

function cancelPress(): void {
  if (progress.value < 100) {
    comment.value = 'Faild to comment.'

    progress.value = 0;
    showProgress.value = false

    setTimeout(() => {
      comment.value = 'Comment'

    }, 2000);
  }


  if (intervalTimer.value) {
    clearInterval(intervalTimer.value)
    intervalTimer.value = null
  }

}

const holdToken = ref('')

const name = ref<string>()
const email = ref<string>()
const content = ref<string>()
const blogId = ref<number>()

const comments = ref<Comment[]>()

const nameInput = ref(null)
const emailInput = ref(null)
const contentInput = ref(null)

const isCommentSuccess = ref(false)
async function validateCommentProcess() {
  //validate comment form

  const isNameValid = nameInput.value.reportValidity()
  const isEmailValid = emailInput.value.reportValidity()
  const isContentValid = contentInput.value.reportValidity()

  if (!isNameValid || !isEmailValid || !isContentValid) {
    showProgress.value = false
    comment.value = 'Comment'
    return
  }

  try {
    const tokenResponse = await axiosPublicApi.post(`/comments/hold`)

    if (tokenResponse.data) {
      holdToken.value = tokenResponse.data.holdToken

      if (tokenResponse.data.holdToken === '' || tokenResponse.data.holdToken === null) {
        //no comment
      } else {

        const commentResponse = await axiosPublicApi.post(`/comments/add`, {
          holdToken: holdToken.value,
          name: name.value,
          email: email.value,
          content: content.value,
          blogId: blogId.value
        });

        if (commentResponse.data) {
          comments.value?.push(commentResponse.data)
          name.value = ''
          email.value = ''
          content.value = ''
        }

        isCommentSuccess.value = true

      }
    }
  } catch (e) {
    triggerError(e)
  }

  //server end
  if (isCommentSuccess.value) {
    comment.value = 'Done!'
  } else {
    comment.value = 'Aborted!'
  }
  showProgress.value = false

  setTimeout(() => {
    comment.value = 'Comment'

  }, 2000);
}




export function useCommentService() {
  return { startPress, cancelPress, progress, showProgress, comment, name, email, content, blogId, comments, nameInput, emailInput, contentInput }
}