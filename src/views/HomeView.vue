<template>
  <div>
    <section class="bg-bgLight ">
      <div class=" py-24 xl:px-36 lg:px-36 md:px-20 md:py-32 flex flex-col md:flex-row justify-between items-center">

        <div class="lg:space-y-5 space-y-2 text-center md:text-start md:mr-10">
          <p class="text-xl md:text-2xl text-gray-300 font-semibold">Hi There</p>
          <p class="xl:text-6xl lg:text-5xl text-4xl text-gray-300 font-semibold">
            I'm
            <span class="text-red-500">{{ details.name }}</span>
          </p>
          <p class="lg:text-4xl text-2xl text-gray-300">I am a WebApp Developer</p>
        </div>

        <img src="../assets/images/laptop.png" alt="" class="xl:w-[30rem] lg:w-[25rem] md:w-[20rem] w-72 mt-10 lg:mt-0">

      </div>
    </section>

    <!-- my services -->
    <section class="bg-bgDeep py-24">
      <p class="section-red-txt">Services</p>
      <h2 class="section-head-txt">My Services</h2>
      <div class="flex flex-col items-center mt-6">
        <p class="md:w-1/3 mx-10 md:mx-0 text-center text-gray-300">Lorem ipsum, dolor sit amet consectetur adipisicing
          elit.
          Maiores
          pariatur tempore
          ab
          ullam atque
          consequatur
          ducimus inventore natus ipsa eum!</p>
        <div class="section-red-line mt-10"></div>
      </div>

      <div class="mt-14 sm:mx-36 mx-10">
        <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-8">

          <ServiceCard v-for="(service, index) in services" :component="service.component" :h3="service.h3"
            :paragraph="service.paragraph" :class="{ 'xl:col-start-2': index === 3 }" />

        </div>
      </div>
    </section>

    <!-- about me -->
    <section class="bg-bgLight py-20">
      <h2 class="section-head-txt">About Me</h2>
      <div class="flex flex-col items-center mt-6">
        <p class="lg:w-1/3 w-2/3 text-center text-gray-300">
          Getting to know each other builds trust and creates a comfortable space where we can work together with
          confidence and ease.
        </p>
        <div class="section-red-line mt-10"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 md:mx-36 mx-24 mt-10">
        <div class="flex justify-center lg:justify-start">
          <div class="size-32 md:size-60 ring-4 ring-cyan-400 rounded-full xl:ml-40 lg:ml-32 mt-4">
            <img src="../assets/images/profile.jpg" alt="" class="overflow-hidden rounded-full p-1">
          </div>
        </div>


        <div class="flex flex-col items-center lg:items-start mt-8 lg:mt-0">
          <p class=" text-gray-300 text-center lg:text-start">
            Hi, I am <span class="text-red-400 font-semibold">{{ details.name }}</span>. I'm a passionate full-stack
            developer
            specializing in Spring Boot,
            Vue.js, and
            API security. I love building
            scalable web applications, optimizing performance, and continuously learning new technologies to improve my
            skills.
          </p>

          <div class="mt-10 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start">
            <div class="space-y-6">

              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">Phone:</p>
                <p class="text-gray-300">{{ details.phone }}</p>
              </div>
              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">Email:</p>
                <p class="text-gray-300">{{ details.email }}</p>
              </div>
            </div>

            <div class="space-y-6 lg:mr-24 mt-6 md:mt-0">

              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">LinkedIn:</p>
                <p class="text-gray-300">{{ details.linkedin }}</p>
              </div>
              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">Github:</p>
                <p class="text-gray-300">{{ details.github }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center w-full mt-10">
            <a :href="`${details.resume}?format=pdf`" target="_blank"
              class="border-2 border-red-400 px-10 py-3 rounded-full text-cyan-300 font-medium hover:bg-red-400 hover:text-white transition duration-300 mx-auto">Download
              Resume</a>

            <router-link :to="{ name: 'about' }" class="text-cyan-300 flex hover:underline mt-10">
              <span>Know more about me</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6 ml-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </router-link>
          </div>

        </div>
      </div>

    </section>

    <!-- expertise -->
    <section class="px-20 md:px-28 xl:px-40 bg-bgDeep py-24 grid md:grid-cols-2">
      <div class="md:mr-14 flex flex-col items-center md:items-start">
        <p class="section-red-txt mt-6">i'm expert on</p>
        <h2 class="section-head-txt md:text-start">Let's Work Together</h2>
        <p class="md:pr-20 mt-12 mb-14 text-gray-300 text-center md:text-start leading-relaxed">
          Great projects start with trust and collaboration! I'm here to bring your ideas to life with expertise,
          creativity, and seamless communication. Let's build something amazing together!
        </p>


        <a href="#contact"
          class="border-2 border-red-400 px-10 py-3 rounded-full text-white font-semibold hover:bg-red-400 transition duration-300 mx-auto mb-4 md:mb-0">Hire
          Me Now</a>

      </div>

      <div class="lg:ml-20 mt-6 flex flex-col items-center bg-[#24263B] rounded-2xl">
        <div class="w-96 p-4 mt-3 rounded-xl flex flex-col items-center">
          <p class="text-3xl text-cyan-200 font-semibold mb-4 glowing-text up">Languages</p>
          <div class="flex gap-8">
            <div class="flex flex-col items-center">
              <p class="text-center mb-1 font-semibold text-cyan-300">Java</p>
              <img src="../assets/icons/java.svg" alt="" class="size-16 bg-white rounded-md p-1">
            </div>

            <div class="flex flex-col items-center">
              <p class="text-center mb-1 font-semibold text-cyan-300">JavaScript</p>
              <img src="../assets/icons/javascript.svg" alt="" class="size-16 rounded-md ">
            </div>

            <div class="flex flex-col items-center">
              <p class="text-center mb-1 font-semibold text-cyan-300">TypeScript</p>
              <img src="../assets/icons/typescript.svg" alt="" class="size-16 rounded-md ">
            </div>
          </div>
        </div>

        <div class="w-96 p-4 mt-10 rounded-xl flex flex-col items-center ">
          <p class="text-3xl text-cyan-200 font-semibold mb-4 glowing-text up">Frameworks</p>
          <div class="flex gap-8">
            <div class="flex flex-col items-center">
              <p class="text-center mb-1 font-semibold text-cyan-300">Spring Boot</p>
              <img src="../assets/icons/spring-boot.svg" alt="" class="size-16 rounded-md p-1">
            </div>

            <div class="flex flex-col items-center">
              <p class="text-center mb-1 font-semibold text-cyan-300">Vue JS</p>
              <img src="../assets/icons/vue-js.svg" alt="" class="size-16 rounded-md ">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- blogs and contact me -->
    <section class="bg-bgLight py-20">
      <!-- blogs -->
      <div class="mb-24">
        <p class="section-red-txt mt-6">Latest Posts</p>
        <h2 class="section-head-txt">Latest Blogs</h2>
        <div class="flex flex-col items-center mt-6">
          <p class="md:w-1/3 w-2/3 text-center text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum voluptatum tempore alias aliquam deserunt
            provident ut.
          </p>
          <div class="section-red-line mt-10"></div>
        </div>

        <div>

          <!-- loading -->
          <div class="flex flex-col lg:flex-row justify-center items-center gap-8 mt-10 md:mx-36 mx-10"
            v-if="showLoading">
            <BlogCardLoading v-for="i in 3" />
          </div>

          <!-- emplty list -->
          <div class="text-green-300 text-center text-2xl mt-10" v-if="showEmpty">No blogs listed yet!</div>

          <div class="flex flex-col lg:flex-row justify-center lg:items-start items-center gap-8 mt-10 md:mx-36 mx-10"
            v-if="showContent">
            <!-- <BlogCard v-for="blog in latest3Blogs" :blog="blog" /> -->
            <BlogCard v-for="blog in latest3Blogs" :blog="blog" />

          </div>
          <!-- reload button -->
          <div class="flex justify-center mt-10" v-if="showReloadButton">
            <ButtonReload @btn-click="handleButtonReload" icon-color="text-gray-400"
              class="bg-slate-600 text-gray-300" />
          </div>
          <!-- error -->
          <div v-if="showError">
            <div class="text-red-500 text-center text-2xl font-bold mt-5">
              Network error :(
            </div>
          </div>

        </div>
      </div>

      <!-- contacts -->
      <div id="contact">
        <p class="section-red-txt mt-6">Do you have any query?</p>
        <h2 class="section-head-txt">Contact Me</h2>
        <div class="flex flex-col items-center mt-6">
          <p class="md:w-1/3 w-2/3 text-center text-gray-300">Got a project idea or a question? Let's connect and bring
            your ideas to life!
          </p>
          <div class="section-red-line mt-10"></div>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-5 mt-10 px-14">
          <div class="bg-[#1F2235] flex gap-6 p-7 rounded-lg ">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-8 text-red-400">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </span>

            <div class="text-white">
              <p class="font-bold mb-3">Give me a call</p>
              <p>Cell: {{ details.phone }}</p>
            </div>
          </div>

          <div class="bg-[#1F2235] flex gap-6 p-7 rounded-lg ">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-8 text-red-400">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
              </svg>
            </span>

            <div class="text-white">
              <p class="font-bold mb-3">Get in touch with email</p>
              <p>{{ details.email }}</p>
            </div>
          </div>
        </div>
      </div>

    </section>


  </div>
</template>

<script setup lang="ts">
import ico_computer from '@/assets/icons/ico_computer.vue';
import ico_gear from '@/assets/icons/ico_gear.vue';
import ico_stack from '@/assets/icons/ico_stack.vue';
import ico_security from '@/assets/icons/ico_security.vue';
import { useMyDetails } from '@/composables/useMyDetails';
import ServiceCard, { type Service } from '@/components/ServiceCard.vue';
import { markRaw, onMounted, ref } from 'vue';
import BlogCard from '@/components/BlogCard.vue';
import BlogCardLoading from '@/components/BlogCardLoading.vue';
import type { BlogCardInfo } from '@/composables/useTypes';
import ButtonReload from '@/components/ButtonReload.vue';
import { axiosPublicApi } from '@/lib/axios';

const { details } = useMyDetails()

const services = ref<Service[]>([
  {
    component: markRaw(ico_computer),
    h3: 'Frontend Development',
    paragraph: 'Developing responsive, user-friendly interfaces with Vuejs, Tailwind CSS to ensuring smooth user experiences and performance optimization.Also developing Java- based user interfaces with JSP, and Bootstrap.'
  },
  {
    component: markRaw(ico_gear),
    h3: 'Backend API Development',
    paragraph: 'Creating secure and high-performance REST APIs with Spring Boot, integrating databases, authentication, and third-party services efficiently.'
  },
  {
    component: markRaw(ico_stack),
    h3: 'Full-Stack Web Development',
    paragraph: 'Building scalable web applications using Spring Boot, Vue.js, and Tailwind CSS with RESTful APIs for seamless frontend-backend communication.'
  },
  {
    component: markRaw(ico_security),
    h3: 'Backend API Security',
    paragraph: 'Implementing JWT authentication, OAuth2, role-based access control (RBAC), and secure coding practices to protect APIs from vulnerabilities.'
  }
])

const showLoading = ref(false)
const showEmpty = ref(false)
const showContent = ref(false)
const showError = ref(false)
const showReloadButton = ref(false)


const latest3Blogs = ref<BlogCardInfo[]>([])

async function fetchBlogs() {
  showLoading.value = true
  try {
    const response = await axiosPublicApi.get(`/blogs/latest3blogs`)
    latest3Blogs.value = await response.data

    showLoading.value = false
    showError.value = false
    showReloadButton.value = false

    if (latest3Blogs.value.length === 0) {
      showEmpty.value = true
    }
    if (latest3Blogs.value.length > 0) {
      showContent.value = true
    }
  } catch (e) {
    showLoading.value = false
    showError.value = true
    showReloadButton.value = true
  }
}

onMounted(async () => {
  document.title = 'Iqbal.H | Home'

  await fetchBlogs();

})

async function handleButtonReload() {
  await fetchBlogs()
}

</script>
