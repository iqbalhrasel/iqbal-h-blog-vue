import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogDetails from '@/views/BlogDetails.vue'
import HomeLayout from '@/views/HomeLayout.vue'
import BlogLayout from '@/views/BlogLayout.vue'
import NotFound from '@/views/NotFound.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import AccessDenied from '@/views/AccessDenied.vue'
import { useUtility } from '@/composables/useUtility'
import { axiosApi } from '@/lib/axios'
import axios from 'axios'
import { useAuthState } from '@/composables/useAuthState'

const { getUserRole, isTokenExpired } = useUtility()
const { isAdmin, isLoggedin } = useAuthState()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
        },
      ]
    },

    {
      path: '/blog',
      component: BlogLayout,
      children: [
        {
          path: '',
          name: 'blog',
          component: () => import('@/views/BlogsView.vue'),
        },
        {
          path: 'posts',
          name: 'blog-all',
          component: () => import('@/views/AllBlogsView.vue'),
        },
        {
          path: 'posts/:id/:url',
          name: 'blog-details',
          component: BlogDetails,
          props: true
        },
        {
          path: 'interview',
          name: 'interview',
          component: () => import('@/views/InterviewView.vue'),
        },

        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
        },

      ]
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'route-error',
      component: NotFound,
    },
    {
      path: '/notfound',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage,
    },
    {
      path: '/accessdenied',
      name: 'access-denied',
      component: AccessDenied,
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem('tj')

  // 1. Refresh token if expired
  if (to.path.startsWith('/admin') && token !== null && isTokenExpired(token)) {

    try {

      const response = await axiosApi.post('/auth/refresh')
      localStorage.setItem('tj', response.data.token)
      token = response.data.token

      isLoggedin.value = true
    } catch (error) {
      isLoggedin.value = false
      isAdmin.value = false

      if (axios.isAxiosError(error)) {

        if (error.response?.status === 401) {
          return next({ name: 'login' })
        }
      }
      return next({ name: 'access-denied' })
    }
  }

  // 2. Guard /admin routes
  if (to.path.startsWith('/admin')) {

    if (token === null) {
      return next({ name: 'access-denied' })
    }
    isLoggedin.value = true
    const role = getUserRole(token)

    if (role === 'ADMIN') {
      isAdmin.value = true
      return next()
    } else {
      isAdmin.value = false
      return next({ name: 'access-denied' })
    }
  }

  // 3. Allow all other routes
  return next()
})


export default router
