<template>
  <div class="pt-20">
    <section class="bg-bgLight py-24">
      <h1 class="text-center text-gray-200 font-bold text-5xl">About Me</h1>
      <div class="text-center mt-4 bg-bgDeep text-gray-300 w-40 mx-auto p-2 rounded-lg">
        <RouterLink :to="{ name: 'home' }" class="font-medium">Home</RouterLink>
        <span class="ml-1">>> About</span>
      </div>
    </section>

    <section class="bg-bgDeep py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 md:mx-36 mx-24 ">
        <div class="flex justify-center lg:justify-start">
          <div class="size-32 md:size-60 ring-4 ring-cyan-400 rounded-full xl:ml-40 lg:ml-32 lg:mt-16">
            <img src="../assets/images/profile.jpg" alt="" class="overflow-hidden rounded-full p-1">
          </div>
        </div>


        <div class="flex flex-col items-center lg:items-start">
          <p class="text-gray-300 font-semibold text-2xl mt-6 lg:mt-0">Hi There</p>

          <p class="mt-10 about-p-txt">I'm <span class="text-red-400 font-semibold">{{ details.name }}.</span> I'm a web
            app developer with a passion for
            creating clean, responsive, and user-focused applications. Whether you're launching a brand-new idea or
            looking to improve an existing app, I'm here to help bring your vision to life with solid code and
            thoughtful design.</p>
          <p class="mt-5 about-p-txt">
            I specialize in building web applications that are fast, scalable, and easy to use—always keeping
            performance and user experience in mind. From front-end interfaces to back-end systems, I enjoy working
            across the full stack to create solutions that work.
          </p>
          <p class="mt-5 about-p-txt">
            My goal is to make the development process smooth, collaborative, and even a little fun. I believe in good
            communication, clean code, and long-term partnerships. Every project is a chance to build something
            meaningful.
          </p>
          <p class="mt-5 about-p-txt">
            If you're looking for someone who cares about both the details and the bigger picture, let's chat and make
            something awesome together!
          </p>

          <p class="mt-5 about-p-txt">Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Dolor, repellendus
            vitae. Non enim perferendis
            atque.</p>

          <div class="mt-10 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start">
            <div class="space-y-6">
              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">Name:</p>
                <p class="text-gray-300">{{ details.name }}</p>
              </div>
              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">Phone:</p>
                <p class="text-gray-300">{{ details.phone }}</p>
              </div>
            </div>

            <div class="space-y-6 lg:mr-24 mt-6 md:mt-0">
              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">Email:</p>
                <p class="text-gray-300">{{ details.email }}</p>
              </div>
              <div class="text-center md:text-start">
                <p class="text-red-400 font-bold">LinkedIn:</p>
                <p class="text-gray-300">{{ details.linkedin }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center w-full mt-10">
            <a :href="`${details.resume}?format=pdf`" target="_blank"
              class="border-2 border-red-400 px-7 py-3 rounded-full text-cyan-300 font-medium hover:bg-red-400 hover:text-white transition duration-300 mx-auto">Download
              Resume</a>
          </div>

        </div>
      </div>

    </section>


    <!-- my journey -->
    <section class="bg-bgLight about-sec-flex">
      <div>
        <h2 class="about-red-txt">My Journey</h2>
        <div class="flex lg:justify-start justify-center">
          <div class="section-red-line mt-4"></div>
        </div>

        <div class="about-img-sm-scr">
          <img src="../assets/images/journey.jpg" alt="" class="about-sec-img">
        </div>

        <div class="about-p-container">
          <div class=" mx-10 lg:mx-0 mr-0 lg:mr-20 about-p-txt">
            <p>
              I didn't come from a computer science background. In fact, I started learning programming out of pure
              curiosity and a desire to build real things.
            </p>
            <p class="mt-3">
              Coming from a non-computer science background, the world of programming felt distant at first. But
              curiosity
              pulled me in — and one day, I decided to give Java a try. The feeling of making something work through
              code
              was addictive. From that moment on, I began learning consistently in my own quiet way.
              What began with small Java programs turned into building
              full-stack apps using Spring Boot and Vue.js.
            </p>

            <p class="mt-3">
              Over time, I moved beyond just writing Java and started exploring backend development with Spring Boot.
              That
              opened up another world — APIs, databases, security, clean architecture. Then I added frontend development
              with Vue.js to understand the full picture of how web applications come to life. Slowly, project by
              project,
              error by error, I kept growing.
            </p>

            <p class="mt-3">
              Every day, I learn something new — not because I have to, but because I genuinely enjoy it. From debugging
              errors to designing features, the process excites me.
            </p>

            <p class="mt-3">
              It's been a journey of self-learning, trial and error, and a lot of late-night debugging — but I wouldn't
              trade it for anything.
            </p>

          </div>
        </div>
      </div>

      <div class="about-img-lg-scr">
        <img src="../assets/images/journey.jpg" alt="" class="about-sec-img">
      </div>
    </section>

    <!-- Tools I Use -->
    <section class="bg-bgDeep about-sec-flex">
      <div class="about-img-lg-scr">
        <img src="../assets/images/teck.jpg" alt="" class="about-sec-img">
      </div>
      <div>
        <h2 class="about-red-txt ml-0 lg:ml-20">Tools I Use
        </h2>
        <div class="flex lg:justify-start justify-center">
          <div class="section-red-line mt-4 ml-0 lg:ml-20"></div>
        </div>

        <div class="about-img-sm-scr">
          <img src="../assets/images/teck.jpg" alt="" class="about-sec-img">
        </div>

        <div class="about-p-container">
          <div class=" mx-10 lg:mx-0 ml-0 lg:ml-20 about-p-txt">
            I like keeping my toolkit simple and focused. These are the technologies I enjoy working with:

            <ul class="my-3">
              <li class="mb-3">
                <p class="text-red-400">Languages</p>
                Java, Javascript, HTML, Tailwind CSS
              </li>

              <li class="mb-3">
                <p class="text-red-400">Backend</p>
                Spring Boot, JPA, Flyway
              </li>

              <li class="mb-3">
                <p class="text-red-400">Frontend</p>
                Vue.js (with Composition API)
              </li>

              <li class="mb-3">
                <p class="text-red-400">Mobile</p>
                Android (Java, XML)
              </li>
              <li class="mb-3">
                <p class="text-red-400">Database</p>
                MySQL, PostgreSQL
              </li>
              <li class="mb-3">
                <p class="text-red-400">IDE & API Tester</p>
                IntelliJ Idea, VS Code, Postman
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>

    <!-- What I'm Learning Right Now-->
    <section class="bg-bgLight about-sec-flex">
      <div>
        <h2 class="about-red-txt">What I'm Learning Right Now
        </h2>

        <div class="flex lg:justify-start justify-center">
          <div class="section-red-line mt-4"></div>
        </div>

        <div class="about-img-sm-scr">
          <img src="../assets/images/learning.jpg" alt="" class="about-sec-img">
        </div>

        <div class="about-p-container">
          <div class=" mx-10 lg:mx-0 mr-0 lg:mr-20 about-p-txt">
            <p>
              At the moment, I'm diving deeper into <span class="text-red-400">Microservices architecture</span> using
              Spring Boot. I'm learning how to
              break down a monolithic application into smaller, independent services that can communicate cleanly
              through REST APIs or messaging systems.
            </p>
            <p class="mt-3">
              A big part of my focus is on designing services that are loosely coupled, properly isolated, and easier to
              maintain. I'm also exploring how to use Spring Cloud, service discovery (like Eureka), API gateways, and
              centralized configuration management.
            </p>

            <p class="mt-3">
              In parallel, I'm gradually learning more about <span class="text-red-400">Application Security</span> —
              especially how to handle
              authentication and authorization across multiple services using JWTs and secure API communication.
            </p>

            <p class="mt-3">
              I try to balance my learning between deepening my Spring Boot knowledge and building a solid foundation in
              distributed systems and microservices patterns.
            </p>
          </div>
        </div>
      </div>

      <div class="about-img-lg-scr">
        <img src="../assets/images/learning.jpg" alt="" class="about-sec-img">
      </div>
    </section>

    <!-- My Goals -->
    <section class="bg-bgDeep about-sec-flex">
      <div class="about-img-lg-scr">
        <img src="../assets/images/goals.jpg" alt="" class="about-sec-img">
      </div>
      <div>
        <h2 class="about-red-txt ml-0 lg:ml-20">My Goals
        </h2>
        <div class="flex lg:justify-start justify-center">
          <div class="section-red-line mt-4 ml-0 lg:ml-20"></div>
        </div>

        <div class="about-img-sm-scr">
          <img src="../assets/images/goals.jpg" alt="" class="about-sec-img">
        </div>

        <div class="about-p-container">
          <div class=" mx-10 lg:mx-0 ml-0 lg:ml-20 about-p-txt">
            <p>
              Right now, my primary goal is to become a confident full-stack developer. I want to strengthen both my
              backend and frontend skills, and also dive deeper into mobile development using Android. I'm particularly
              interested in learning about application security — understanding how to protect data and systems is
              something that feels both challenging and meaningful.
            </p>

            <p class="mt-3">
              I plan to keep building real-world projects, not just to showcase skills, but to improve how I design and
              structure applications. In the long run, I'd love to contribute to open-source projects and collaborate
              with
              other developers. More than anything, I want to stay consistent, keep learning, and enjoy the process.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Interests -->
    <section class="bg-bgLight about-sec-flex">
      <div>
        <h2 class="about-red-txt">Personal Interests</h2>
        <div class="flex lg:justify-start justify-center">
          <div class="section-red-line mt-4"></div>
        </div>

        <div class="about-img-sm-scr">
          <img src="../assets/images/hobbies.jpg" alt="" class="about-sec-img">
        </div>

        <div class="about-p-container">
          <div class=" mx-10 lg:mx-0 mr-0 lg:mr-20 about-p-txt">
            <p>
              Outside of programming, I'm someone who enjoys peace, clarity, and self-improvement. I'm a quiet thinker —
              I like to reflect, observe, and learn things deeply rather than rushing through them. I enjoy minimalism,
              both in design and in life, and I find joy in doing things with focus and intention.
            </p>
            <p class="mt-3">
              Sometimes, I just explore new tools, read about architecture patterns, or research how things work under
              the hood. I also believe in taking breaks — walking away from the screen and letting ideas settle often
              helps me more than forcing solutions.
            </p>
          </div>
        </div>
      </div>

      <div class="about-img-lg-scr">
        <img src="../assets/images/hobbies.jpg" alt="" class="about-sec-img">
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useMyDetails } from '@/composables/useMyDetails';
import { onMounted } from 'vue';

const { details } = useMyDetails()

onMounted(() => {
  document.title = 'About me'
})
</script>