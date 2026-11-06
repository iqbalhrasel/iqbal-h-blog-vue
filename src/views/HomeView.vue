<script setup>
const github = 'https://github.com/iqbalhrasel'
const linkedin = 'https://www.linkedin.com/in/iqbalhrasel'
const skills = {
  Languages: ['Rust', 'Java', 'TypeScript', 'JavaScript'],
  Backend: ['Spring Boot', 'Axum'],
  Databases: ['PostgreSQL', 'Oracle', 'Redis'],
  Infrastructure: ['Docker', 'Linux'],
}

const projects = [
  {
    number: '01',
    title: 'Restaurant Operations Management System',
    description:
      'A full-featured restaurant management platform supporting online ordering, instant admin orders, real-time kitchen updates, product management, and staff operations. Built with WebSocket-based order synchronization and JWT authentication.',
    stack: ['Java', 'Spring Boot', 'Vue.js', 'MySQL', 'WebSocket', 'Docker'],
    github: 'https://github.com/iqbalhrasel/restaurant-api'
  },
  {
    number: '02',
    title: 'Retail Inventory & Sales Management',
    description:
      'An inventory and sales management system for a clothing business, featuring role-based access control, product tracking, stock management, purchase history, and weighted-average inventory costing.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Vue.js', 'MySQL', 'Flyway'],
    github: 'https://github.com/iqbalhrasel/pink-api-inventory-mgmt'
  },
  {
    number: '03',
    title: 'Microservices E-commerce Platform',
    description:
      'A distributed e-commerce backend built with independently deployable services, asynchronous event communication, inter-service REST communication, and centralized request tracing.',
    stack: ['Java', 'Spring Boot', 'Spring Cloud', 'Kafka', 'OpenFeign', 'Zipkin'],
    github: 'https://github.com/iqbalhrasel/E-Commerce-microservices'
  },
];

const experience = [
  {
    period: '2026 — Present',
    role: 'Software Engineer',
    company: 'Perky Rabbit Corporation Ltd.',
    description:
      'Building and maintaining backend services used by real customers. Focused on API design, reliability, database performance, and developer tooling.',
  },
  // {
  //   period: '2022 — 2024',
  //   role: 'Software Engineer',
  //   company: 'Previous Company',
  //   description:
  //     'Developed APIs and internal services, improved application performance, and helped move workloads toward more scalable architecture.',
  // },
]
</script>

<template>
  <div class="min-h-screen bg-[#08090a] text-zinc-100 selection:bg-emerald-400/30">
    <!-- Background -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/[0.06] blur-[140px]" />

      <div class="absolute inset-0 opacity-[0.025]" style="
          background-image:
            linear-gradient(#fff 1px, transparent 1px),
            linear-gradient(90deg, #fff 1px, transparent 1px);
          background-size: 48px 48px;
        " />
    </div>

    <!-- Navigation -->
    <header class="border-b border-white/[0.07]">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" class="font-mono text-sm font-bold tracking-tight">
          <span class="text-emerald-400">&lt;</span>
          iqbal
          <span class="text-emerald-400">/&gt;</span>
        </a>

        <div class="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#about" class="transition hover:text-white">About</a>
          <a href="#skills" class="transition hover:text-white">Skills</a>
          <a href="#projects" class="transition hover:text-white">Projects</a>
          <a href="#experience" class="transition hover:text-white">Experience</a>
        </div>

        <a href="#contact"
          class="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
          Contact
        </a>
      </nav>
    </header>

    <main>
      <!-- Hero -->
      <section class="mx-auto max-w-6xl px-6 pb-28 pt-10 md:pb-40 md:pt-16">
        <div class="max-w-4xl">
          <div
            class="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-xs text-emerald-300">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for interesting projects
          </div>

          <p class="mb-5 font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
            Backend Developer
          </p>

          <h1 class="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-8xl">
            I build backend
            <span class="text-zinc-500">systems that scale.</span>
          </h1>

          <p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            Hi there, I'm <span class="text-zinc-200">Iqbal Hossain</span>, a backend developer
            focused on reliable APIs, distributed systems, and production-ready
            infrastructure.
          </p>

          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#projects"
              class="rounded-lg bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300">
              View my work
            </a>

            <a href="#contact"
              class="rounded-lg border border-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.04]">
              Get in touch
            </a>
          </div>
        </div>

        <!-- Terminal -->
        <div
          class="mt-20 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0f10] shadow-2xl shadow-black/30">
          <div class="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <span class="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-green-400/70" />

            <span class="ml-3 font-mono text-xs text-zinc-600">
              ~/backend-engineer
            </span>
          </div>

          <div class="overflow-x-auto p-6 font-mono text-sm leading-8">
            <p>
              <span class="text-zinc-600">$</span>
              <span class="ml-3 text-emerald-400">whoami</span>
            </p>

            <p class="text-zinc-400">
              backend-developer
            </p>

            <p class="mt-2">
              <span class="text-zinc-600">$</span>
              <span class="ml-3 text-emerald-400">cat</span>
              <span class="ml-2 text-zinc-300">stack.json</span>
            </p>

            <p class="text-zinc-500">
              { <span class="text-purple-400">"focus"</span>:
              <span class="text-amber-300">"backend"</span>,
              <span class="text-purple-400">"scale"</span>:
              <span class="text-amber-300">true</span>,
              <span class="text-purple-400">"coffee"</span>:
              <span class="text-amber-300">"always"</span> }
            </p>

            <p class="mt-2">
              <span class="text-zinc-600">$</span>
              <span class="ml-3 text-emerald-400">status</span>
            </p>

            <p class="text-emerald-400">
              ● systems operational
            </p>
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="border-y border-white/[0.07] bg-white/[0.015]">
        <div class="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_2fr] md:py-32">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
              01 / About
            </p>
          </div>

          <div>
            <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
              Building the systems
              <span class="text-zinc-500">behind the product.</span>
            </h2>

            <div class="mt-8 space-y-5 text-base leading-8 text-zinc-400">
              <p>
                I enjoy working where software meets infrastructure. Designing
                APIs, modeling data, improving performance, and making systems
                reliable under real-world conditions.
              </p>

              <p>
                My approach is simple:
                <span class="text-zinc-200">
                  understand the problem → design the system → build it well →
                  measure → improve.
                </span>
              </p>

              <p>
                I care about clean architecture, good developer experience,
                observability, and code that remains understandable months after
                it was written.
              </p>

              <div class="flex items-end space-x-5">
                <p>
                  <span class="text-emerald-400">Resume</span>
                  <span class="ml-1 text-yellow-300 font-bold animate-ping">_</span>
                </p>
                <div class="flex space-x-5 mb-1">
                  <a href="https://docs.google.com/document/d/1HrCh9kHpVvLI9LN8nz4FnSmQHvrAsDd9iSRz9bTcr_c/export?format=pdf"
                    class="border-b border-b-emerald-950 hover:border-b-emerald-400 py-0.5 text-zinc-500 text-center text-sm font-semibold hover:text-emerald-400">
                    PDF
                  </a>
                  <a href="https://docs.google.com/document/d/1HrCh9kHpVvLI9LN8nz4FnSmQHvrAsDd9iSRz9bTcr_c/export?format=docx"
                    class="border-b border-b-emerald-950 hover:border-b-emerald-400 py-0.5 text-zinc-500 text-center text-sm font-semibold hover:text-emerald-400">
                    DOCX
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div class="mb-14">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
            02 / Skills
          </p>

          <h2 class="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Tools I work with.
          </h2>
        </div>

        <div class="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
          <div v-for="(items, category) in skills" :key="category" class="bg-[#0b0d0e] p-7">
            <h3 class="font-mono text-sm text-zinc-500">
              {{ category }}
            </h3>

            <div class="mt-5 flex flex-wrap gap-2">
              <span v-for="item in items" :key="item"
                class="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-sm text-zinc-300">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="border-y border-white/[0.07] bg-white/[0.015]">
        <div class="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div class="mb-14 flex items-end justify-between gap-6">
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
                03 / Projects
              </p>

              <h2 class="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Selected work.
              </h2>
            </div>

            <a :href="github" target="_blank"
              class="hidden font-mono text-sm text-zinc-500 transition hover:text-emerald-400 sm:block">
              GitHub →
            </a>
          </div>

          <div class="space-y-4">
            <article v-for="project in projects" :key="project.number"
              class="group rounded-xl border border-white/[0.08] bg-[#0b0d0e] p-6 transition duration-300 hover:border-emerald-400/20 hover:bg-[#0d1010] md:p-8">
              <div class="flex gap-6">
                <span class="hidden font-mono text-sm text-zinc-700 sm:block">
                  {{ project.number }}
                </span>

                <div class="flex-1">
                  <div class="flex flex-col justify-between gap-4 md:flex-row">
                    <h3 class="text-xl font-semibold group-hover:text-emerald-300">
                      {{ project.title }}
                    </h3>

                    <!-- <span class="font-mono text-sm text-zinc-600 transition group-hover:text-emerald-400">
                      View project ↗
                    </span> -->
                    <a :href="project.github" target="_blank"
                      class="font-mono text-sm text-zinc-600 transition group-hover:text-emerald-400">
                      View project ↗
                    </a>
                  </div>

                  <p class="mt-4 max-w-2xl leading-7 text-zinc-500">
                    {{ project.description }}
                  </p>

                  <div class="mt-6 flex flex-wrap gap-2">
                    <span v-for="tech in project.stack" :key="tech" class="font-mono text-xs text-zinc-600">
                      #{{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div class="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
              04 / Experience
            </p>

            <h2 class="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Where I've worked.
            </h2>
          </div>

          <div class="space-y-12">
            <article v-for="job in experience" :key="job.period" class="relative border-l border-white/[0.1] pl-7">
              <div class="absolute -left-[4px] top-1 h-2 w-2 rounded-full bg-emerald-400" />

              <p class="font-mono text-xs text-emerald-400">
                {{ job.period }}
              </p>

              <h3 class="mt-3 text-xl font-semibold">
                {{ job.role }}
              </h3>

              <p class="mt-1 text-zinc-500">
                {{ job.company }}
              </p>

              <p class="mt-4 max-w-2xl leading-7 text-zinc-500">
                {{ job.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Principles -->
      <section class="border-y border-white/[0.07] bg-white/[0.015]">
        <div class="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
            Engineering principles
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="(principle, index) in [
              'Keep systems simple',
              'Design for failure',
              'Measure before optimizing',
              'Automate repetitive work',
              'Write code for humans',
              'Ship, observe, improve',
            ]" :key="principle" class="rounded-lg border border-white/[0.07] bg-[#0b0d0e] p-5">
              <span class="font-mono text-xs text-emerald-400">
                0{{ index + 1 }}
              </span>

              <p class="mt-3 text-sm text-zinc-300">
                {{ principle }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div class="max-w-3xl">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
            05 / Contact
          </p>

          <h2 class="mt-5 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Let's build something
            <span class="text-zinc-500">great.</span>
          </h2>

          <p class="mt-7 max-w-xl text-lg leading-8 text-zinc-500">
            Have a challenging backend problem, a product idea, or just want to
            talk engineering? I'd love to hear about it.
          </p>

          <a href="mailto:iqbal.h.rasel@gmail.com"
            class="mt-10 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300">
            Start a conversation
            <span>→</span>
          </a>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/[0.07]">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span class="text-zinc-300">Iqbal Hossain</span>
          <span class="mx-2">·</span>
          Backend Developer
        </div>

        <div class="flex gap-5">
          <a :href="github" target="_blank" class="transition hover:text-white">GitHub</a>
          <a :href="linkedin" target="_blank" class="transition hover:text-white">LinkedIn</a>
          <a href="mailto:iqbal.h.rasel@gmail.com
          " class="transition hover:text-white">
            Email
          </a>
        </div>

        <div>
          © 2026 Iqbal Hossain
        </div>
      </div>
    </footer>
  </div>
</template>
