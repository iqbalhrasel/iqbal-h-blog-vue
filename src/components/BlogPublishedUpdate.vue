<template>
  <div class="  mt-6">
    <h2 class="text-2xl mb-4 mt-6">Update blog</h2>
    <div class="border-b mb-4"></div>
    <section>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <p>Topic</p>
          <select class="py-2 px-4 rounded-lg" v-model="topicId">
            <option :value="topic.id" v-for="topic in topics">{{ topic.name }}</option>

          </select>
        </div>

        <input v-model="url" type="text" name="" id="" placeholder="url" class="border p-2 w-full rounded-lg">
        <input v-model="title" type="text" name="" id="" placeholder="Title" class="border p-2 w-full rounded-lg ">

        <textarea v-model="metaText" placeholder="Meta text" class="border p-2 w-full rounded-lg "></textarea>
      </div>

      <div class="mt-6">
        <div class="buttons flex items-center flex-wrap gap-x-4 border p-4" v-if="editor">

          <!-- button start -->
          <button @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }">
            <t_bold />
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            <t_italic />
          </button>
          <!-- <button @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            Strike
          </button> -->
          <!-- <button @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }">
            Code
          </button> -->
          <button @click="editor.chain().focus().unsetAllMarks().run()">
            <t_clear_format />
          </button>
          <!-- <button @click="editor.chain().focus().clearNodes().run()">
            Clear nodes
          </button> -->
          <button @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }">
            P
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            H1
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            H2
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            H3
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
            H4
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
            H5
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
            H6
          </button>
          <button @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            <t_bullet />
          </button>
          <button @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            <t_list_num />
          </button>
          <button @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }">
            <t_code />
          </button>
          <button @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }">
            ""
          </button>
          <button @click="editor.chain().focus().setHorizontalRule().run()">
            hr
          </button>
          <button @click="editor.chain().focus().setHardBreak().run()">
            br
          </button>
          <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
            <t_undo />
          </button>
          <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
            <t_redo />
          </button>

          <!-- button end -->
        </div>
        <EditorContent :editor="editor" />
      </div>

      <div class="mb-10 mt-5 space-x-10">
        <button class="bg-greenColor px-4 py-2 text-white font-semibold rounded-lg hover:bg-opacity-90"
          @click="updateBlog">Update</button>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
// 21
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import t_bold from '@/assets/icons/t_bold.vue'
import t_italic from '@/assets/icons/t_italic.vue'
import t_code from '@/assets/icons/t_code.vue'
import t_clear_format from '@/assets/icons/t_clear_format.vue'
import t_bullet from '@/assets/icons/t_bullet.vue'
import t_list_num from '@/assets/icons/t_list_num.vue'
import t_undo from '@/assets/icons/t_undo.vue'
import t_redo from '@/assets/icons/t_redo.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { axiosApi } from '@/lib/axios'
import { useUserLogin } from '@/composables/useUserLogin'
import type { Blog } from '@/composables/useTypes'
import { useNotification } from '@/composables/useNotification';
import { useTopics } from '@/composables/useTopics'

const { topics } = useTopics()
const { refreshAccessToken } = useUserLogin()
//notif pop up
const { triggerSuccess, triggerError } = useNotification()

const props = defineProps<{
  blog: Blog
}>()

const emits = defineEmits(['saveBlog'])

const topicId = ref(0)
const blogId = ref(0)
const url = ref('');
const title = ref('');
const metaText = ref('');

onMounted(() => {
  topicId.value = props.blog.topic.id
  blogId.value = props.blog.id
  url.value = props.blog.url
  title.value = props.blog.title
  metaText.value = props.blog.metaText
})

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'border p-4 min-h-52 max-h-52 overflow-y-auto',
    },

  },
  content: props.blog.content,
  extensions: [StarterKit],
})


const updateAttempt = ref(1)

async function updateBlog() {

  try {
    await axiosApi.put(`/admin/blogs/publish/${blogId.value}`, {
      topicId: topicId.value,
      url: url.value,
      title: title.value,
      metaText: metaText.value,
      content: editor.value?.getHTML()
    })


    updateAttempt.value = 1

    triggerSuccess('Success! Updated')

    setTimeout(() => {
      emits('saveBlog', {
        topicId: topicId.value,
        topicName: topics.value?.find(t => t.id === topicId.value)?.name,
        url: url.value,
        title: title.value,
        metaText: metaText.value,
        content: editor.value?.getHTML()
      })
    }, 1000)

  } catch (e) {

    if (updateAttempt.value > 0) {

      await refreshAccessToken()
      updateAttempt.value--

      return await updateBlog()
    } else {
      updateAttempt.value = 1
      triggerError(e)
    }

  }

}


onBeforeUnmount(() => {
  editor.value?.destroy()
})
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