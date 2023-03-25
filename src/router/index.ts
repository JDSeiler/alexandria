import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const Home = () => import('@/views/HomeView.vue');
const SignIn = () => import('@/views/SignInView.vue');
const CreateAccount = () => import('@/views/CreateAccountView.vue');
const Verify = () => import('@/views/VerifyView.vue');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function authGuard(to: RouteLocationNormalized, _from: RouteLocationNormalized) {
  const authStore = useAuthStore()

  if (!authStore.isSignedIn && to.name !== 'sign-in') {
    return { name: 'sign-in' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: [authGuard]
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: CreateAccount
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn 
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    }
  ]
})

export default router
